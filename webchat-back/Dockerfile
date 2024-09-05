FROM node:22-alpine AS builder

ENV NODE_ENV build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build && pnpm prisma generate

# Production stage
FROM node:22-alpine

ENV NODE_ENV production

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/dist/ ./dist/

EXPOSE 4000

CMD ["node", "dist/main.js"]
