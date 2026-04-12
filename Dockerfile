# ── Build stage ──
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY client/package*.json ./client/
RUN npm install && cd client && npm install
COPY . .
RUN cd client && npm run build
RUN npx prisma generate

# ── Production stage ──
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server ./server
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/client/dist ./client/dist
ENV NODE_ENV=production
EXPOSE 5000
CMD ["sh", "-c", "npx prisma migrate deploy && node server/index.js"]
