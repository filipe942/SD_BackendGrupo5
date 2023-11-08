FROM node:alpine

WORKDIR /frontend

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

CMD [ "./start.sh" ]
