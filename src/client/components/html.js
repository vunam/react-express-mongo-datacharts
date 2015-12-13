import React, {Component} from 'react';
import DataActions from '../flux/DataActions';
import DataStore from '../flux/DataStore';

export default class Html extends Component {

	constructor(props) {
 	  super(props);
 	  this.state = DataStore.getState();
 	  this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		//DataActions.updateData();
  		DataStore.listen(this.onChange);
    	DataActions.fetchDomains();
	}

	onChange() {
  		this.setState(DataStore.getState())
    	console.log(this.state);
	}

	render() {
		let {domains, current_domain, records} = this.state;

		if( !domains.length )
			return (
				<div>
					Loading...
				</div>
				)

		return(
			<div>
				Component working
			</div>
		)
	}
	
}