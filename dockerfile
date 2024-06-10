FROM node:20
WORKDIR /app
COPY /app  ..
RUN npm install
RUN npx prisma generate
RUN npm build
EXPOSE 3000
CMD ["npm", "run", "start"]