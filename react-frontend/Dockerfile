# Build File
FROM node:19-alpine as build

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN cd /app

RUN npm install

RUN npm run build

# Production

FROM nginx:1.23.3-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]