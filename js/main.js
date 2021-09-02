const http = require('http');
const functions = require('./functions');

const PORT = 8080;

const server = http.createServer();

server.on('request', (request, response) => {
    const { method, url } = request;
    if(method.toUpperCase() === "GET") {
        try {

            const linhaDigitavel = functions.verifyURL(url);
            const lenLD = functions.verifyLength(linhaDigitavel);
            functions.verifyIfPositiveInteger(linhaDigitavel);

            if(lenLD === 47) {

                

            } else if (lenLD === 48) {



            } else {

                response.statusCode = 400;
                response.setHeader('Content-Type', 'text/plain');
                response.end("Algo inesperado ocorreu.")

            }

        } catch(err) {

            err = err.toString()

            response.statusCode = 400;
            response.setHeader('Content-Type', 'text/plain');
            response.end(err);

        }
    } else if (method.toUpperCase() !== "GET") {

        response.statusCode = 400;
        response.setHeader('Content-Type', 'text/plain');
        response.end("Apenas operações com GET são suportadas.")

    }
});

server.listen(8080, console.log(`Listening on PORT ${PORT}`));