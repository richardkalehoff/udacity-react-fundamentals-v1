FROM udacity/nodejs:6.9.2

RUN npm install -g yarn

COPY . /app
RUN yarn install

CMD ["/usr/bin/node", "server.js"]
