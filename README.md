# Esercitazione Bot Telegram

Esercitazione da svolgere individualmente.

Questa repository contiene del codice di esempio per NodeJS:
un Web service che espone un singolo metodo (in `POST`), che può essere configurato come *Webhook* di un Bot Telegram.
Il server NodeJS riceverà quindi delle richieste&nbsp;HTTP per ogni messaggio ricevuto dal Bot Telegram e potrà far reagire il bot con risposte testuali (o altro).

## Svolgimento

### Configurazione del Bot

1. Registrarsi su Telegram, se non si dispone di un account utente;
1. Contattare il bot `@botfather` e seguire la conversazione guidata per creare un nuovo bot,
1. Ottenere il *token di accesso* del proprio bot (una lunga sequenza di caratteri alfanumerici).

### Configurazione del server

1. Scaricare il contenuto della repository e configurare un server raggiungibile su Internet (si consiglia di utilizzare il servizio [Glitch](https://glitch.com) oppure [Heroku](https://www.heroku.com/));
1. Caricare i file della repository sul proprio server;
1. Rinominare il file `.env-template` in `.env`, che conterrà i "segreti" della propria applicazione;
1. Incollare il *token di accesso* del proprio bot nella variabile `BOTTOKEN` del file `.env`.

### Configurazione del Webhook

1. Leggere la [documentazione del metodo setWebhook](https://core.telegram.org/bots/api#setwebhook);
1. Effettuare una richiesta HTTP con metodo `POST` all'URL `https://api.telegram.org/botTOKEN/setWebhook` (dove `TOKEN` è sostituito dall'effettivo *token di accesso* del proprio bot) ed impostando il parametro `url` con l'URL del proprio Web service;
1. L'API di Telegram confermerà la creazione del *Webhook* ed invierà così una richiesta&nbsp;HTTP al Web service per ogni messaggio ricevuto dal bot.

### Implementazione del Bot

1. Verificare la logica del file `server.js` (riga 14), dove il messaggio di Telegram in arrivo viene letto come blocco JSON e se ne estraggono i parametri (generalmente i parametri di interesse sono il "chat ID", che identifica la conversazione con l'utente, ed il testo del messaggio);
1. Alterare la logica dove viene generata una richiesta&nbsp;HTTP (riga 21), in modo da usare il [metodo sendMessage dell'API Telegram](https://core.telegram.org/bots/api#sendmessage) e quindi dialogare con l'utente.
1. Implementare una conversazione con l'utente, eventualmente effettuando del semplice *pattern matching* sull'input testuale dell'utente (ad esempio, è possibile usare il [metodo indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) per verificare la presenza di una stringa all'interno di un'altra stringa).

## Consegna

Il bot consegnato deve svolgere una semplice conversazione con l'utente, ad esempio invertendo i messaggi dell'utente, inserendo emoji casuali oppure rispondendo con [immagini casuali di Nicholas Cage](https://www.placecage.com/).
