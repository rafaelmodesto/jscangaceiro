class Negociacao {
  constructor(_data, _quantidade, _valor){
    
    Object.assign(this, {_quantidade, _valor});    
    this._data = new Date(_data.getTime()),
    //congelando a instância para que nao seja alterada.
    Object.freeze(this);
  }

  get volume() {
    return this._quantidade * this._valor;
  }
  
  get data() {
    return new Date(this._data.getTime());
  }
  
  get quantidade() {
    return this._quantidade;
  }

  get valor() {
    return this._valor;
  }
}