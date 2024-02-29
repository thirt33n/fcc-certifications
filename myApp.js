const express = require('express');
const app = express();
const helmet = require('helmet');

// HelmtJS Middleware configs
// app.use(helmet.hidePoweredBy()); // Suppresses X-Powered-By header
// app.use(helmet.frameguard({action:'deny'})); // Prevents clickjacking by setting rules to allow iframes
// app.use(helmet.xssFilter());  //Sanitised XSS inputs
// app.use(helmet.noSniff());  //Prevents MIME Sniffing by browsers
// app.use(helmet.ieNoOpen()); //Prevents IE from opening untrusted html
// const timeForHsts = 90*24*60*60;
// app.use(helmet.hsts({maxAge:timeForHsts,force:true})); //Use only https for 90 days
// app.use(helmet.dnsPrefetchControl()); //Disables DNS prefetching by the browser
// app.use(helmet.noCache()) // Prevents using the local cache
// app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'", "trusted-cdn.com"] }}));   //Content-Security-Policy to only allow trusted cdns and own website to display media and scripts



app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))










































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
