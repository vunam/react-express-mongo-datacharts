/* Our table component */

import React, {Component} from 'react';

export default class ScoreTable extends Component {

	render() {
        var height = 0;
        var {chartData} = this.props;

        if(chartData.length > 0)
    		return (
                <div className="inn-table">
                    <table>
                        <tbody>
                            {chartData.map(function(val, i) {
                                var date = new Date(val.date);

                                return  <tr key={i}>
                                            <td className="label">Date</td>
                                            <td>{(date.getMonth()+1) + ' - ' + date.getDate() + ' - ' + date.getFullYear()}</td>
                                            <td className="label">Score</td>
                                            <td>{val.score}</td>
                                        </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            )

        return ( <div></div> )
	}

}
