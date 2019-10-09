import React from 'react';

class PageLoader extends React.Component {
	render() {
		const { page } = this.props;
		return (
			<div className="search-loader">
				<div className="row">
					<div className="col-md-12">
						<img src="./images/page_loading.gif" className="thumbnail img-thumbnail" />
					</div>
					<div className="col-md-12">
						<h1>Loading...</h1>
					</div>
				</div>
			</div>
		);
	}
}

export default PageLoader;
