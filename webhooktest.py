import requests
import json
from backend.classes.Dbconnection_log import MYSQL

dbconnection = MYSQL()

# Die URL Ihres Webhook-Endpoints
url = 'http://localhost:8000/logger/webhook/'

# Die zu sendenden Daten

for i in range(20):

    #sql = '''INSERT INTO `dashlog`.`logger` (`id_app`, `message_id`, `message_text`) VALUES ('2', '1', 'Datensatz erfolgreich erstellt')'''
    sql = '''INSERT INTO `dashlog`.`logger` (`id_app`, `message_id`, `message_text`) VALUES ('1', '2', 'Error: Anlegen des Datensatzes fehlgeschlagen')'''
    id = dbconnection.modifyData(sql,True,[])
    data = {
        'id': id,
    }
    print("Start Webhooktest")
    # Senden eines POST-Requests
    response = requests.post(url, data=json.dumps(data), headers={'Content-Type': 'application/json'})

    # Ausgabe der Antwort
    print(response.status_code)
    print(response.text)