function verifyURL(url) {
    url = url.split('/');
    if(url[0] === "" && url[1] === "boleto" && url.length === 3) {
        if(url[2] !== "") return url[2];
        else if (url[2] === "") throw new Error("URL não possui linha digitável após /boleto/");
    }
    else throw new Error("URL deve começar com /boleto/");
}

function verifyIfPositiveInteger(value) {
    if(typeof value !== "string") throw new Error("Linha digitável deve ser passada como String!");
    if(/^\d+$/.test(value)) { 
        if(Number(value) > 0) return true;
        else throw new Error("A linha digitável deve ser um número inteiro maior que 0!");
    } else {
        throw new Error("A linha digitável deve ser um número inteiro maior que 0!");
    }
}


function verifyLength(value) {
    if(typeof value !== "string") throw new Error("A linha digitável deve ser passada como String!");
    else {
        if(value.length < 47 || value.length > 48) throw new Error("A linha digitável deve ter 47 ou 48 dígitos");
        else return value.length;
    }
} 

const titulos = {

    generateBarcode: (value) => {
        if(value.length !== 47) throw new Error("Linha digitável do título não contém 47 dígitos.");
        if(typeof value !== "string") throw new Error("Linha digitável deve ser passada como string");
        
        let barcode = new String();
        barcode += value.substring(0, 4);
        barcode += value.substring(32, value.len);
        barcode += value.substring(4, 9);
        barcode += value.substring(10, 20);
        barcode += value.substring(21, 31);
        return barcode;
        
    },

    verifyDigits: (linhaDigitavel) => {

        function addDigit(sum, results) {
            sum = sum % 10;
            results.push(10 - sum);
            return 0;
        }
        
        if(linhaDigitavel.length !== 47) throw new Error("Linha digitável do título não contém 47 dígitos.");
        if(typeof linhaDigitavel !== "string") throw new Error("Parâmetros não são String.");

        let verifyingDigits = new Array();
        let results = new Array();
        verifyingDigits.push(linhaDigitavel.substring(9, 10), linhaDigitavel.substring(20, 21), linhaDigitavel.substring(31, 32));
        let digits = new Array();
        for(let digit of linhaDigitavel) digits.push(Number(digit));

        let mult = 2, sum = 0, num = 0; 

        for(let i = 8; i >= 0; i--) {
            if(i % 2 == 0) mult = 2;
            else mult = 1;

            num = mult*digits[i];
            if(num >= 10) num = num - 9;
            sum += num;
        }

        sum = addDigit(sum, results);

        for(let i = 19; i >= 10; i--) {
            if(i % 2 == 0) mult = 1;
            else mult = 2;

            num = mult*digits[i];
            if(num >= 10) num = num - 9;
            sum += num;
        }

        sum = addDigit(sum, results);

        for(let i = 30; i >= 21; i--) {
            if(i % 2 == 0) mult = 2;
            else mult = 1;

            num = mult*digits[i];
            if(num >= 10) num = num - 9;
            sum += num;
        }

        sum = addDigit(sum, results);

        for(let i = 0; i < 3; i++) {
            if(results[i] !== Number(verifyingDigits[i])) throw new Error("Dígitos verificadores inválidos.")
        }

        return true;
    },

    verifyFifthDigit: (barcode) => {
        if(barcode.length !== 44) throw new Error("Código de barras não contém 44 dígitos.");
        if(typeof barcode !== "string") throw new Error("Código de barras deve ser passado como string");

        let j = 2, sum = 0, barcodeDigits = barcode.split("");

        for(let i = 43; i >= 0; i--) {
            if(i !== 4) {
                if(j > 9) j = 2;
                sum += j*barcodeDigits[i];
                j += 1;
            }
        }

        let resto = sum % 11;
        if(resto === 0 || resto === 1) resto === 11;
        if(11 - resto !== Number(barcodeDigits[4])) throw new Error("Dígito verificador (módulo 11) inválido");

        return true;
    },

    generateResponse: (barcode) => {
        if(barcode.length !== 44) throw new Error("Código de barras não contém 44 dígitos.");
        if(typeof barcode !== "string") throw new Error("Código de barras deve ser passado como string");

        class res {
            constructor(barcode) {

                this.getDate = (barcode) => {
                    Date.prototype.addDays = function(days) {
                        var date = new Date(this.valueOf());
                        date.setDate(date.getDate() + days);
                        return date;
                    }
            
                    let days = Number(barcode.substring(5, 9));
                    let initialDay = new Date(1997, 9, 7);
                    let expirationDate = initialDay.addDays(days);
            
                    let dd = expirationDate.getDate().toString(),
                        mm = (expirationDate.getMonth() + 1).toString(),
                        yyyy = expirationDate.getFullYear();
    
                    if (mm.length < 2) mm = '0' + mm;
                    if (dd.length < 2) dd = '0' + dd;
            
                    return expirationDate = [yyyy, mm, dd].join('-');
                }

                this.barCode = barcode;
                this.amount = Number(barcode.substring(9, 17)) + '.' + barcode.substring(17, 19);
                this.expirationDate = this.getDate(barcode);
            }

            toJSON() {
                return {
                    barCode: this.barCode,
                    amount: this.amount,
                    expirationDate: this.expirationDate
                }
            }

        }

        let response = new res(barcode);
        return JSON.stringify(response);
    }
}

const convenios = {

    verifyAndGenerateBarCode: (linhaDigitavel) => {

        if(typeof linhaDigitavel !== "string") throw new Error("Linha digitável não é uma string.");
        if(linhaDigitavel.length !== 48) throw new Error("Linha digitável deve conter 48 dígitos");

        let digits = linhaDigitavel.split("");

        let barcode = "",
            sum = 0,
            num = 0;

        if(Number(linhaDigitavel[2]) === 6 || Number(linhaDigitavel[2]) === 7) {
            let mult = 2;
            for(let i = 0; i <= 47; i++) {
                if(i !== 11 && i !== 23 && i !== 35 && i !== 47) {
    
                    if(i % 2 === 0) mult = 2;
                    else mult = 1;
    
                    barcode += digits[i];
                    num = digits[i]*mult;
                    if(num >= 10) num = num % 9;
                    sum += num;
    
                } else {
    
                    let resto = sum % 10;
                    if(resto === 0) resto = 10;
                    if(10 - resto !== Number(digits[i])) throw new Error(`Um dos dígitos verificadores é inválido.`);
                    sum = 0;
    
                }
            }
        } else if (Number(linhaDigitavel[2]) === 8 || Number(linhaDigitavel[2]) === 9) {
            let j = 4;
            for(let i = 0; i <= 47; i++) {
                if(i !== 11 && i !== 23 && i !== 35 && i !== 47) {
    
                    if(j < 2) j = 9;

                    barcode += digits[i];
                    num = digits[i]*j;
                    sum += num;
                    j = j - 1;
    
                } else {
    
                    let resto = sum % 11;
                    if(resto === 1 || resto === 0) resto = 11;
                    if(11 - resto !== Number(digits[i])) throw new Error(`Um dos dígitos verificadores é inválido.`);
                    sum = 0;
                    j = 4;
    
                }
            }
        } else {
            throw new Error("Identificador de valor efetivo inválido");
        }

        return barcode
    },

    verifyGeneralDigit: (barcode) => {

        if(typeof barcode !== "string") throw new Error("Código de barras não é uma string.");
        if(barcode.length !== 44) throw new Error("Código de barras deve conter 44 dígitos");

        let barcodeDigits = barcode.split(""),
            sum = 0,
            num = 0;

        if(Number(barcodeDigits[2]) === 6 || Number(barcodeDigits[2]) === 7) {
            let mult = 1;
            for(let i = 0; i <= 43; i++) {
                if(i !== 3) {
                    if(mult === 1) mult = 2;
                    else if(mult === 2) mult = 1;
    
                    num = barcodeDigits[i]*mult;
                    if(num >= 10) num = num % 9;
                    sum += num;
                }
            }

            sum = sum % 10;

            if(Number(barcodeDigits[3]) !== (10 - sum)) throw new Error("Dígito verificador geral é inválido");
    
        } else if(Number(barcodeDigits[2]) === 8 || Number(barcodeDigits[2]) === 9){

            let j = 4, sum = 0; 
            for(let i = 0; i <= 43; i++) {
                if(i !== 3) {
                    if(j < 2) j = 9;
    
                    num = barcodeDigits[i]*j;
                    sum += num;
                    j = j - 1;
                }
            }

            let resto = sum % 11;
            if(resto === 1 || resto === 0) resto = 11;
            if(11 - resto !== Number(barcodeDigits[3])) throw new Error("Dígito verificador geral é inválido");

        } else {
            throw new Error("Identificador de valor efetivo inválido");
        }

        return true;
    }

}

module.exports = { 
    verifyLength,
    verifyIfPositiveInteger,
    verifyURL,
    titulos,
    convenios
}