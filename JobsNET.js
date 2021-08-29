function validarCPF(cpf) {
    if (cpf.length != 11) {
        return false;
    }
    else {
        var numeros = cpf.substring(0,9);
        var digitos = cpf.substring(9);

        var soma = 0
        for (var i = 10; i > 1; i--){
            soma += numeros.charAt(10 - i) * i;
        }
        
        var resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);

        if (resultado != digitos.charAt(0)) {
            return false;
        }

        soma = 0;
        numeros = cpf.substring(0,10);
       
        for (var k = 11; k > 1; k--){
            soma += numeros.charAt(11 - k) * k;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
         
        if (resultado != digitos.charAt(1)) {
            return false;
        }

        return true;
    };
}

function validacaoCPF() {
    document.getElementById('success').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    
    var cpf = document.getElementById('cpf_digitado').value;

    var resultadoValidacao = validarCPF(cpf); 
    
    if (resultadoValidacao) {
        document.getElementById('success').style.display='block';
    } 
    else {
        document.getElementById('error').style.display='block';
        document.getElementById('cep').addEventListener("focus");
    }
}

document.getElementById('cpf_digitado')
        .addEventListener('focusout', validacaoCPF);

const limparFormulario = (endereco) => {
    document.getElementById('local').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
}

const preencherFormulario = (endereco) => {
    document.getElementById('local').value = endereco.local;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepAceito = (cep) => cep.length == 8 && eNumero(cep);

const procurarCep = async() => {
    
    limparFormulario();
    const cep = document.getElementById('cep').value;
    
    const url = `http://viacep.com.br/ws/${cep}/json/`

    if (cepAceito(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('local').value = "CEP não detectado."
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById('local').value = "CEP inválido."
    }
}

document.getElementById('cep')
        .addEventListener('focusout', procurarCep);