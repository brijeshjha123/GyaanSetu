FROM node:18-alpine as build

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/frontend/build ./build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
