import requests
import json


# Die URL Ihres Webhook-Endpoints
url = 'http://localhost:8000/logger/webhook2/'

# Die zu sendenden Daten

data = {
    'id_app': 1,
    'message_id': 2,
    'message_text': 'Error: Benutzer anlegen fehlgeschlagen.'
}

print("Start Webhooktest")
# Senden eines POST-Requests
response = requests.post(url, data=json.dumps(data), headers={'Content-Type': 'application/json'})

# Ausgabe der Antwort
print(response.status_code)
print(response.text)