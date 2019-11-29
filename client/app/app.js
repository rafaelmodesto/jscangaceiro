// criou a instância do controller
const controller = new NegociacaoController();

const $ = document.querySelector.bind(document);

// associa o evento de submissão do formulário à chamada do mmétodo "adiciona"
$('.form')
  .addEventListener('submit', controller.adiciona.bind(controller));

$('#botao-apaga')
  .addEventListener('click', controller.apaga.bind(controller));

$('#botao-importa')
  .addEventListener('click', controller.importaNegociacoes.bind(controller));