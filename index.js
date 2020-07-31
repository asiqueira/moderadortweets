const express = require('express');
const handlebars = require('express-handlebars');
const sqlite3 = require('sqlite3');
const Twit = require('twit');

const app = express();

//CONFIGURANDO A APLICAÇÃO PARA UTILIZAR O HANDLEBARS COMO ENGINE DE LAYOUTS
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/layouts',
}));
//COMANDO PARA PERMITIR A UTILIZAÇÃO ARQUIVOS ESTÁTICOS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//CONEXÃO COM O BANCO DE DADOS
let db = new sqlite3.Database('./db/moderadortweets.db');
console.log('Conexão com o banco de dados aberta');

//HASHTAG CUJOS TWEETS SERÃO COLETADOS
var nm_hashtag = '';

//VARIÁVEL PARA STREAM DE DADOS DO TWITTER
var stream;

//LOGIN PARA UTILIZAR A API DO TWITTER
const T = new Twit({
    consumer_key: 'SSVLCiPYT2ndysTYNYuIiRKY3',
    consumer_secret: 'WuK5m77757m6Aa8tdooRu7V95Gvlrq1tlrgESgmoamFsDhlUUw',
    access_token: '183344000-FkwTQsIOxy6sTLIw4zHEwiYCipyXpbFwklwlS84i',
    access_token_secret: 'qB0WPGNqLXB1lDzhXFyW6LNrneDMd4ZgaNyQMaYwl9p8v',
});

//HOME DA APLICAÇÃO
app.get('/', function (req, res) {
    res.render('home', {layout : 'principal', post: {hashtag: nm_hashtag}});
});

//TELA DE MODERAÇÃO DE TWEETS
app.get('/moderacao', function (req, res) {
    nm_hashtag = req.query.hashtag;

    console.log('---------- INICIANDO COLETA DE TWEETS COM HASHTAG ' + nm_hashtag + '----------');
    if(stream != null)
        stream.stop();
    
    stream = T.stream('statuses/filter', { track: nm_hashtag });

    stream.on('tweet', function (tweet) {
        console.log(tweet.text);

        //INSERINDO OS TWEETS NO BANCO DE DADOS
        db.run(`INSERT INTO tweets(nm_screen_name, nm_url_imagem, tx_mensagem, nm_status) VALUES(?, ?, ?, ?)`, [tweet.user.screen_name, tweet.user.profile_image_url, tweet.text, 'Em moderação'], function(err) {
            if (err) {
                return console.log(err.message);
            }
        });
    });

    res.render('moderacao', {layout : 'principal', post: {hashtag: nm_hashtag}});
});

//TELA DE EXIBIÇÃO DE TWEETS MODERADOS
app.get('/exibicao', function (req, res) {
    res.render('exibicao', {layout : 'principal'});
});

app.listen(3000, function () {
    console.log('Aplicação iniciada na porta 3000.');
});