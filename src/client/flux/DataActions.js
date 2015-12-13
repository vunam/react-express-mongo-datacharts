import Alt from '../alt';
import request from 'superagent';

class DataActions {

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

}

module.exports = Alt.createActions(DataActions);