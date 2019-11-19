class Bind {
  //os '...' antes do props significa que todos os parametros
  //a partir dele(props) serão considerados como fazendo parte de uma array
  constructor(model, view, ...props) {

    //criando proxy através do ProxyFactory
    const proxy = ProxyFactory.create(model, props, model =>{
      view.update(model)
    });

    view.update(model);

    return proxy;
  }
}