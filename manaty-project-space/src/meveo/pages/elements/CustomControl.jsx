import React from 'react';

class CustomControl extends React.Component {
	render() {
		const {value, placeholder, ...rest} = this.props;

		return (<span>{value || placeholder}</span>);
	}
}

export default CustomControl;
