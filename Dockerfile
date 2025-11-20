FROM oven/bun:latest
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .

RUN bunx prisma generate

EXPOSE 3000
CMD ["bun", "run", "start", "--host", "0.0.0.0"]
