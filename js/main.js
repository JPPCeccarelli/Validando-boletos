const http = require('http');
const functions = require('./functions');

const PORT = 8080;

const server = http.createServer();

function sendResponse(response, status, mimeType, message) {
    response.statusCode = status;
    response.setHeader('Content-Type', mimeType);
    response.end(message);
}

server.on('request', (request, response) => {
    const { method, url } = request;
    if(method.toUpperCase() === "GET") {
        try {

            const linhaDigitavel = functions.verifyURL(url);
            const lenLD = functions.verifyLength(linhaDigitavel);
            functions.verifyIfPositiveInteger(linhaDigitavel);

            if(lenLD === 47) {

                functions.titulos.verifyDigits(linhaDigitavel);
                const barcode = functions.titulos.generateBarcode(linhaDigitavel);
                functions.titulos.verifyFifthDigit(barcode);
                const resJSON = functions.titulos.generateResponse(barcode);
                sendResponse(response, 200, 'application/json', resJSON);

            } else if (lenLD === 48) {

                const barcode = functions.convenios.verifyAndGenerateBarCode(linhaDigitavel);
                functions.convenios.verifyGeneralDigit(barcode);
                const resJSON = functions.convenios.generateResponse(barcode);
                sendResponse(response, 200, 'application/json', resJSON);

            } else {

                sendResponse(response, 400, 'text/plain', "Algo inesperado ocorreu.");

            }

        } catch(err) {

            sendResponse(response, 400, 'text/plain', err.toString());

        }
    } else if (method.toUpperCase() !== "GET") {

        sendResponse(response, 400, 'text/plain', "Apenas operações com GET são suportadas.")

    }
});

server.listen(8080, console.log(`Listening on PORT ${PORT}`));