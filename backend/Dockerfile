# Verwenden Sie das offizielle Python-Base-Image
FROM python:3.12

# Arbeitsverzeichnis festlegen
WORKDIR /app

# Kopieren Sie die Anwendungsabhängigkeiten und Code in das Arbeitsverzeichnis
COPY ./backend/requirements.txt /app/
COPY ./backend /app/

# Installieren Sie die Anwendungsabhängigkeiten
RUN pip install -r requirements.txt

# Exponieren Sie den Gunicorn-Port
EXPOSE 8000

# Starten Sie den Gunicorn-Server
CMD ["gunicorn", "core.wsgi:application", "-b", "0.0.0.0:8000"]
