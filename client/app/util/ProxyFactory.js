class ProxyFactory {
   
  static create(objeto, props, armadilha) {
    //objeto = alvo do proxy
    //props = métodos que serão interceptados pelo proxy
    //armadilha = função que será executada para os métodos presentes no props  
  
    return new Proxy(objeto, {
      
      get(target, prop, receiver) {
        if(ProxyFactory._ehFuncao(target[prop]) && props.includes(prop)) {
          return function() {
            console.log(`"${prop}" disparou a armadilha`);
            target[prop].apply(target, arguments);

            armadilha(target);
          }
        } else {
          return target[prop];
        }
      },

      set(target, prop, value, receiver) {
        const updated = Reflect.set(target, prop, value)

        //só executa a armadilha se fizer parte da lista de props
        if(props.includes(prop)) armadilha(target);

        return updated;
      }
    });
  }

  static _ehFuncao(fn) {
    return typeof(fn) == typeof(Function); 
  }
}