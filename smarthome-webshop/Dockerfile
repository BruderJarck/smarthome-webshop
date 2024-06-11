FROM node:alpine As build

WORKDIR /usr/local/app

COPY . /usr/local/app

RUN npm install -g @angular/cli

RUN npm install

RUN npm run build --prod

FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /usr/local/app/dist/smarthome-frontend/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]