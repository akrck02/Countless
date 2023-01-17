require('dotenv').config();

const express = require('express')
const app = express()

const params = {
    port: process.env.PORT, 
    host: process.env.IP,
    root: ".",
};

const statics = {
    "/" : "index.html",
    "/test" : "test.html",
    "/favicon.ico" : "favicon.ico",
    "/readme" : "README.md",
    "/app" : "app",
    "/resources/icons" : "resources/icons",
    "/backend/out" : "backend/out",
    "/frontend/out" : "frontend/out",
    "/frontend/temp" : "frontend/temp"
}

for (const endpoint in statics) {
    app.use(endpoint,express.static(statics[endpoint]));
    console.log(`Asigning path ${endpoint} to ${statics[endpoint]}`);
}


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Oauth, Device");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.listen(params.port, () => {
    console.log(`Web server listening on ${params.host}:${params.port}`)
})