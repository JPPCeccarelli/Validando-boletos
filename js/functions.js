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
        return JSON.stringify(response.toJSON());
    }
}

module.exports = { 
    verifyLength,
    verifyIfPositiveInteger,
    verifyURL,
    titulos
}