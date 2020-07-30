const express = require('express');
const Twit = require('twit');

const app = express();

//HASHTAG CUJOS TWEETS SERÃO COLETADOS
var nm_hashtag = '#love';

//VARIÁVEL PARA STREAM DE DADOS DO TWITTER
var stream;

//LOGIN PARA UTILIZAR A API DO TWITTER
const T = new Twit({
    consumer_key: 'SSVLCiPYT2ndysTYNYuIiRKY3',
    consumer_secret: 'WuK5m77757m6Aa8tdooRu7V95Gvlrq1tlrgESgmoamFsDhlUUw',
    access_token: '183344000-FkwTQsIOxy6sTLIw4zHEwiYCipyXpbFwklwlS84i',
    access_token_secret: 'qB0WPGNqLXB1lDzhXFyW6LNrneDMd4ZgaNyQMaYwl9p8v',
});

console.log('---------- INICIANDO COLETA DE TWEETS ----------');
stream = T.stream('statuses/filter', { track: nm_hashtag });

stream.on('tweet', function (tweet) {
    console.log(tweet);
});

//HOME DA APLICAÇÃO
app.get('/', function (req, res) {
    res.send('Olá, moderador!');
});

app.listen(3000, function () {
    console.log('Aplicação iniciada na porta 3000.');
});