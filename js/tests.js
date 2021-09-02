// Testes

// Como foi especificado no enunciado, para a validação não devem ser utilizadas bibliotecas de terceiros
// pois o intuito é testar apenas a lógica (portanto, não vou usar Mocha+Chai)

const assert = require('assert');
const functions = require('./functions');


(() => {
    console.log("Testes relacionados ao tamanho do código de barras");
    console.log("\nTeste 1: verifica se tem 47 ou 48 dígitos");
    let linhaDigitavel = "12345678901234567890123456789012345678901234567";
    let actual = functions.verifyLength(linhaDigitavel);
    let expected = 47;
    assert.strictEqual(expected, actual, console.log(`Input: ${linhaDigitavel} (${typeof linhaDigitavel}) e retorna ${expected};`));

    linhaDigitavel = "123456789012345678901234567890123456789012345678";
    actual = functions.verifyLength(linhaDigitavel);
    expected = 48;
    assert.strictEqual(expected, actual, console.log(`Input: ${linhaDigitavel} (${typeof linhaDigitavel}) e retorna ${expected};`));
})();


(() => {
    console.log("\nTeste 2: verifica se o valor passado é String");
    let barCode = 12345678901234567890123456789012345678901234567;
    const expected = new Error("A linha digitável deve ser passada como String!");
    assert.throws(() => { functions.verifyLength(barCode)}, expected, console.log(`Input: ${barCode} (${typeof barCode}) e retorna ${expected};`));
    barCode = new Date();
    assert.throws(() => { functions.verifyLength(barCode)}, expected, console.log(`Input: ${barCode} (${typeof barCode}) e retorna ${expected};`));
    barCode = {};
    assert.throws(() => { functions.verifyLength(barCode)}, expected, console.log(`Input: ${barCode} (${typeof barCode}) e retorna ${expected};`));
})();

(() => {
    console.log("\nTeste 3: verifica se < 47 ou > 48 dígitos");
    let linhaDigitavel = "1234567890";
    const expected = new Error("A linha digitável deve ter 47 ou 48 dígitos");
    assert.throws(() => {functions.verifyLength(linhaDigitavel)}, expected, 
        console.log(`Input: ${linhaDigitavel} (${typeof linhaDigitavel}) e retorna ${expected};`));

    linhaDigitavel = "12345678901234567890123456789012345678901234567890";
    assert.throws(() => {functions.verifyLength(linhaDigitavel)}, expected, 
        console.log(`Input: ${linhaDigitavel} (${typeof linhaDigitavel}) e retorna ${expected};`));
})();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(() => {
    console.log("\n\n\nTestes relacionados aos números do códigos de barras");
    console.log("\nTeste 1: verifica se input (string) é um numero > 0");
    const barCode = "12345678901234567890123456789012345678901234567";
    const actual = functions.verifyIfPositiveInteger(barCode);
    const expected = true;
    assert.strictEqual(actual, expected, console.log(`Input: ${barCode} (${typeof barCode}) e retorna ${expected};`));
})(); 

(() => {
    console.log("\nTeste 2: verifica se input (string) é um numero inteiro <= 0 e gera erro");
    let barCode = "-1234567890123456789012345678901234567890123456";
    const expected = Error("A linha digitável deve ser um número inteiro maior que 0!");
    assert.throws(() => {functions.verifyIfPositiveInteger(barCode); }, expected, 
        console.log(`Input: ${barCode} (${typeof barCode}) e gera ${expected};`));

    barCode = "123456789012345678901234567890123456789012345.12";
    assert.throws(() => {functions.verifyIfPositiveInteger(barCode); }, expected, 
        console.log(`Input: ${barCode} (${typeof barCode}) e gera ${expected};`));

    barCode = "-123.1";
    assert.throws(() => {functions.verifyIfPositiveInteger(barCode); }, expected, 
        console.log(`Input: ${barCode} (${typeof barCode}) e gera ${expected};`));

    barCode = "0.";
    assert.throws(() => {functions.verifyIfPositiveInteger(barCode); }, expected, 
        console.log(`Input: ${barCode} (${typeof barCode}) e gera ${expected};`));

})();

(() => {
    console.log("\nTeste 3: verifica se input (string) é um numero inteiro");
    let barCode = 12345678901234567890123456789012345678901234567;
    const expected = new Error("Linha digitável deve ser passada como String!");
    assert.throws(() => { functions.verifyIfPositiveInteger(barCode)}, expected, console.log(`Input: ${barCode} (${typeof barCode}) e retorna ${expected};`));
    barCode = null;
    assert.throws(() => { functions.verifyIfPositiveInteger(barCode)}, expected, console.log(`Input: ${barCode} (${typeof barCode}) e retorna ${expected};`));
    barCode = [];
    assert.throws(() => { functions.verifyIfPositiveInteger(barCode)}, expected, console.log(`Input: ${barCode} (${typeof barCode}) e retorna ${expected};`));
})();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(() => {
    console.log("\n\n\nTestes relacionados à URL");
    console.log("\nTeste 1: verifica se URL começa com /boleto/XXXX");
    let url = "/boleto/1234";
    let expected = "1234";
    let actual = functions.verifyURL(url);
    assert.strictEqual(expected, actual, console.log(`Input: ${url} retorna ${actual} (string)`));
})();

(() => {
    console.log("\nTeste 2: verifica se gera erro caso não comece com /boleto/");
    let url = "boleto";
    const expected = new Error("URL deve começar com /boleto/");
    assert.throws(() => {
        functions.verifyURL(url)
    }, expected, console.log(`Input: ${url} deve gerar ${expected}`));

    url = "//boleto/"
    assert.throws(() => {
        functions.verifyURL(url)
    }, expected, console.log(`Input: ${url} deve gerar ${expected}`));

    url = "/boleto//";
    assert.throws(() => {
        functions.verifyURL(url)
    }, expected, console.log(`Input: ${url} deve gerar ${expected}`));
})();

(() => {
    console.log('\nTeste 3: verifica o caso que url="/boleto/ (apenas)');
    url = "/boleto/";
    expected = Error("URL não possui linha digitável após /boleto/");
    assert.throws(() => {
        functions.verifyURL(url);
    }, expected, console.log(`Input: ${url} deve gerar ${expected}`));
})();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(() => {
    console.log("\n\n\nTestes relacionados à geração de boletos (títulos)")
    console.log("\nTeste 1: deve retornar o código de barras para um input de 47 dígitos");
    let linhaDigitavel = "23790448095616862379336011058009740430000124020";
    let expected = "23797404300001240200448056168623793601105800";
    let actual = functions.titulos.generateBarcode(linhaDigitavel);
    assert.strictEqual(expected, actual, console.log(`Input: ${linhaDigitavel} retorna ${expected}`));
    
    linhaDigitavel = "21290001192110001210904475617405975870000002000";
    expected = "21299758700000020000001121100012100447561740";
    actual = functions.titulos.generateBarcode(linhaDigitavel);
    assert.strictEqual(expected, actual, console.log(`Input: ${linhaDigitavel} retorna ${expected}`));
})();

(() => {
    console.log("\nTeste 2: deve gerar erro para um input !== 47 dígitos");
    let linhaDigitavel = "237904480956";
    let expected = Error("Linha digitável do título não contém 47 dígitos.");
    assert.throws(() => { functions.titulos.generateBarcode(linhaDigitavel)}, 
        expected, console.log(`Input: ${linhaDigitavel} gera erro ${expected}`));
})();

(() => {
    let barcode = "21299758700000020000001121100012100447561740";
    console.log(functions.titulos.generateResponse(barcode));
})();