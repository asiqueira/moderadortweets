# Moderador de Tweets
Esta aplicação faz coleta de tweets em tempo real (através da Streaming API do Twitter) com hashtag definida pelo usuário. Em seguida permite a moderação das mensagens (aprovação/rejeição) e simula a exibição em um telão. 

## Tecnologias utilizadas
* NodeJS
* SQLite3
* Bootstrap

## Como instalar e executar a aplicação
* É preciso ter o NodeJS instalado na máquina. Caso não tenha, baixe no seguinte endereço: **https://nodejs.org** e faça a instalação padrão. Esta aplicação foi testada na **versão 12.18.3 LTS**.
* Baixe o código-fonte da aplicação e faça a descompactação em algum diretório.
* Abra o diterório da aplicação no Prompt de Comando e execute **npm install**.
* Crie um arquivo chamado **.env** com as credenciais de acesso à API do Twitter, seguindo o modelo abaixo, e coloque-o no diretório-raiz da aplicação.
```
	#CREDENCIAIS PARA ACESSAR A API DO TWITTER
	#ATENÇÃO! NÃO UTILIZAR ASPAS PARA DELIMITAR AS CREDENCIAIS

	consumer_key = aaaaaaaaaaaaaaaaaaaaaa
	consumer_secret = bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
	access_token = cccccccccccccccccccccccc
	access_token_secret = dddddddddddddddddddddddddddd
```
* Ainda no Prompt, execute o comando **node index.js**
* Abra o browser e acesse o endereço **http://localhost:3000**

**Atenção!** Para simular a exibição em um telão é necessário utilizar outra aba do browser e abrir o endereço **http://localhost:3000/telao**. Esta nova aba fará o papel de um telão e abrirá os tweets enviados pela área "Exibição" da aplicação.

## Backlog de pontos para melhorar
* Eliminar os pollings para exibir novos tweets.
* Não acessar diretamente o DOM no front-end.
* Retirar trechos de código HTML/CSS de dentro do Javascript.
* Tornar a aplicação multiusuário.
