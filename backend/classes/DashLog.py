import requests
import json

# Bei Verwendung der send_log Funktion muss die message_id die mitgegeben werden. Entweder 1 für success oder 2 für fail
# die id_app muss aus der Datenbank selber herausgefunden werden. Falls die App noch nicht in der Datenbank vorhanden ist,
# muss diese in der Datenbank in der Tabelle app hinzugefügt werden.


class DashLog:
    def __init__(self):
        self.url = 'http://localhost:8000/logger/webhook2/'
        self.data = {
            'id_app': 1,
        }

    # Hier wird ein Post-Request an die Webanwendung gestartet mit den Parametern und in dieser Funktion in die 
    # DashLog Datenbank geschrieben.
    # Falls sich ein User auf der Webanwendung befindet. Wird direkt über die Funktion event_stream dem User die aktuellen
    # Daten angezeigt
    def send_log(self, message_id, text):
        """
        Sendet einen Log-Eintrag an die DashLog-Datenbank.

        Args:
            message_id (int): Die ID der Nachricht. 1 für 'Erfolg', 2 für 'Fehler'.
            text (str): Der Text der Nachricht, der an die DashLog-Datenbank gesendet wird.

        Returns:
            None: Kein Rückgabewert.
        """
        print("Sendet Daten an DashLog...")
        self.data['message_text'] = text
        self.data['message_id'] = message_id
        response = requests.post(self.url, data=json.dumps(self.data), headers={'Content-Type': 'application/json'})
        print(response.status_code)
        print(response.text)
        

