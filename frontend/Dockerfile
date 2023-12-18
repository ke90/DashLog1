# Verwenden Sie das offizielle Node.js-Base-Image
FROM node:18 as build

# Arbeitsverzeichnis festlegen
WORKDIR /app

# Kopieren Sie die Anwendungsabhängigkeiten und Code in das Arbeitsverzeichnis
COPY ./frontend /app/

# Installieren Sie die Node.js-Abhängigkeiten
RUN npm install --force

# Bauen Sie das Frontend
RUN npm run build


FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY ../nginx/nginx.conf /etc/nginx/nginx.conf
