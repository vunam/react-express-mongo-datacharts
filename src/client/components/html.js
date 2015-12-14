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
      var scoreChart = null;

		let {domains, current_domain, records} = this.state;

		if( domains.length && records.length )
			scoreChart = <ScoreChart chartData={records} />;

		return (
			<div>
				<div className="ldn">
					Waiting for API...
				</div>
				<div className="cnt">
					<div className="inn-hed">
						<h1>Ayima test tool</h1>
					</div>
					<div className="inn-bod">

						<label>Please select a domain</label>
						
						<br/>

						<select ref={(c) => this._select = c} onChange={this.handleChangeDomains.bind(this)}>
							{domains.map(function(val, i) {
		                	return <option value={val._id} key={i}>{val.name}</option>;
		              	})}
						</select>

						<br/>

						{scoreChart}

					</div>
					<div className="inn-fot">
						Copyright 2015
					</div>
				</div>
			</div>
		)
	}

	onChange() {
  		this.setState(DataStore.getState());
	}

	handleChangeDomains() {
	   var val = this._select.value;
	   if (val)
	      DataActions.setCurrentDomain(val);
	}

	
}