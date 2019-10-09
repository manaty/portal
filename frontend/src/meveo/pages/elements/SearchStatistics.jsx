import React, {Component} from 'react';
import { render } from 'react-dom';

import ReactTooltip from 'react-tooltip'


class SearchStatistics extends Component {

	serviceStatus(status) {
	 switch (status) {
		 case 'reception':
			 return (<div><i className='icon wd-truck fs2'></i> <span>RECEPTION</span></div>);
			 break;
		 case 'progress':
			 return (<div><i className='icon wd-trailer fs2'></i> <span>IN PROGRESS</span></div>);
			 break;
		 case 'error':
			 return (<div><i className='icon wd-construction-cone fs2'></i> <span>ERROR</span></div>);
			 break;

		 default:

	 	}
 	}

	progressBarDetails(){
		const statistics = this.props.searchStats;
		var progressBarData = "";

		if (statistics != null) {
console.log("*****************");
console.log("SEARCH STATS");
console.log(statistics);
console.log("*****************");
			progressBarData = statistics.data.map((service, i) => {
				var serviceStatus = "";
				var classStatus = "";
				var tooltipType = ""
				var classPosition = "";

				var listSize = statistics.data.length - 1;
				if (i == 0) {
					if (statistics.data.length == 1) {
						classPosition = "one-child";
					} else {
						classPosition = "first-child";
					}
				}else if (i == listSize) {
					if (statistics.data.length == 1) {
						classPosition = "one-child";
					} else {
						classPosition = "last-child";
					}
				}

				if (service.status == "ERROR") {
					serviceStatus = "error";
					classStatus = "serviceBar in-error";
					tooltipType = "error";
					var height = (100/statistics.AllTotalRetrieved)*service.total_results;
				} else {
					if (service.total_results == service.retrieved_details) {
						serviceStatus = "reception";
						classStatus = "serviceBar in-reception";
						tooltipType = "success"
					}else if (service.retrieved_details < service.total_results) {
						serviceStatus = "progress";
						classStatus = "serviceBar in-progress";
						tooltipType = "info"
					}
					var height = (100/statistics.AllTotalRetrieved)*service.retrieved_details;
				}

				var percentage = (100/statistics.AllTotalResult)*service.total_results;

					return(
						<div>
							<div data-tip data-for={service.code} className={classStatus+" "+classPosition} style={{height: Math.round(height * 100) / 100+"%"}}></div>
							<ReactTooltip id={service.code} place="right" type={tooltipType} effect='solid'>
								{this.serviceStatus(serviceStatus)}
							  <div>{service.name}</div>
								<div>{service.retrieved_details +" / "+ service.total_results + " Results"}</div>
							</ReactTooltip>
						</div>
					);

			});
		}
		return progressBarData;
	}

	renderProgressBar(){
		const statistics = this.props.searchStats;
		var height = 0;
		if (statistics!=null) {
			height = (100/statistics.AllTotalResult)*statistics.AllTotalRetrieved;
		}

		return(
			<div className="totalRetrievedBar" style={{height:height+"%"}}>
				{this.progressBarDetails()}
			</div>
		);
	}

	render() {
		const statistics = this.props.searchStats;
		var totalPercentage = 0;
		if (statistics!=null) {
			var totalPercentage = (100/statistics.AllTotalResult)*statistics.AllTotalRetrieved || 0;
		}

		return (
			<div className="row-progress-bar">
				<div className="search-percentage-info text-center">
					{Math.round(totalPercentage * 100) / 100+"%"}
				</div>
				<div className="search-progress-bar">
				  {this.renderProgressBar()}
				</div>
			</div>
		);
	}
}

export default SearchStatistics;
