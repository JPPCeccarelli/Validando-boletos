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
    console.log("\n\n\nTeste para verificar resposta JSON do título")
    let barcode = "21299758700000020000001121100012100447561740";
    let expected = '{"barCode":"21299758700000020000001121100012100447561740","amount":"20.00","expirationDate":"2018-07-16"}';
    let actual = functions.titulos.generateResponse(barcode);
    assert.deepStrictEqual(actual, expected, console.log(`Input: ${barcode} gera ${expected}`));
})();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(() => {
    console.log("\n\n\nTeste para verificar validade dos dígitos verificados para título");
    console.log("\nTeste 1: retorna true se forem válidos:")
    let linhaDigitavel = "21290001192110001210904475617405975870000002000";
    let expected = true;
    let actual = functions.titulos.verifyDigits(linhaDigitavel)
    assert.strictEqual(expected, actual, console.log(`Input: ${linhaDigitavel} é validada como ${expected}}`));

    linhaDigitavel = "00190500954014481606906809350314337370000000100";
    actual = functions.titulos.verifyDigits(linhaDigitavel)
    assert.strictEqual(expected, actual, console.log(`Input: ${linhaDigitavel} é validada como ${expected}}`));
})();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(() => {
    console.log("\nTeste 2: retorna erro se forem inválidos:")
    let linhaDigitavel = "21290001182110001210904475617405975870000002000";
    let expected = Error("Dígitos verificadores inválidos.");
    assert.throws(() => {
        functions.titulos.verifyDigits(linhaDigitavel)
    }, expected, console.log(`Input: ${linhaDigitavel} gera ${expected}`))
})();

(() => {
    console.log("\n\n\nTeste para verificar validade do quinto dígito");
    console.log("\nTeste 1: retorna true se o código de barras é válido")
    let barcode = "23797404300001240200448056168623793601105800";
    let expected = true;
    let actual = functions.titulos.verifyFifthDigit(barcode)
    assert.strictEqual(expected, actual, console.log(`Input: ${barcode} é validada como ${expected}`));
})();

(() => {
    console.log("\nTeste 2: retorna error se o código de barras é inválido")
    let barcode = "23793404300001240200448056168623793601105800";
    let expected = Error("Dígito verificador (módulo 11) inválido");
    assert.throws(() => {
        functions.titulos.verifyFifthDigit(barcode)
    }, expected, console.log(`Input: ${barcode} gera ${expected}`))
})();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(() => {
    console.log("\n\n\nTeste para verificar validade dos dígitos verificados para convênio");
    console.log("\nTeste 1: retorna código de barra se for válido");
    let linhaDigitavel = "846700000017435900240209024050002435842210108119";
    let expected = "84670000001435900240200240500024384221010811";
    let actual = functions.convenios.verifyAndGenerateBarCode(linhaDigitavel);
    assert.strictEqual(expected, actual, console.log(`Input: ${linhaDigitavel} gera ${expected}`));

    linhaDigitavel = "858200000260178601801205529544183860673925100017";
    expected = "85820000026178601801205295441838667392510001";
    actual = functions.convenios.verifyAndGenerateBarCode(linhaDigitavel);
    assert.strictEqual(expected, actual, console.log(`Input: ${linhaDigitavel} gera ${expected}`));
})();

(() => {
    console.log("\nTeste 2: retorna erro se dígitos verificadores forem inválido");
    let linhaDigitavel = "846700000018435900240209024050002435842210108119";
    let expected = new Error(`Um dos dígitos verificadores é inválido.`);
    assert.throws(() => {
        functions.convenios.verifyAndGenerateBarCode(linhaDigitavel);
    }, expected, console.log(`Input: ${linhaDigitavel} gera ${expected}`))
})();

(() => {
    console.log("\nTeste 3: retorna erro se dígito de valor efetivo for inválido");
    let linhaDigitavel = "843700000018435900240209024050002435842210108119";
    let expected = Error("Identificador de valor efetivo inválido");
    assert.throws(() => {
        functions.convenios.verifyAndGenerateBarCode(linhaDigitavel);
    }, expected, console.log(`Input: ${linhaDigitavel} gera ${expected}`))
})();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(() => {
    console.log("\n\n\nTestes de verificação do dígito geral de validação do convênio");
    console.log("\nTeste 1: retorna true se dígito geral for válido");
    let barcode = "84670000001435900240200240500024384221010811";
    let expected = true;
    let actual = functions.convenios.verifyGeneralDigit(barcode);
    assert.strictEqual(expected, actual, console.log(`Input: ${barcode} gera ${expected}`));

    barcode = "85820000026178601801205295441838667392510001";
    actual = functions.convenios.verifyGeneralDigit(barcode);
    assert.strictEqual(expected, actual, console.log(`Input: ${barcode} gera ${expected}`));
})();

(() => {
    console.log("\nTeste 2: retorna error se for dígito geral for inválido");
    let barcode = "84671000001435900240200240500024384221010811";
    let expected = Error("Dígito verificador geral é inválido");
    assert.throws(() => {
        functions.convenios.verifyGeneralDigit(barcode)
    }, expected, console.log(`Input: ${barcode} gera ${expected}`));

    barcode = "85821000026178601801205295441838667392510001";
    assert.throws(() => {
        functions.convenios.verifyGeneralDigit(barcode)
    }, expected, console.log(`Input: ${barcode} gera ${expected}`));
})();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

(() => {
    console.log('\n\n\nTesta resposta para código de barras do convênio');
    let barcode = "85820000026178601801205295441838667392510001";
    let expected = '{"barCode":"85820000026178601801205295441838667392510001","amount":"2617.86","expirationDate":""}';
    let actual = functions.convenios.generateResponse(barcode);
    assert.deepStrictEqual(expected, actual, console.log(`Input: ${barcode} gera ${expected}`));

    barcode = "84670000001435900240200240500024384221010811";
    expected = '{"barCode":"84670000001435900240200240500024384221010811","amount":"143.59","expirationDate":""}';
    actual = functions.convenios.generateResponse(barcode);
    assert.deepStrictEqual(expected, actual, console.log(`Input: ${barcode} gera ${expected}`));
})();