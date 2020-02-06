const ConnectionFactory = (() => {

  const stores = ['negociacoes'];
  //Começa sem conexão
  let connection = null;

  return class ConnectionFactory{

    constructor() {
      throw new Error('Não é possível criar instâncias dessa classe');
    }

    static getConnection() {
      return new Promise((resolve, reject) => {

        if(connection) return resolve(connection);

        const openRequest = indexedDB.open('jscangaceiro', 2);

        openRequest.onupgradeneeded = e => {
          /*stores.forEach(store => {*/
            ConnectionFactory._createStores(e.target.result);
          /*});*/  
        };

        openRequest.onsuccess = e => {
          resolve(e.target.result);
        };

        openRequest.onerror = e => {
          console.log(e.target.error)
          reject(e.target.error.name)
        };

      });
    }

    static _createStores(connection) {
      stores.forEach(store => {
        if(connection.objectStoreNames.contains(store))
            connection.deleteObjectStore(store);

        connection.createObjectStores(store, { autoIncrement: true});
      });
    }
  }
})();