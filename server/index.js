const express = require('express');
const fs = require('fs');
const path = require('path');
const DIST = 'dist';
const opn = require('opn');
const app = express();
var rp = require('request-promise');
const staticPath = path.join(__dirname, '..', DIST, 'static');
// const favicon = path.join(__dirname, '..', DIST, 'favicon.ico');
const port = 3000;
app.use('/static', express.static(staticPath));
// app.use('/favicon.icon', express.static(favicon));


// 接口
app.use('/api/test', (req, res) => {
    let urls = [
        'https://eosstud.com/api/balance',
        'https://eosstud.com/api/player',
        'https://eosstud.com/api/counter',
    ];

    let options = {
        uri: urls[0],
        method: 'get',
        timeout: 5000,
        // headers: {
        //     'Host': "maps.googleapis.com",
        //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        //     'Accept-Encoding': 'gzip, deflate, sdch, br',
        //     'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4',
        //     'Cache-Control': 'max-age=0',
        //     'Upgrade-Insecure-Requests': '1',
        //     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36',
        //     'X-Client-Data': 'CJe2yQEIprbJAQjBtskB'

        // }
    };

    rp(options).then((json) => {
        console.log(json);
    });

    res.send({ 'msg': '', code: 0, data: [] });
});




app.use((req, res) => {
    const file = path.join(__dirname, '..', DIST, 'index.html');
    fs.readFile(file, 'utf-8', (err, content) => {
        if (err) {
            console.log('\x1B[31mPlease execute \x1B[41m\x1B[37m\x1B[1mnpm run build\x1B[0m \x1B[31mfirst\x1B[0m');
            res.status(404).send('We cannot open \'index.html\' file.<br/>Maybe you need to pack it once');
        } else {
            res.set('Content-Type', 'text/html');
            res.send(content);
        }
    });

});
app.listen(port);
opn('http://localhost:' + port);
