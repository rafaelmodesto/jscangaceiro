class NegociacaoService {

  constructor() {
    this._http = new HttpService();
  }
  
  obterNegociacoesDaSemana() {

    return this._http
      .get('negociacoes/semana')
      .then(
        dados => {
          const negociacoes = dados.map(objeto =>
            new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));

            return negociacoes;
        },
        err => {
          throw new Error('Não foi possível obter as negoociações');
        }
      );
  }

  obtemNegociacoesDaSemanaAnterior() {
    return this._http
      .get('negociacoes/anterior')
      .then(
        dados => {
          const negociacoes = dados.map(objeto =>
            new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
          
          return negociacoes;
        },
        err => {
          throw new Error('Não foi possível obter as negociações da semana anterior');
        }
      );
  }

  
}