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

//Quando for false é porque está desmarcado

let arcadeCont = false;
let advancedCont = false;
let proCont = false;

let arrayElements = [arcadeCont, advancedCont, proCont];

//Selecionando os elementos necessários
const arcadeElement = document.querySelector('div#arcade');
const advancedElement = document.querySelector('div#advanced');
const proElement = document.querySelector('div#pro')

let arrayDivElements = [arcadeElement, advancedElement, proElement];

function CaixaMarcada(identificadorCaixa) {

    if (identificadorCaixa == 'arcade') {
        arcadeCont = true;
        arcadeElement.classList.add('border-marcado');
        arrumarDivElementsArcade();
    }

    if (identificadorCaixa == 'advanced') {
        advancedCont = true;
        advancedElement.classList.add('border-marcado');
        arrumarDivElementsAdvanced();
    }

    if (identificadorCaixa == 'pro') {
        proCont = true;
        proElement.classList.add('border-marcado');
        arrumarDivElementsPro();
    }

}

function arrumarDivElementsArcade () {

    advancedCont = false;
    proCont = false;

    advancedElement.classList.remove('border-marcado');
    proElement.classList.remove('border-marcado');

}

function arrumarDivElementsAdvanced () {

    arcadeCont = false;
    proCont = false;

    arcadeElement.classList.remove('border-marcado');
    proElement.classList.remove('border-marcado');

}

function arrumarDivElementsPro () {

    arcadeCont = false;
    advancedCont = false;

    arcadeElement.classList.remove('border-marcado');
    advancedElement.classList.remove('border-marcado');

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
            'Arcade': arcadeCont ? 'marcado' : 'desmarcado', //se for ímpar vai retornar false, se for pár vai retornar true (R$9)
            'Advanced': advancedCont ? 'marcado' : 'desmarcado', //se for ímpar vai retornar false, se for pár vai retornar true (R$12)
            'Pro': proCont ? 'marcado' : 'desmarcado', //se for ímpar vai retornar false, se for pár vai retornar true (R$15)
            'estadoBotao': estadoBotao % 2 == 0 ? 'Yearly' : 'Monthly' //se for ímpar vai retornar false (monthly), se for pár vai retornar true (yearly)
        }
    }
}


// step-3.html

//marcar checkbox com JS: https://horadecodar.com.br/2020/09/21/marcar-um-checkbox-com-javascript-ou-jquery/

// Quando for ímpar é porque está desmarcado
let onlineServiceCont = 1;
let largerStorageCont = 1;
let customizableProfileCont = 1;

// Selecionando os elementos necessários
let onlineServiceElement = document.querySelector('div#service');
let largerStorageElement = document.querySelector('div#storage');
let customizableProfileElement = document.querySelector('div#customizable');

// Selecionando os checkbox (span)
let checkboxOnlineServiceElement = document.querySelector('input#checkbox-online-service');
let checkboxLargerStorageElement = document.querySelector('input#checkbox-larger-storage');
let checkboxCustomizableProfileElement = document.querySelector('input#checkbox-customizable-profile');

function MarcarCheckbox(identificadorDivCheckbox) {

    //estamos trabalhando na caixa online-service
    if (identificadorDivCheckbox == 'online-service') {
        onlineServiceCont += 1;
        if (onlineServiceCont % 2 == 0) {
            //adicionando estilo de marcação na div visualmente
            onlineServiceElement.classList.add('escolhido');
            checkboxOnlineServiceElement.classList.add('borda-marcada');
            checkboxOnlineServiceElement.checked = true;
        } else {
            //removendo estilo de marcação na div visualmente
            onlineServiceElement.classList.remove('escolhido');
            checkboxOnlineServiceElement.classList.remove('borda-marcada');
            checkboxOnlineServiceElement.checked = false;
        }
    }

    //estamos trabalhando na caixa larger-storage
    if (identificadorDivCheckbox == 'larger-storage') {
        largerStorageCont += 1;
        if (largerStorageCont % 2 == 0) {
            //adicionando estilo de marcação na div visualmente
            largerStorageElement.classList.add('escolhido');
            checkboxLargerStorageElement.classList.add('borda-marcada');
            checkboxLargerStorageElement.checked = true;
        } else {
            //removendo estilo de marcação na div visualmente
            largerStorageElement.classList.remove('escolhido');
            checkboxLargerStorageElement.classList.remove('borda-marcada');
            checkboxLargerStorageElement.checked = false;
        }
    }

    //estamos trabalhando na caixa customizable-profile
    if (identificadorDivCheckbox == 'customizable-profile') {
        customizableProfileCont += 1;
        if (customizableProfileCont % 2 == 0) {
            //adicionando estilo de marcação na div visualmente
            customizableProfileElement.classList.add('escolhido');
            checkboxCustomizableProfileElement.classList.add('borda-marcada');
            checkboxCustomizableProfileElement.checked = true;
        } else {
            //removendo estilo de marcação na div visualmente
            customizableProfileElement.classList.remove('escolhido');
            checkboxCustomizableProfileElement.classList.remove('borda-marcada');
            checkboxCustomizableProfileElement.checked = false;
        }
    }
}

function PegarObjetoLiteral_EnviarObjetoLiteral () {

    const ObjetoLiteralFormulario = JSON.parse(localStorage.getItem('objetoValores')).formulario;
    const ObjetoLiteralMarcadores = JSON.parse(localStorage.getItem('objetoValores')).marcadores;

    localStorage.setItem('objetoValores', JSON.stringify(AlocandoConteudos(ObjetoLiteralFormulario, ObjetoLiteralMarcadores)));

}

function AlocandoConteudos (formulario, marcadores) {

    return {
        'formulario': formulario,
        'marcadores': marcadores,
        'caixa_escolhas': {
            'onlineServiceCont': onlineServiceCont % 2 == 0 ? 'marcado' : 'desmarcado',
            'largerStorageCont': largerStorageCont % 2 == 0 ? 'marcado' : 'desmarcado',
            'customizableProfileCont': customizableProfileCont % 2 == 0 ? 'marcado' : 'desmarcado'
        }
    }

}

// step-4.html



//Capturando os objetos literais
const formularioObjeto = JSON.parse(localStorage.getItem('objetoValores')).formulario;
const marcadoresObjeto = JSON.parse(localStorage.getItem('objetoValores')).marcadores;
const caixaEscolhas = JSON.parse(localStorage.getItem('objetoValores')).caixa_escolhas;

function ExibirResultados () {

    // Selecionando os elementos necessários
    let divFinal = document.querySelector('div#div-inf');
    let informacoesDiv = document.querySelector('div.informacoes');

    let DivFilha_divFinal = document.createElement('div');
    let H3text = document.createElement('h3');
    let ancora = document.createElement('a');
    let span = document.createElement('span');

    divFinal.appendChild(DivFilha_divFinal);
    DivFilha_divFinal.appendChild(H3text);
    DivFilha_divFinal.appendChild(ancora);
    divFinal.appendChild(span);

    H3text.innerText = `${percorrerFormularioObjeto()} (${exibirEstadoBotao()})`;
    ancora.classList.add('estilo-ancora');
    ancora.innerText = 'Change';
    span.innerText = `${retornarValor()}`;

    //<hr>
    let hr = document.createElement('hr');
    informacoesDiv.appendChild(hr);

    //criando as div e suas informações

    if (caixaEscolhas.onlineServiceCont == 'marcado') {
        let divOnlineService = document.createElement('div');
        let paragrafoOnlineService = document.createElement('p');
        let spanDivOnlineService = document.createElement('span');

        informacoesDiv.appendChild(divOnlineService);
        divOnlineService.appendChild(paragrafoOnlineService);
        divOnlineService.appendChild(spanDivOnlineService);

        divOnlineService.classList.add('online-service-results');
        paragrafoOnlineService.innerText = 'Online service';
        spanDivOnlineService.innerText = '+$1/mo';
    }

    if (caixaEscolhas.largerStorageCont == 'marcado') {
        let divLargerStorage = document.createElement('div');
        let paragrafoLargerStorage = document.createElement('p');
        let spanDivLargerStorage = document.createElement('span');
        
        informacoesDiv.appendChild(divLargerStorage);
        divLargerStorage.appendChild(paragrafoLargerStorage);
        divLargerStorage.appendChild(spanDivLargerStorage);

        divLargerStorage.classList.add('larger-storage-results');
        paragrafoLargerStorage.innerText = 'Larger storage';
        spanDivLargerStorage.innerText = '+$2/mo';
    }

    if (caixaEscolhas.customizableProfileCont == 'marcado') {
        let divCustomizableProfile = document.createElement('div');
        let paragrafoCustomizableProfile = document.createElement('p');
        let spanDivCustomizableProfile = document.createElement('span');

        informacoesDiv.appendChild(divCustomizableProfile);
        divCustomizableProfile.appendChild(paragrafoCustomizableProfile);
        divCustomizableProfile.appendChild(spanDivCustomizableProfile);

        divCustomizableProfile.classList.add('customizable-profile-results');
        paragrafoCustomizableProfile.innerText = 'Customizable profile';
        spanDivCustomizableProfile.innerText = '+$2/mo';
    }

    //trabalhando no TOTAL
    let valorMarcador = recuperandoValorMarcador();
    let valorOnlineService = recuperandoValorOnlineService();
    let valorLargerStorage = recuperandoValorLargerStorage();
    let valorCustomizableProfile = recuperandoValorCustomizableProfile();

    let somandoTodos = valorMarcador + valorOnlineService + valorLargerStorage + valorCustomizableProfile;

    let spanTotal = document.querySelector('span#total-span');

    spanTotal.innerText = `+$${somandoTodos}/mo`;

}

ExibirResultados();

function recuperandoValorMarcador () {

    if (marcadoresObjeto.Advanced == 'marcado') {
        return 12;
    } else if (marcadoresObjeto.Arcade == 'marcado') {
        return 9;
    } else if (marcadoresObjeto.Pro == 'marcado') {
        return 15;
    } else {
        return 0;
    }

}

function recuperandoValorOnlineService () {

    if (caixaEscolhas.onlineServiceCont == 'marcado') {
        return 1;
    } else {
        return 0;
    }

}

function recuperandoValorLargerStorage () {

    if (caixaEscolhas.largerStorageCont == 'marcado') {
        return 2;
    } else {
        return 0;
    }

}

function recuperandoValorCustomizableProfile () {

    if (caixaEscolhas.customizableProfileCont == 'marcado') {
        return 2;
    } else {
        return 0;
    }

}


function retornarValor () {

    if (marcadoresObjeto.Advanced == 'marcado') {
        return '$12/mo';
    } else if (marcadoresObjeto.Arcade == 'marcado') {
        return '$9/mo';
    } else if (marcadoresObjeto.Pro) {
        return '$15/mo';
    } else {
        return '$0/mo'
    }

}

function percorrerFormularioObjeto () {

    if (marcadoresObjeto.Advanced == 'marcado') {
        return 'Advanced';
    } else if (marcadoresObjeto.Arcade == 'marcado') {
        return 'Arcade';
    } else if (marcadoresObjeto.Pro == 'marcado') {
        return 'Pro';
    } else {
        return 'Valor não escolhido';
    }

}

function exibirEstadoBotao () {

    return marcadoresObjeto.estadoBotao;

}

//step-final.html



