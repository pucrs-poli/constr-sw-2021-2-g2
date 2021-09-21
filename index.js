var express = require('express');
var app = express();

const keycloak = require('./src/config/keycloak-config.js').initKeycloak();
app.use(keycloak.middleware());

const testController = require('./src/controllers/test-controller.js');
app.use('/test', testController);

app.get('/', function(req, res){
   res.send("Server is up!");
});

app.listen(3000);

/*const app = require('./src/config/express');
const config = require('./src/config/env');

require('./src/config/database');
const router = require('./src/routes');

app.use(router);

app.get('/', (_, res) => res.send({ status: 'Status: Ok' }));

app.listen(config.apiPort, () => {
  console.log(
    `API Server -${config.apiName}- started and listening on http://${config.apiURL}:${config.apiPort}/ (${config.env})`
  );
});

module.exports = app;*/
