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
    
    //apagar
    /*this._negociacoesView = new NegociacoesView('#negociacoes');
    
    //atualizando a view
    this._negociacoesView.update(this._negociacoes);

    this._mensagem = ProxyFactory.create(
      new MensagemView(),
      ['texto'],
      model => this._mensagemView.update(model)
    );
    
    this._mensagemView = new MensagemView('#mensagemView');
    this._mensagemView.update(this._mensagem);*/

  }

  adiciona(event){
    // cancelando  a submissão do formulário
    event.preventDefault();
    
    this._negociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação adicionada com sucesso!';
    
    this._limpaFormulario();

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
  
}