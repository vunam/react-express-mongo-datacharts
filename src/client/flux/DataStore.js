import Alt from '../alt';
import DataActions from './DataActions';

class DataStore {

  constructor() {

    this.bindActions(DataActions);
    this.current_domain = null;
    this.domains = [];
    this.records = [];
  }

  onFetchDomains() {
    this.domains = [];
  }

  onFetchDomainsSuccess(data) {
    this.domains = data;
  }

  onFetchRecords(current_domain) {
    this.records = [];
  }

  onFetchRecordsSuccess(data) {
    this.domains = data;
  }

}

module.exports = Alt.createStore(DataStore);