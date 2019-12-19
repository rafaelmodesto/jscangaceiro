class NegociacaoController{

  constructor(){
    // a ideia é que $ seja o querySelector
    // realizando o bind, $ mantém document como seu contexto this
    const $ = document.querySelector.bind(document);  

    // buscando elementos
    this._inputData       = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor      = $('#valor');

    //criando o proxy com auxílio do Bind
    this._negociacoes = new Bind(
      new Negociacoes(),
      new NegociacoesView('#negociacoes'),
      'adiciona', 'esvazia'
    );
    
    this._mensagem = new Bind(
      new Mensagem(),
      new MensagemView('#mensagemView'),
      'texto'
    );
    
    this._service = new NegociacaoService();

  }

  adiciona(event){

    try{
    // cancelando  a submissão do formulário
    event.preventDefault();
    
    this._negociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação adicionada com sucesso!';
    this._limpaFormulario();

    } catch(err) {
        console.log(err);
        console.log(err.stack);

        if(err instanceof DataInvalidaException) {
          this._mensagem.texto = err.message;
        } else {
          //mensagem generica para qualquer problema diferente que aconteça
          this._mensagem.texto = 'Um erro não esperado aconteceu. Entre em contato com o suporte.';
        }        
    }
  }
  
  _limpaFormulario() {
    this._inputData.value       = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value      = 0.0
    this._inputData.focus();
  }

  _criaNegociacao() {
    //retorna uma instancia de nogociação
    return new Negociacao(
      DateConverter.paraData(this._inputData.value)  ,
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  apaga() {
    this._negociacoes.esvazia();
    this._mensagem.texto = 'Negociações apagadas com sucesso';
  }
  
  importaNegociacoes() {
    this._service
      .obterNegociacoesDaSemana()
      .then( semana => {
        //usando spread operator(...)
        negociacoes.push(...semana);

        return this._service.obtemNegociacoesDaSemanaAnterior();
      })
      .then(anterior => {
        negociacoes.push(...anterior);
        negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações importadas com sucesso!';
      })
      .catch(err => this._mensagem.texto = err);
  }
}