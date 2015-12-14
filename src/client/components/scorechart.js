import React, {Component} from 'react';
import _ from "underscore";

var LineChart = require("react-chartjs").Line;

var options = {
    scaleShowGridLines : false,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve : true,
    bezierCurveTension : 0.4,
    pointDot : true,
    pointDotRadius : 4,
    pointDotStrokeWidth : 1,
    pointHitDetectionRadius : 20,
    datasetStroke : true,
    datasetStrokeWidth : 2,
    datasetFill : true
};

export default class ScoreChart extends Component {

	render() {
        var height = 0;
        var scores = this.convertRecords(this.props.chartData);

        if( this.props.chartData.length > 0 )
            height = 300;

		return <LineChart data={scores} options={options} width="740" height={height} />
	}

	convertRecords(records) {
		var scores = [];
		var dates = [];
		_.each(records, function(val, key){
			var date = new Date(val.date);

			dates.push( (date.getMonth()+1) + ' - '+date.getDate() );
			scores.push(Number(val.score));
		});


		return {
			labels: dates,
			datasets: [{
            fillColor: "rgba(228,78,64,0.9)",
            strokeColor: "#b6322d",
            pointColor: "#fff",
            pointStrokeColor: "#b6322d",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: scores
        }]
     }
	}
}
