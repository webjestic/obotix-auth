FROM node:16.15.1-alpine3.15
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
EXPOSE 8080
RUN addgroup app && adduser -S -G app app
USER app
CMD ["npm", "start"]