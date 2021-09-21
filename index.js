const app = require('./src/config/express');
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

module.exports = app;
