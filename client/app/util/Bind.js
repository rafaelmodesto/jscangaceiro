System.register(['./ProxyFactory.js'], function (_export, _context) {
  "use strict";

  var ProxyFactory;
  return {
    setters: [function (_ProxyFactoryJs) {
      ProxyFactory = _ProxyFactoryJs.ProxyFactory;
    }],
    execute: function () {
      let Bind = class Bind {
        //os '...' antes do props significa que todos os parametros
        //a partir dele(props) serão considerados como fazendo parte de uma array
        constructor(model, view, ...props) {

          //criando proxy através do ProxyFactory
          const proxy = ProxyFactory.create(model, props, model => {
            view.update(model);
          });

          view.update(model);

          return proxy;
        }
      };

      _export('Bind', Bind);
    }
  };
});
//# sourceMappingURL=Bind.js.map