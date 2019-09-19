const util = require('util');
const express = require('express');
const app = express();
// includiamo la libreria "axios"
const axios = require('axios');

// Includiamo la libreria "body-parser" per gestire le richieste in JSON.
const bodyparser = require('body-parser');
app.use(bodyparser.json());

app.get ('/', function (req, res) {
    res.status (200) .json ({status: 'funziona'});
});

// Includiamo il modulo "request" per effettuare richieste HTTP
const https = require('https');


// Webhook per Telegram
app.post('/', function (req, res)  {
  console.log("Richiesta: " + JSON.stringify(req.body));
  const chatid = req.body.message.chat.id;
  const nome = req.body.message.chat.first_name;
  const text = req.body.message.text;
  var rdm = Math.random() * (800-700)+300;
  
  console.log("Utente in chat " + chatid + " ha scritto '" + text + "'");

const clientreq = https.request({
    method: 'POST',
    host: 'api.telegram.org',
    url: 'https://api.telegram.org/bot'+process.env.BOTTOKEN+'/setWebhook?url=https://prism-lancer.glitch.me/',
    path: '/bot' + process.env.BOTTOKEN + '/getMe'
  },function(resp) {
    // Questa funzione viene richiamata a richiesta eseguita
    if(resp.statusCode != 200) {
      console.log("Richiesta HTTP fallita");
      return;
    }
    console.log("Richiesta HTTP riuscita");
    
    
    var body = '';
    resp.on('data', function(d) {
        body += d;
    });
    resp.on('end', function() {
      // Ora body contiene il contenuto (corpo) della risposta
      console.log("Risposta da API Telegram: " + body);
      
      
      const j = JSON.parse(body);
      // j è un oggetto JavaScript che contiene i dati della risposta
      // ...
    });
  });

  if (text.match(/start/)) {
        axios.post('https://api.telegram.org/bot'+process.env.BOTTOKEN+'/sendMessage',
                   {
                   chat_id: chatid,
                   text: 'Benvenuto '+ nome +' nella prova di Piattaforme, richiedi il tuo Nicholas Cage! Vai su /immagine oppure su /info'
                   })
          .then(response => {
      // Messaggio postato
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...Messaggio non postato
      console.log('Error :', err)
      res.end('Error :' + err)
    })
      
      }
  if (text.match(/info/)) {
        axios.post('https://api.telegram.org/bot'+process.env.BOTTOKEN+'/sendMessage',
                   {
                   chat_id: chatid,
                   text: 'Questo bot serve esclusivamente ad inviare gif random di Nicholas Cage, divertiti a vedere il meme piu cliccato dell internet'
                   })
          .then(response => {
      // Messaggio postato
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...Messaggio non postato
      console.log('Error :', err)
      res.end('Error :' + err)
    })
      
      }
 if (text.match(/immagine/)) {
        axios.post('https://api.telegram.org/bot'+process.env.BOTTOKEN+'/sendAnimation',
               {
                    chat_id: chatid,
                    animation: "https://www.placecage.com/gif/200/"+rdm
               })
      .then(response => {
      // Messaggio postato
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...Messaggio non postato
      console.log('Error :', err)
      res.end('Error :' + err)
    })
  }
  clientreq.end(); // questa chiamata esegue la richiesta
});



const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});