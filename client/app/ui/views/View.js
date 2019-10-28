class View {

  constructor(seletor) {
    this._elemento = document.querySelector(seletor);
  }

  update(model) {
    this._elemento.innerHTML = this.template(modal);
  }

  template(model) {
    throw new Error('Você precisa implementar o método template');
  }
}