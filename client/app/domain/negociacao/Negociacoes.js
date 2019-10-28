class Negociacoes {
  constructor(armadilha) {
    this._negociacoes = [];
    this._armadilha = armadilha;

    //congelando instância, nao sendo possível alterá-la
    Object.freeze(this);
  }
  
  //como se fosse o set da classe
  adiciona(negociacao) {
    this._negociacoes.push(negociacao);
    this._armadilha(this);
  }

  //como se fosse o get da classe
  paraArray() {
    return [].concat(this._negociacoes);
  }

  get volumeTotal() {
    return this._negociacoes
      .reduce((total, negociacao) =>
        total + negociacao.volume, 0);
  }

  esvazia() {
    this._negociacoes.length = 0;
    this._armadilha(this);
  }
}