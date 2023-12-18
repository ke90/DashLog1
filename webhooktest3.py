import requests
import json
from backend.classes.DashLog import DashLog

dashlog = DashLog()
# Die URL Ihres Webhook-Endpoints

dashlog.send_log(2, 'Benutzer konnte nicht angelegt werden.')
