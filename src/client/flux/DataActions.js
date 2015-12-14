/* The Flux method has actions that are sent to the dispatcher to edit our stores */

import Alt from '../alt';
import request from 'superagent';

class DataActions {

  /* Async fetching the domains. On completion will call the Success action */
  fetchDomains() { 
    request
    .get('http://localhost:3000/get_domains')
    .end((err, res) => {
      this.fetchDomainsSuccess(res.body.message);
    });
  }

  fetchDomainsSuccess(data) {
    return data;
  }

  /* Async fetching the records. On completion will call the Success action */
  fetchRecords(domain_id) { 
    request
    .get('http://localhost:3000/get_records/' + domain_id)
    .end((err, res) => {
      this.fetchRecordsSuccess(res.body.message);
    });
  }

  fetchRecordsSuccess(data) {
    return data;
  }

  /* Action called when changing the selected domain */
  setCurrentDomain(data) {
    this.fetchRecords(data);
    return data;
  }

}

module.exports = Alt.createActions(DataActions);