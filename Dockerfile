FROM node:20-alpine 

WORKDIR /react-vite-app


#COPY pruebita1_docker/ .
#RUN npm install

COPY pruebita1_docker/package*.json ./ 
#package.json package-lock.json ./
RUN npm install --silent

COPY . ./

EXPOSE  80

CMD ["npm", "run", "dev"]


