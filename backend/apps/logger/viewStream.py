from django.http import StreamingHttpResponse
import time
import json
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotFound, HttpResponseServerError
from classes.Dbconnection_log import MYSQL
from datetime import datetime

dbconnection = MYSQL()

activator = False
ids = []
@csrf_exempt
@require_POST
def webhook_receiver(request):
    global activator
    global id
    try:
        data = json.loads(request.body)
        if data:
            print("Folgende Daten erhalten")
            print(data)
            received_id = data['id']
            ids.append(received_id)
            activator = True

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Ungültige Daten'}, status=400)
    return JsonResponse({'status': 'Erfolgreich empfangen'})

def event_stream():
    global activator
    global ids
    while True:
        if ids:
            print("Warteschleife: ")
            print(ids)
            current_id = ids.pop(0)
            print("Verarbeite ID:", current_id)
            sql = '''SELECT a.id as app_id,app,m_type, mt.id as type_id, message_text, logger.timestamp FROM dashlog.logger 
                        INNER JOIN apps a ON a.id = id_app
                        INNER JOIN message_type mt ON mt.id = message_id
                        WHERE logger.id = %s'''
            data = dbconnection.getData(True,sql,[current_id])

    
            sql = '''SELECT
                    (SELECT COUNT(*) FROM logger WHERE message_id = 2 AND timestamp >= NOW() - INTERVAL 1 DAY) AS Anzahl_1_Tag,
                    (SELECT COUNT(*) FROM logger WHERE message_id = 2 AND timestamp >= NOW() - INTERVAL 1 WEEK) AS Anzahl_1_Woche,
                    (SELECT COUNT(*) FROM logger WHERE message_id = 2 AND timestamp >= NOW() - INTERVAL 1 MONTH) AS Anzahl_1_Monat,
                    (SELECT COUNT(*) FROM logger WHERE message_id = 2 AND timestamp >= NOW() - INTERVAL 1 YEAR) AS Anzahl_1_Jahr'''

            kennzahlen = dbconnection.getData(True,sql,[])


            sql = '''SELECT
                        id_app,
                        a.app,
                        CAST(SUM(CASE WHEN logger.timestamp >= NOW() - INTERVAL 1 DAY THEN 1 ELSE 0 END) AS SIGNED) AS fehler_1_tag,
                        CAST(SUM(CASE WHEN logger.timestamp >= NOW() - INTERVAL 1 WEEK THEN 1 ELSE 0 END) AS SIGNED) AS fehler_1_woche,
                        CAST(SUM(CASE WHEN logger.timestamp >= NOW() - INTERVAL 1 MONTH THEN 1 ELSE 0 END) AS SIGNED) AS fehler_1_monat,
                        CAST(SUM(CASE WHEN logger.timestamp >= NOW() - INTERVAL 1 YEAR THEN 1 ELSE 0 END) AS SIGNED) AS fehler_1_jahr
                    FROM dashlog.logger
                    INNER JOIN apps a ON a.id = id_app
                    WHERE message_id = 2
                    GROUP BY id_app, app;
                    '''
                
            chart_failproApp = dbconnection.getData(True,sql,[])

            sql = '''SELECT 
                            DATE_FORMAT(timestamp, '%Y-%m') AS monat, 
                            COUNT(*) AS anzahl_fehler
                        FROM dashlog.logger
                        WHERE 
                            message_id = 2 AND 
                            timestamp >= NOW() - INTERVAL 1 YEAR
                        GROUP BY 
                            DATE_FORMAT(timestamp, '%Y-%m')
                        ORDER BY 
                            monat;
                        '''
                
            fehlerproMonat = dbconnection.getData(True,sql,[])

            print(fehlerproMonat)

            combined = {
                "data": data,
                "kennzahlen": kennzahlen,
                "chart_failproApp": chart_failproApp,
                "fehlerproMonat":fehlerproMonat
            }

            json_data = json.dumps(combined, default=datetime_converter)

            # print(combined)
            yield f"data: {json_data}\n\n"

            print(ids)
        else:
            # print("Am warten...")
            time.sleep(1)  # Wartezeit zwischen den Nachrichten

def stream_events(request):
    response = StreamingHttpResponse(event_stream(), content_type="text/event-stream")
    return response

def datetime_converter(o):
    if isinstance(o, datetime):
        return o.__str__()
    

