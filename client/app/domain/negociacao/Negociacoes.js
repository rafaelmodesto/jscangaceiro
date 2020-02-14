System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      class Negociacoes {
        constructor(armadilha) {
          this._negociacoes = [];

          //congelando instância, nao sendo possível alterá-la
          Object.freeze(this);
        }

        //como se fosse o set da classe
        adiciona(negociacao) {
          this._negociacoes.push(negociacao);
        }

        //como se fosse o get da classe
        paraArray() {
          return [].concat(this._negociacoes);
        }

        get volumeTotal() {
          return this._negociacoes.reduce((total, negociacao) => total + negociacao.volume, 0);
        }

        esvazia() {
          this._negociacoes.length = 0;
        }
      }

      _export("Negociacoes", Negociacoes);
    }
  };
});
//# sourceMappingURL=Negociacoes.js.map