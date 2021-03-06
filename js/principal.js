//FAZ REQUEST PARA RECUPERAR OS TWEETS COLETADOS DENTRO DE UM INTERVALO
function carregaTweets(divDestino, intervalo) {
    console.log("---------- carregaTweets ----------");
    var tx_retorno = "";
    var tx_style = "";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            json_retorno = JSON.parse(this.responseText);

            //DEFININDO A SINALIZAÇÃO DE STATUS DOS TWEETS
            for(var i = 0; i < json_retorno.length; i++)
            {
                switch(json_retorno[i].nm_status)
                {
                    case "Aprovado":
                        tx_style = "background-color: #90EE90";
                    break;
                    case "Rejeitado":
                        tx_style = "background-color: #EE9090";
                    break;
                    default:
                        tx_style = "";
                    break;
                }

                //MONTANDO A ESTRUTURA DE TWEETS QUE SERÁ RETORNADA PARA O USUÁRIO
                tx_retorno = tx_retorno + "<div id='divTweet_" + json_retorno[i].id_tweet + "' style='" + tx_style + "'>";
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

            if(json_retorno != "")
                document.getElementById("divSpinner").style.display = "none";
            
            document.getElementById(divDestino).innerHTML = document.getElementById(divDestino).innerHTML + tx_retorno;
        }
    };

    xhttp.open("GET", "/carregaTweets?intervalo=" + intervalo, true);
    xhttp.send();
}

//FAZ REQUEST PARA RECUPERAR OS TWEETS APROVADOS DENTRO DE UM INTERVALO
function carregaTweetsExibicao(divDestino, intervalo) {
    console.log("---------- carregaTweetsExibicao ----------");
    var tx_retorno = "";
    var tx_style = "";
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            json_retorno = JSON.parse(this.responseText);

            //DEFININDO A SINALIZAÇÃO DE STATUS DOS TWEETS
            for(var i = 0; i < json_retorno.length; i++)
            {
                switch(json_retorno[i].nm_status)
                {
                    case "Aprovado":
                        tx_style = "background-color: #90EE90";
                    break;
                    case "Rejeitado":
                        tx_style = "background-color: #EE9090";
                    break;
                    default:
                        tx_style = "";
                    break;
                }

                //MONTANDO A ESTRUTURA DE TWEETS QUE SERÁ RETORNADA PARA O USUÁRIO
                tx_retorno = tx_retorno + "<div id='divTweet_" + json_retorno[i].id_tweet + "' style='" + tx_style + "'>";
                tx_retorno = tx_retorno + "<table>";
                tx_retorno = tx_retorno + "<tr>";
                tx_retorno = tx_retorno + "<td style='width:150px;'>" + json_retorno[i].nm_postagem + "</td>";
                tx_retorno = tx_retorno + "<td style='width:60px;'><img src='" + json_retorno[i].nm_url_imagem + "'></td>";
                tx_retorno = tx_retorno + "<td style='width:150px;'>" + json_retorno[i].nm_screen_name + "</td>";
                tx_retorno = tx_retorno + "<td style='width:700px;'>" + json_retorno[i].tx_mensagem + "</td>";
                tx_retorno = tx_retorno + "<td style='width:90px;'><button type='button' class='btn btn-success' onClick='javascript:exibirTweet(" + json_retorno[i].id_tweet + ");'>Exibir</button></td>";
                tx_retorno = tx_retorno + "<td style='width:90px;'><button type='button' class='btn btn-danger' onClick='javascript:retirarTweet(" + json_retorno[i].id_tweet + ");'>Retirar</button></td>";
                tx_retorno = tx_retorno + "</tr>";
                tx_retorno = tx_retorno + "</table>";
                tx_retorno = tx_retorno + "</div>";
            }

            if(json_retorno != "")
                document.getElementById("divSpinner").style.display = "none";
            
            document.getElementById(divDestino).innerHTML = document.getElementById(divDestino).innerHTML + tx_retorno;
        }
    };

    xhttp.open("GET", "/carregaTweetsExibicao?intervalo=" + intervalo, true);
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

//AUTORIZA A EXIBIÇÃO DE UM TWEET NO TELÃO
function exibirTweet(id_tweet)
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Tweet em exibição");
        }
    };

    xhttp.open("GET", "/exibeTweet?id_tweet=" + id_tweet, true);
    xhttp.send();
}

//RETIRA O TWEET QUE ESTÁ SENDO EXIBIDO NO TELÃO
function retirarTweet(id_tweet)
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("Tweet retirado do telão");
        }
    };

    xhttp.open("GET", "/retiraTweet?id_tweet=" + id_tweet, true);
    xhttp.send();
}

//CONSULTA AÇÃO QUE DEVE SER FEITA COM TWEET NO TELÃO
function consultaTweetTelao()
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            json_retorno = JSON.parse(this.responseText);

            if(json_retorno.lg_exibicao == false)
            {
                //RETIRAMOS O TWEET DO TELÃO
                document.getElementById("divTweet").innerHTML = "";
            }
            else
            {
                if(json_retorno.tweet.length > 0)
                {
                    //EXIBIMOS O TWEET
                    document.getElementById("divTweet").innerHTML = "<img src='" + json_retorno.tweet[0].nm_url_imagem + "'><br>" + json_retorno.tweet[0].nm_screen_name + "<br>" + json_retorno.tweet[0].tx_mensagem;
                }
            }
        }
    };

    xhttp.open("GET", "/consultaTweetTelao", true);
    xhttp.send();
}