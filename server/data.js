/**
 * 随机生成N多文章
 */
const express = require('express');
const app = express();

app.set('port', (process.env.port || 3300));
app.listen(app.get('port'), function(){
    console.log('Server up: http://localhost:' + app.get('port'));
});
