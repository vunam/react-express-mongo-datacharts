/* This is where our data get's initialized and stored. */

import Alt from '../alt';
import DataActions from './DataActions';

class DataStore {

  constructor() {
    this.bindActions(DataActions);
    this.domains = [];
    this.records = [];
    this.current_domain = null;
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
    this.records = data;
  }

  onSetCurrentDomain(data) {
    this.current_domain = data;
  }

}

module.exports = Alt.createStore(DataStore);