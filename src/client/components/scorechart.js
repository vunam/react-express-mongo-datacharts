import React, {Component} from 'react';
import _ from "underscore";

var LineChart = require("react-chartjs").Line;

var options = {
    scaleShowGridLines : true,
    scaleGridLineColor : "rgba(0,0,0,.05)",
    scaleGridLineWidth : 1,
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
		var scores = this.convertRecords(this.props.chartData);

		return <LineChart data={scores} options={options} width="600" height="300" />
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
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: scores
        }]
     }
	}
}
