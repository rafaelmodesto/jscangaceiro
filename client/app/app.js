// criou a instância do controller
const controller = new NegociacaoController();

// associa o evento de submissão do formulário à chamada do mmétodo "adiciona"
document
  .querySelector('.form')
  .addEventListener('submit', controller.adiciona.bind(controller));