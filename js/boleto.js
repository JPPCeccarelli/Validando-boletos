const http = require('http');

function verifyValue(value) {
    if(typeof value === "number") {
        if(value < 5) throw new Error('Valor do boleto deve ser maior que 5');
        else return value;
    } else {
        throw new Error('Valor do boleto deve ser um número');
    }
}

function verifyExpiryDate(date) {
    if(date.getMonth()) {
        
    } else {
        throw new Error('Data de expiração deve ser um objeto do tipo Date()');
    }
}








module.exports = {
    verifyValue
}