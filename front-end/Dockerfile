FROM node:22-alpine

WORKDIR /app

COPY front-end/package.json ./
COPY front-end/tsconfig.json ./
COPY front-end/tsconfig.app.json ./
COPY front-end/vite.config.ts ./
COPY front-end/index.html ./
COPY front-end/playwright.config.ts ./
COPY front-end/src ./src

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]
