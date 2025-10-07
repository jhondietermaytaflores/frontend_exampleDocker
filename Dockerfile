FROM node:20-alpine 

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json package-lock.json ./

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE  80

CMD ["nginx", "-g", "daemon off;"]
#CMD ["npm", "run", "dev"]


