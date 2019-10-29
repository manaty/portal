import React, {Component} from 'react';
import { render } from 'react-dom';
import DatePicker from 'react-bootstrap-date-picker';
import Select from 'react-select';
import TagsInput from 'react-tagsinput';
import ReactTooltip from 'react-tooltip';

import SmallLoader from './SmallLoader.jsx';


class AdvancedFiltersList extends Component {

	remove_filter(event){
		event.preventDefault();
		const {paramDetails, parent} = this.props;
		parent.removeHitFilter(paramDetails);
	}

	render() {
		const {paramDetails} = this.props;
		return (
			<div className="col-sm-12">
				<div className="col-sm-2">
					{paramDetails.operator}
				</div>
				<div className="col-sm-2">
					{paramDetails.fieldName}
				</div>
				<div className="col-sm-6 text-left">
					{paramDetails.fieldType.toLowerCase() == "boolean" ? (paramDetails.value ? "True" : "False") : paramDetails.value}
				</div>
				<div className="col-sm-2">
					<a data-tip="Remove" data-for="remove_filter_tip" className="remove-btn" onClick={this.remove_filter.bind(this)}>
						<i className="wd-cross-circle fs2"/>
					</a>
					<ReactTooltip id="remove_filter_tip" place="top" type="info" effect='solid'/>
				</div>
			</div>
		)
	}
}
export default AdvancedFiltersList;
