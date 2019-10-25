class NegociacaoController{

  constructor(){
    // a ideia é que $ seja o querySelector
    // realizando o bind, $ mantém document como seu contexto this
    let $ = document.querySelector.bind(document);  

    // buscando elementos
    this._inputData       = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor      = $('#valor');
    this._negociacoes     = new Negociacoes();
    this._negociacoesView = new NegociacoesView('#negociacoes');
    
    //atualizando a view
    this._negociacoesView.update(this._negociacoes);

    //instanciando o modelo
    this._mensagem = new Mensagem();

    this._mensagemView = new MensagemView('#mensagemView');
    this._mensagemView.update(this._mensagem);

  }

  adiciona(event){
    // cancelando  a submissão do formulário
    event.preventDefault();
    
    this._negociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação adicionada com sucesso!';
    this._negociacoesView.update(this._negociacoes);

    //atualiza a view com o texto da mensagem que acabamos de atribuir
    this._mensagemView.update(this._mensagem);
    
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
  
  
}