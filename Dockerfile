
# --- Build dependencies -------------------------------------------------------
FROM node:17.8.0 as builder

WORKDIR /usr

COPY package.json ./
COPY tsconfig.json ./
COPY tsoa.json ./
COPY src ./src

RUN npm install
RUN npm run build

EXPOSE 5000

# CMD [ "ls" ]
CMD ["npm", "run", "start"]