FROM node:22-alpine

WORKDIR /app

COPY landing/package.json ./
COPY landing/index.html ./
COPY landing/postcss.config.mjs ./
COPY landing/vite.config.ts ./
COPY landing/ATTRIBUTIONS.md ./
COPY landing/README.md ./
COPY landing/src ./src
COPY landing/guidelines ./guidelines

RUN npm install

EXPOSE 4174

CMD ["npm", "run", "dev"]
