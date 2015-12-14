import React, {Component} from 'react';
import DataActions from '../flux/DataActions';
import DataStore from '../flux/DataStore';
import _ from "underscore";
import ScoreChart from "./scorechart";

export default class Html extends Component {

	constructor(props) {
 	  super(props);
 	  this.state = DataStore.getState();
 	  this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
  		DataStore.listen(this.onChange);
    	DataActions.fetchDomains();
	}

	render() {
      require("../style/style.less");
		let {domains, current_domain, records} = this.state;


		if( !domains.length || ( !records.length && current_domain !== null ) )
			return (
				<div>
					Loading...
				</div>
				)

		return(
			<div>
				<select ref={(c) => this._select = c} onChange={this.handleChangeDomains.bind(this)}>
					{domains.map(function(val, i) {
                	   return <option value={val._id} key={i}>{val.name}</option>;
              	    })}
				</select>
				<ScoreChart chartData={records} />
			</div>
		)
	}

	onChange() {
  		this.setState(DataStore.getState());
	}

	handleChangeDomains() {
        var val = this._select.value;
        if(val){
        	DataActions.setCurrentDomain(val);
        	//DataActions.fetchRecords(val);
        }
	}
	
}