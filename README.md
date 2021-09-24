## chatbox-normalzr

Front and Backend for a chatbox, using react, express, socket.io, mongodb, mongoose and normalzr to normalize data, just for practice.

Frontend link: https://chatboxnorm.netlify.app/

Backend link: https://desafio23.herokuapp.com/

Messages:
| Method       | Route          | Description  |
| ------------- |:-------------:| -----:|
| GET     |https://desafio23.herokuapp.com/api/mensajes/listar/ |List all products |
| POST    |https://desafio23.herokuapp.com/api/mensajes/agregar/ | Add a product by passing a JSON Body |

Message's JSON Body template: 
```Typescript
{
    "email": "string",
    "name": "string",
    "lastname": "string",
    "age": number,
    "alias": "string",
    "avatar": "string",
    "date": "string",
    "time": "string"
}
```