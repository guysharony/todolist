FROM node:18-alpine AS base

WORKDIR /app
COPY ./src/ .
RUN npm install --location=global npm@latest

CMD npm install && npx prisma generate && npx prisma migrate dev --name init && npm run dev