const app = require('./src/config/express');
const config = require('./src/config/env');


app.get('/', (_, res) => res.send({ status: 'Status: Ok' }));

app.listen(config.apiPort, () => {
  console.log(
    `API Server started and listening on http://${config.apiURL}:${config.apiPort}/ (${config.env})`
  );
});

module.exports = app;
