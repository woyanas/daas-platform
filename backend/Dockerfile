FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

# ENV dan EXPOSE tetap sama
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# Ubah path ke dist/src/main.js
CMD ["node", "dist/src/main.js"]
