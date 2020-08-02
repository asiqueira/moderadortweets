const express = require('express');
const handlebars = require('express-handlebars');
const sqlite3 = require('sqlite3');
const Twit = require('twit');
require('dotenv').config();

const app = express();

//CONFIGURANDO A APLICAÇÃO PARA UTILIZAR O HANDLEBARS COMO ENGINE DE LAYOUTS
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/layouts',
}));
//COMANDOS PARA PERMITIR A UTILIZAÇÃO ARQUIVOS ESTÁTICOS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/js'));

//CONEXÃO COM O BANCO DE DADOS
let db = new sqlite3.Database('./db/moderadortweets.db');
console.log('Conexão com o banco de dados aberta');

//HASHTAG CUJOS TWEETS SERÃO COLETADOS
var nm_hashtag = '';

//VARIÁVEL PARA STREAM DE DADOS DO TWITTER
var stream;

//INDICA O TWEET EM EXIBIÇÃO NO TELÃO
var id_tweet_exibicao = 0;

//INDICA SE O TWEET ESCOLHIDO DEVE SER EXIBIDO OU NÃO NO TELÃO
var lg_tweet_exibicao = false;

//LOGIN PARA UTILIZAR A API DO TWITTER
const T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
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
        db.run("INSERT INTO tweets(nm_screen_name, nm_url_imagem, tx_mensagem, nm_status, nm_postagem) VALUES(?, ?, ?, ?, datetime('now', 'localtime'))", [tweet.user.screen_name, tweet.user.profile_image_url, tweet.text, 'Em moderação'], function(err) {
            if (err) {
                return console.log(err.message);
            }
        });
    });

    res.render('moderacao', {layout : 'principal', post: {hashtag: nm_hashtag}});
});

//TELA DE EXIBIÇÃO DE TWEETS MODERADOS
app.get('/exibicao', function (req, res) {
    res.render('exibicao', {layout : 'principal', post: {hashtag: nm_hashtag, hashtag_url: encodeURIComponent(nm_hashtag)}});
});

//RECUPERA OS TWEETS QUE TENHAM A HASHTAG UTILIZADA E QUE ESTEJAM DENTRO DE UM DETERMINADO INTERVALO
app.get('/carregaTweets', function (req, res) {
    nm_intervalo = req.query.intervalo;

    db.all("SELECT id_tweet, nm_postagem, nm_screen_name, nm_url_imagem, tx_mensagem, nm_status FROM tweets WHERE UPPER(tx_mensagem) LIKE UPPER('%" + nm_hashtag + "%') AND nm_postagem > datetime('now', 'localtime', '" + nm_intervalo + "')", [], (err, rows) => {
        if (err) {
          return console.error(err.message);
        }

        res.json(rows);
      });
});

//RECUPERA OS TWEETS APROVADOS QUE TENHAM A HASHTAG UTILIZADA E QUE ESTEJAM DENTRO DE UM DETERMINADO INTERVALO
app.get('/carregaTweetsExibicao', function (req, res) {
    nm_intervalo = req.query.intervalo;

    db.all("SELECT id_tweet, nm_postagem, nm_screen_name, nm_url_imagem, tx_mensagem, nm_status FROM tweets WHERE nm_status = 'Aprovado' AND UPPER(tx_mensagem) LIKE UPPER('%" + nm_hashtag + "%') AND nm_postagem > datetime('now', 'localtime', '" + nm_intervalo + "')", [], (err, rows) => {
        if (err) {
          return console.error(err.message);
        }

        res.json(rows);
      });
});

//APROVAÇÃO DE TWEETS NO BANCO DE DADOS
app.get('/aprovaTweet', function (req, res) {
    id_tweet = req.query.id_tweet;

    db.run("UPDATE tweets SET nm_status = 'Aprovado' WHERE id_tweet = ?", [id_tweet], function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
});

//REJEIÇÃO DE TWEETS NO BANCO DE DADOS
app.get('/rejeitaTweet', function (req, res) {
    id_tweet = req.query.id_tweet;

    db.run("UPDATE tweets SET nm_status = 'Rejeitado' WHERE id_tweet = ?", [id_tweet], function(err) {
        if (err) {
            return console.log(err.message);
        }
    });
});

//SIMULAÇÃO DE UM TELÃO PARA EXIBIÇÃO DOS TWEETS
app.get('/telao', function (req, res) {
    res.render('telao', {layout : 'principal'});
});

//EXIBE TWEET NO TELÃO
app.get('/exibeTweet', function (req, res) {
    id_tweet_exibicao = req.query.id_tweet;
    lg_tweet_exibicao = true;
    
});

//RETIRA TWEET DO TELÃO
app.get('/retiraTweet', function (req, res) {
    id_tweet_exibicao = 0;
    lg_tweet_exibicao = false;
});

//CONSULTA AÇÃO QUE DEVE SER FEITA COM TWEET NO TELÃO
app.get('/consultaTweetTelao', function (req, res) {
    if(id_tweet_exibicao != 0)
    {
        //RECUPERANDO O TWEET QUE DEVERÁ SER EXIBIDO NO TELÃO
        db.all("SELECT nm_screen_name, nm_url_imagem, tx_mensagem FROM tweets WHERE id_tweet = ?", [id_tweet_exibicao], (err, rows) => {
            if (err) {
              return console.error(err.message);
            }
            
            id_tweet_exibicao = 0;

            res.json({'tweet': rows, "lg_exibicao": lg_tweet_exibicao});
        });
    }
    else
    {
        res.json({'tweet': [], "lg_exibicao": lg_tweet_exibicao});
    }
});

app.listen(3000, function () {
    console.log('Aplicação iniciada na porta 3000.');
});