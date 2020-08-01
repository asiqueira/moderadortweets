//FAZ REQUEST PARA RECUPERAR OS TWEETS DO BANCO DE DADOS
function carregaTweets(divDestino) {
    console.log("---------- carregaTweets ----------");
    var tx_retorno = "";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            json_retorno = JSON.parse(this.responseText);

            for(var i = 0; i < json_retorno.length; i++)
            {
                tx_retorno = tx_retorno + "<div id='divTweet_" + json_retorno[i].id_tweet + "'>";
                tx_retorno = tx_retorno + "<table>";
                tx_retorno = tx_retorno + "<tr>";
                tx_retorno = tx_retorno + "<td style='width:150px;'>" + json_retorno[i].nm_postagem + "</td>";
                tx_retorno = tx_retorno + "<td style='width:60px;'><img src='" + json_retorno[i].nm_url_imagem + "'></td>";
                tx_retorno = tx_retorno + "<td style='width:150px;'>" + json_retorno[i].nm_screen_name + "</td>";
                tx_retorno = tx_retorno + "<td style='width:700px;'>" + json_retorno[i].tx_mensagem + "</td>";
                tx_retorno = tx_retorno + "<td style='width:90px;'><button type='button' class='btn btn-success' onClick='javascript:aprovarTweet(" + json_retorno[i].id_tweet + ");'>Aprovar</button></td>";
                tx_retorno = tx_retorno + "<td style='width:90px;'><button type='button' class='btn btn-danger' onClick='javascript:rejeitarTweet(" + json_retorno[i].id_tweet + ");'>Rejeitar</button></td>";
                tx_retorno = tx_retorno + "</tr>";
                tx_retorno = tx_retorno + "</table>";
                tx_retorno = tx_retorno + "</div>";
            }

            document.getElementById(divDestino).innerHTML = document.getElementById(divDestino).innerHTML + tx_retorno;
        }
    };

    xhttp.open("GET", "/carregaTweets", true);
    xhttp.send();
}

//FAZ REQUEST DA APROVAÇÃO DE TWEETS
function aprovarTweet(id_tweet)
{
    console.log("---------- aprovarTweet(" + id_tweet + ") ----------");

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(id_tweet) {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Tweet aprovado");
        }
    };

    document.getElementById("divTweet_" + id_tweet).style.backgroundColor = "#90EE90";

    xhttp.open("GET", "/aprovaTweet?id_tweet=" + id_tweet, true);
    xhttp.send();
}

//FAZ REQUEST DA REJEIÇÃO DE TWEETS
function rejeitarTweet(id_tweet)
{
    console.log("---------- rejeitarTweet(" + id_tweet + ") ----------");
    
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(id_tweet) {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Tweet rejeitado");
        }
    };

    document.getElementById("divTweet_" + id_tweet).style.backgroundColor = "#EE9090";

    xhttp.open("GET", "/rejeitaTweet?id_tweet=" + id_tweet, true);
    xhttp.send();
}