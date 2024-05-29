Test data import job
--------------------

→ Go to data-import-server→ npm i && npm run log-watch

Test api for getting data
-------------------------

→ Go to app-server→ npm i && npm run log-watch server started at port 3000→ curl -X POST \\'http://localhost:3000/cases/' \\--header 'Accept: \*/\*' \\--header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \\--header 'Content-Type: application/json' \\--data-raw '{ "getCasesQueryObject" : { "city" : \["483"\], "start" : 0, "end" : 4, "from" : 0, "to" : 1212121212121212 }}

Folders explained
-----------------

→ app-models ⇒ library distributing general model and classes to other libraries and server→ server-components ⇒ library handling and exposing database layer→ app-server ⇒ client facing server→ data-import-server ⇒ using to import data or doing bulk jobs→ log-decorator ⇒ used to log any and all erros (right now in console but can be used to upload logs to elastic or cloud watch)