#syntax=docker/dockerfile:1

FROM node:alpine
# isto vai ser a nossa base image onde permite-nos dar downloads de todas as dependencias do node js 

WORKDIR /src
#para dizer o diretorio onde vamos trabalhar e dar os comandos 

COPY ["package.json", "package-lock.json*", "./"]
#iremos copiar estes seguitnes ficheiros para o seguinte destino  para pdoer fazer npm install seguidamente

RUN npm install
#a partir daqui tenho uma imagem com base em node js e temos as suas dependencias todas instaladas

COPY . .
#copia todos os ficheiros que tenho para o imagem

CMD [ "npm", "run", "dev"]
#diz que comando o docker tem que executar 

