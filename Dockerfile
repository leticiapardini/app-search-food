FROM node:alpine

WORKDIR /src

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]