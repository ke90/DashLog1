# Verwenden Sie die offizielle MySQL-Base-Image
FROM mysql:8.0

# Umgebungsvariablen setzen
ENV MYSQL_DATABASE dashlog
ENV MYSQL_USER Logger
ENV MYSQL_PASSWORD Logger123
ENV MYSQL_ROOT_PASSWORD Logger123

# Kopieren Sie den MySQL-Dump in das Init-Verzeichnis
COPY ./Dumpdashlog.sql /docker-entrypoint-initdb.d/mysql_dump.sql

# Exponieren Sie den MySQL-Port
EXPOSE 3306