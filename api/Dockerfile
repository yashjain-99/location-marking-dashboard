FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${API_PORT}
CMD ["npm", "run", "dev"]