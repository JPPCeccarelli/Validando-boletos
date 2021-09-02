// Testes

// Como foi especificado no enunciado, para a validação não devem ser utilizadas bibliotecas de terceiros
// pois o intuito é testar apenas a lógica (portanto, não vou usar Mocha+Chai)

const assert = require('assert');
const { Console } = require('console');
const main = require('./main');

// Testes do valor do boleto

(() => {
    console.log("Testes relacionado ao valor do boleto:"); 
    console.log('\nTeste 1:');
    let expectedValue = 100;
    let returnedValue = main.verifyValue(100);
    assert.strictEqual(expectedValue, returnedValue, console.log(`Input: ${expectedValue} e deve retornar ${expectedValue};`));
})();

(() => {
    console.log('\nTeste 2:')
    let notANumber = ['a', [], {}, true, null, undefined, new Date(),'.'];
    let expected = Error('Valor do boleto deve ser um número');
    for(val of notANumber) {
        assert.throws((val) => {
            main.verifyValue(val)
        }, 
        expected,
        console.log(`Input: ${val} (` + typeof val + `) gera Error(${expected});`))
    }
})();

(() => {
    // Valor mínimo do boleto é 5 reais
    console.log('\nTeste 3:')
    let lessThan5 = 4.99;
    let expected = new Error('Valor do boleto deve ser maior que 5');
    assert.throws(() => {
        main.verifyValue(lessThan5);
    }, 
    expected, 
    console.log(`Input: ${lessThan5} gera throw Error(${expected});`));
})(); 

// Testes da data de expiração
(() => {
    console.log("Testes relacionados à data de expiração:"); 
    console.log('\nTeste 4:')
    let notADate = ['a', [], {}, true, null, undefined, 12.3, -123,'.'];
    let expected = new Error('Data de expiração deve ser um objeto do tipo Date()');
    for(value of notADate) {
        assert.throws(() => {
            main.verifyValue(lessThan5);
        }, 
        expected, 
        console.log(`Input: ${lessThan5} gera throw Error(${expected});`));
    }
})(); 