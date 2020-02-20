System.register([], function (_export, _context) {
  "use strict";

  /*
    Debounce Pattern
      É um padrão de projeto utilizado quando existe a chance de
    ser enviado várias vezes a mesma requisição, caso a mesma ação
    seja executada dentro de um período de tempo apenas a última
    será executada.
  */

  function debounce(fn, milissegundos) {

    let timer = 0;

    return () => {

      // para o último timer definido
      clearTimeout(timer);

      //usa um temporizador para chamar fn()
      //depois de tantos milissegundos
      setTimeout(() => fn(), milissegundos);
    };
  }

  _export("debounce", debounce);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=Debounce.js.map