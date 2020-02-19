System.register(['../domain/index.js', '../ui/index.js', '../util/index.js'], function (_export, _context) {
  "use strict";

  var Negociacoes, NegociacaoService, Negociacao, NegociacoesView, MensagemView, Mensagem, DataInvalidaException, DateConverter, getNegociacaoDao, Bind;
  return {
    setters: [function (_domainIndexJs) {
      Negociacoes = _domainIndexJs.Negociacoes;
      NegociacaoService = _domainIndexJs.NegociacaoService;
      Negociacao = _domainIndexJs.Negociacao;
    }, function (_uiIndexJs) {
      NegociacoesView = _uiIndexJs.NegociacoesView;
      MensagemView = _uiIndexJs.MensagemView;
      Mensagem = _uiIndexJs.Mensagem;
      DataInvalidaException = _uiIndexJs.DataInvalidaException;
      DateConverter = _uiIndexJs.DateConverter;
    }, function (_utilIndexJs) {
      getNegociacaoDao = _utilIndexJs.getNegociacaoDao;
      Bind = _utilIndexJs.Bind;
    }],
    execute: function () {
      //'../domain/index.js';
      class NegociacaoController {

        constructor() {
          // a ideia é que $ seja o querySelector
          // realizando o bind, $ mantém document como seu contexto this
          const $ = document.querySelector.bind(document);

          // buscando elementos
          this._inputData = $('#data');
          this._inputQuantidade = $('#quantidade');
          this._inputValor = $('#valor');

          //criando o proxy com auxílio do Bind
          this._negociacoes = new Bind(new Negociacoes(), new NegociacoesView('#negociacoes'), 'adiciona', 'esvazia');

          this._mensagem = new Bind(new Mensagem(), new MensagemView('#mensagemView'), 'texto');

          this._service = new NegociacaoService();

          this._init();
        }

        async _init() {
          try {
            const dao = await getNegociacaoDao();
            const negociacoes = await dao.listaTodos();
            negociacoes.forEach(negociacao => this._negociacoes.adiciona(negociacao));
          } catch (err) {

            this._mensagem.texto = err.message;
          }
        }

        async adiciona(event) {

          try {
            // cancelando  a submissão do formulário
            event.preventDefault();
            const negociacao = this._criaNegociacao();

            const dao = await getNegociacaoDao();
            await dao.adiciona(negociacao);
            this._negociacoes.adiciona(negociacao);
            this._mensagem.texto = 'Negociação adicionada com sucesso!';
            this._limpaFormulario();
          } catch (err) {
            this._mensagem.texto = err.message;
          }
        }

        _limpaFormulario() {
          this._inputData.value = '';
          this._inputQuantidade.value = 1;
          this._inputValor.value = 0.0;
          this._inputData.focus();
        }

        _criaNegociacao() {
          //retorna uma instancia de nogociação
          return new Negociacao(DateConverter.paraData(this._inputData.value), parseInt(this._inputQuantidade.value), parseFloat(this._inputValor.value));
        }

        async importaNegociacoes() {

          try {
            const negociacoes = await this._service.obtemNegociacoesDoPeriodo();
            console.log(negociacoes);
            negociacoes.filter(novaNegociacao => !this._negociacoes.paraArray().some(negociacaoExistente => novaNegociacao.equals(negociacaoExistente))).forEach(negociacao => this._negociacoes.adiciona(negociacao));
            this._mensagem.texto = 'Negociações do período importadas com sucesso!';
          } catch (err) {
            this._mensagem.texto = err.message;
          }
        }

        async apaga() {
          try {
            const dao = await getNegociacaoDao();
            await dao.apagaTodos();
            this._negociacoes.esvazia();
            this._mensagem.texto = 'Negociações apagadas com sucesso';
          } catch (err) {
            this._mensagem.texto = err.message;
          }
        }
      }

      _export('NegociacaoController', NegociacaoController);
    }
  };
});
//# sourceMappingURL=NegociacaoController.js.map