const adapters = require('../adapters');
const useCases = require('../useCases');

function wire(adaptersList, useCasesList) {
  return Object.keys(useCasesList).reduce((prev, ucName) => ({
    ...prev,
    ucName: useCasesList[ucName](adaptersList),
  }));
}

module.exports = wire(adapters, useCases);
