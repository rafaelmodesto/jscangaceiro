class Negociacoes {
  constructor() {
    this._negociacoes = [];
  }
  
  //como se fosse o set da classe
  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
  }

  //como se fosse o get da classe
  paraArray() {
    return [].concat(this._negociacoes);
  }

}