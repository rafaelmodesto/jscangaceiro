System.register([], function (_export, _context) {
  "use strict";

  var campos, tbody;
  return {
    setters: [],
    execute: function () {
      campos = [document.querySelector('#data'), document.querySelector('#quantidade'), document.querySelector('#valor')];


      console.log(campos); //verificando o conteudo do array

      tbody = document.querySelector('table tbody');


      document.querySelector('.form').addEventListener('submit', function (event) {

        // cancelando a submissão do formulário
        event.preventDefault();

        var tr = document.createElement('tr');

        campos.forEach(function (campo) {

          // cria uma td sem informações
          var td = document.createElement('td');

          // atribui valor do campo à td
          td.textContent = campo.value;

          // adiciona a td na tr
          tr.appendChild(td);
        });
        // nova td que armazenará o volume da negociação
        var tdVolume = document.createElement('td');

        // as posições 1 e 2 do array armazenam os campos de quantidade e valor, respectivamente
        tdVolume.textContent = campos[1].value * campos[2].value;
        tr.appendChild(tdVolume);

        // adicionando a td que faltava à tr
        tbody.appendChild(tr);

        //limpa campo data
        campos[0].value = '';

        //limpa campo quantidade
        campos[1].value = 1;

        //limpa campo valor
        campos[2].value = 0;

        //foco campo data
        campos[0].focus();
      });
    }
  };
});
//# sourceMappingURL=index.js.map