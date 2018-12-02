require('dotenv').config({ path: 'development.env' });

const globalTunnel = require('global-tunnel-ng');

if (process.env.WITH_PROXY) {
  console.log('using network proxy');
  globalTunnel.initialize({
    host: 'localhost',
    port: 3128,
  });
}

const app = require('./web/app');

app.listen(3000, () => console.log('server is running!'));
