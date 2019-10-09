import React from 'react';

class DataLoader extends React.Component {
	render() {
		return (
			<div className="col-md-12 data-loader">
				<div className="row">
					<div className="col-md-12">
						<h3 className="text-danger text-center">Loading data, please wait...</h3>
					</div>
				</div>
			</div>
		);
	}
}

export default DataLoader;
