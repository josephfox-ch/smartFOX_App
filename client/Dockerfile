# Build aşaması
FROM node:16 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production aşaması
FROM node:16 AS production

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package*.json ./

RUN npm install --only=production

EXPOSE 5000

CMD ["npx", "serve", "-s", "build", "-l", "5000"]

