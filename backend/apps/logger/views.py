from django.shortcuts import render
from django.http import JsonResponse, HttpResponseBadRequest, HttpResponseNotFound, HttpResponseServerError
from classes.Dbconnection_log import MYSQL
from django.views.decorators.csrf import csrf_exempt


dbconnection = MYSQL()

# Create your views here.
@csrf_exempt
def load_logs(request):
    sql = '''SELECT a.id as app_id, app,m_type, message_text,mt.id as type_id, logger.timestamp FROM dashlog.logger 
                        INNER JOIN apps a ON a.id = id_app
                        INNER JOIN message_type mt ON mt.id = message_id'''
    data = dbconnection.getData(True,sql,params=[])
    # print(data)
    sql = '''SELECT
    (SELECT COUNT(*) FROM logger WHERE message_id = 2 AND timestamp >= NOW() - INTERVAL 1 DAY) AS Anzahl_1_Tag,
    (SELECT COUNT(*) FROM logger WHERE message_id = 2 AND timestamp >= NOW() - INTERVAL 1 WEEK) AS Anzahl_1_Woche,
    (SELECT COUNT(*) FROM logger WHERE message_id = 2 AND timestamp >= NOW() - INTERVAL 1 MONTH) AS Anzahl_1_Monat,
    (SELECT COUNT(*) FROM logger WHERE message_id = 2 AND timestamp >= NOW() - INTERVAL 1 YEAR) AS Anzahl_1_Jahr'''

    kennzahlen = dbconnection.getData(True,sql,[])

    sql = '''SELECT
                id_app,
                a.app,
                SUM(CASE WHEN logger.timestamp >= NOW() - INTERVAL 1 DAY THEN 1 ELSE 0 END) AS fehler_1_tag,
                SUM(CASE WHEN logger.timestamp >= NOW() - INTERVAL 1 WEEK THEN 1 ELSE 0 END) AS fehler_1_woche,
                SUM(CASE WHEN logger.timestamp >= NOW() - INTERVAL 1 MONTH THEN 1 ELSE 0 END) AS fehler_1_monat,
                SUM(CASE WHEN logger.timestamp >= NOW() - INTERVAL 1 YEAR THEN 1 ELSE 0 END) AS fehler_1_jahr
            FROM dashlog.logger
            INNER JOIN apps a on a.id = id_app
            WHERE message_id = 2
            GROUP BY id_app, app'''
    
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

    # print(fehlerproMonat)

    sql = '''SELECT id, app FROM dashlog.apps'''
    apps = dbconnection.getData(True,sql,[])
    # print(apps)

    combined_data = {
        "data": data,
        "kennzahlen": kennzahlen,
        "chart_failproApp": chart_failproApp,
        "apps": apps,
        "fehlerproMonat": fehlerproMonat
    }

    return JsonResponse({"data":combined_data})


