// index.html

/*
[X] - Uma função que é ativada quando clica no botão
[X] - Dentro dessa função vamos recuperar todos os input e jogar os valores em variáveis do tipo "const"
[X] - Vamos fazer a primeira verificação, verificar se algum input está vazio, se algum estiver vazio vamos emitir uma mensagem de erro naquele respectivo lugar
-- [X] - Dentro vamos procurar um por um pra saber aonde adicionar a mensagem para ser preenchido
[X] - Vamos fazer a segunda verificação que se todos estiverem preenchidos nós vamos pegar esses valores e jogar no JSON, em seguida vamos redireciona-lo para a próxima página
*/

function verificarDadosFormulario () {
    //Selecionando elementos (input)
    const name = document.querySelector('input#name');
    const email = document.querySelector('input#email');
    const phone = document.querySelector('input#phone');
    //console.log(name, email, phone);

    //Selecionando os span de cada label
    const spanName = document.querySelector('span#input-name-span');
    const spanEmail = document.querySelector('span#input-email-span');
    const spanPhone = document.querySelector('span#input-phone-span');

    if (name.value == '' || email.value == '' || phone.value == '') {

        let elementos = [name, email, phone];
        let elementoSpan = [spanName, spanEmail, spanPhone];
        let cont = 0;

        elementos.forEach(element => {
            if (element.value == '') {
                elementoSpan[cont].style.display = 'block';
                element.classList.add('input-erro-red');
            }
            cont += 1;
        });
    
    } else {
        //jogando as variáveis no JSON em formato de objeto literal pra ir pro localStorage
        let formularioValoresInput = inserirValoresObjetoLiteral(name.value, email.value, phone.value);
        localStorage.setItem('objetoValores', JSON.stringify(formularioValoresInput));


        window.location.href = 'step-2.html';
    }

}

function inserirValoresObjetoLiteral(name, value, phone) {
    return {
        'formulario': {
            'name': name,
            'value': value,
            'phone': phone
        }
    };
}

// step-2.html

//Quando for impar é porque está desmarcado

let arcadeCont = 1;
let advancedCont = 1;
let proCont = 1;

/*
No final pra saber as caixas que estão marcadas e desmarcadas
nós vamos fazer a formula pra saber se é par ou impar, se for par é porque tá marcada e colocamos true,
se for impar é porque está desmarcada e colocamos false.
Ai a partir dos índices do objeto e se esse índice e true ou false nós podemos pegar um valor
pré determinado no final.
*/

//Selecionando os elementos necessários
const arcadeElement = document.querySelector('div#arcade');
const advancedElement = document.querySelector('div#advanced');
const proElement = document.querySelector('div#pro')

function CaixaMarcada(identificadorCaixa) {

    //estamos trabalhando na caixa arcade
    if (identificadorCaixa == 'arcade') {
        arcadeCont += 1;
        if (arcadeCont % 2 == 0) {
            //estilo de marcação na div visualmente
            arcadeElement.classList.add('border-marcado');
        } else {
            //estilo de desmarcação na div visualmente
            arcadeElement.classList.remove('border-marcado');
        }
    } else if (identificadorCaixa == 'advanced') {
        //estamos trabalhando na caixa advanced
        advancedCont += 1;
        if (advancedCont % 2 == 0) {
            //estilo de marcação na div visualmente
            advancedElement.classList.add('border-marcado');
        } else {
            //estilo de desmarcação na div visualmente
            advancedElement.classList.remove('border-marcado');
        }
    } else if (identificadorCaixa == 'pro') {
        //estamos trabalhando na caixa pro
        proCont += 1;
        if (proCont % 2 == 0) {
            //estilo de marcação na div visualmente
            proElement.classList.add('border-marcado');
        } else {
            //estilo de desmarcação na div visualmente
            proElement.classList.remove('border-marcado');
        }
    }

}

// JS botão (monthly e yearly)

// Valor impar significa que ele tá no monthly, par ele está no yearly
let estadoBotao = 1;

//selecionando area de click Botão
const botaoMonthlyYearly = document.querySelector('div#areaClick');
const caixaBola = document.querySelector('div#bola');
const moverBolaSpan = document.querySelector('span#mover-bola');

function moverBotao() {

    //console.log(botaoMonthlyYearly);

    estadoBotao += 1;
    if (estadoBotao % 2 == 0) {
        //mover para Yearly
        moverBolaSpan.classList.remove('mover-monthly');
        moverBolaSpan.classList.add('mover-yearly');
        document.querySelector('span#monthly-text').style.color = 'hsl(231, 11%, 63%)';
        document.querySelector('span#yearly-text').style.color = 'hsl(213, 96%, 18%)';

    } else {
        //mover para Monthly
        moverBolaSpan.classList.remove('mover-yearly');
        moverBolaSpan.classList.add('mover-monthly');
        document.querySelector('span#yearly-text').style.color = 'hsl(231, 11%, 63%)';
        document.querySelector('span#monthly-text').style.color = 'hsl(213, 96%, 18%)';

    }

}

/*
[X] - Pegar o JSON da página anterior
[X] - Extrair o índice 'formulario' e colocar em uma variável
[X] - Criar uma função que vai ser chamada pelo botão NEXT STEP
[X] - A função vai retornar um objeto com os índices e valores alocados em seus respectivos locais
[X] - As variáveis que tem os valores (impar e par) vão ser substituídos por false quando for ímpar e true quando for pár
[X] - Use os operadores ternarios para resolver o problema de ímpar e pár
[X] - Pegue o mesmo índice do JSON da página anterior e substitua o Objeto literal por esse novo
[X] - Faça o usuário ser direcionado a próxima página em questão
*/

function EnviarObjetoLiteral () {
    //Peguei o índice formulário
    const objetoFormularioInf = JSON.parse(localStorage.getItem('objetoValores')).formulario;
    localStorage.setItem('objetoValores', JSON.stringify(AlocandoConteudoObjetoLiteral(objetoFormularioInf)));
    
    window.location.href = 'step-3.html';
}

function AlocandoConteudoObjetoLiteral(formulario) {
    return {
        'formulario': formulario,
        'marcadores': {
            'arcadeCont': arcadeCont % 2 == 0 ? 'marcado' : 'desmarcado', //se for ímpar vai retornar false, se for pár vai retornar true (R$9)
            'advancedCont': advancedCont % 2 == 0 ? 'marcado' : 'desmarcado', //se for ímpar vai retornar false, se for pár vai retornar true (R$12)
            'proCont': proCont % 2 == 0 ? 'marcado' : 'desmarcado', //se for ímpar vai retornar false, se for pár vai retornar true (R$15)
            'estadoBotao': estadoBotao % 2 == 0 ? 'yearly' : 'monthly' //se for ímpar vai retornar false (monthly), se for pár vai retornar true (yearly)
        }
    }
}


// step-3.html

//marcar checkbox com JS: https://horadecodar.com.br/2020/09/21/marcar-um-checkbox-com-javascript-ou-jquery/



// step-4.html




//step-final.html



