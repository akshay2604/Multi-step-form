// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { verticalScale } from '../utils/scaling';
import PropTypes from 'prop-types';
import Colors from '../themes/color';

function getActiveIndexCount(status) {
	switch (status) {
		case 'Page1':
			return 0;
		case 'Page2':
			return 1;
		case 'Page3':
			return 2;
		case 'Page4':
			return 3;
		default:
			return 0;
	}
}
class ProgressStatus extends Component {
	_renderLeftLine(index, activeIndexCount) {
		if (index !== 0) {
			if (index <= activeIndexCount) {
				return <View style={styles.activeLine} />;
			}
			return <View style={styles.inactiveLine} />;
		}
		return <View style={styles.invisibleLine} />;
	}
	_renderMiddleCircle(index, activeIndexCount) {
		if (index <= activeIndexCount) {
			return <View style={styles.activeCircle} />;
		}
		return <View style={styles.inactiveCircle} />;
	}
	_renderRightLine(index, activeIndexCount, values) {
		if (values.length - 1 !== index) {
			if (index < activeIndexCount) {
				return <View style={styles.activeLine} />;
			}
			return <View style={styles.inactiveLine} />;
		}
		return <View style={styles.invisibleLine} />;
	}
	_renderText(status, index, activeIndexCount) {
		const styleObj = index <= activeIndexCount ? styles.activeText : styles.inactiveText;
		return (
			<View>
				{status === 'Page1' ? <Text style={styleObj}>Name</Text> : null}
				{status === 'Page2' ? <Text style={styleObj}>Details</Text> : null}
				{status === 'Page3' ? <Text style={styleObj}>Health</Text> : null}
				{status === 'Page4' ? <Text style={styleObj}>Risk</Text> : null}
			</View>
		);
	}
	render() {
		const { values, status } = this.props;
		const activeIndexCount = getActiveIndexCount(status);
		return (
			<View style={styles.progressBarContainer}>
				{values.map((value, index) => (
					<View style={styles.progressBarItemContainer} key={status.concat(index)}>
						<View style={styles.eachItemContainer}>
							{this._renderLeftLine(index, activeIndexCount)}
							{this._renderMiddleCircle(index, activeIndexCount)}
							{this._renderRightLine(index, activeIndexCount, values)}
						</View>
						<View style={styles.textContainer}>{this._renderText(value, index, activeIndexCount)}</View>
					</View>
				))}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	progressBarContainer: {
		height: verticalScale(50),
		backgroundColor: '#fcfcfc',
		flexDirection: 'row'
	},
	progressBarItemContainer: {
		flex: 0.25,
		justifyContent: 'center'
	},
	eachItemContainer: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	activeLine: {
		borderColor: Colors.brandPrimary,
		borderWidth: 1,
		alignSelf: 'center',
		flex: 1,
		height: 0,
		backgroundColor: Colors.brandPrimary
	},
	inactiveLine: {
		borderColor: 'gray',
		borderWidth: 1,
		alignSelf: 'center',
		flex: 1,
		height: 0,
		backgroundColor: 'gray'
	},
	invisibleLine: {
		flex: 1,
		alignSelf: 'center',
		height: 0
	},
	activeCircle: {
		borderColor: Colors.brandPrimary,
		borderWidth: 2,
		height: 10,
		alignSelf: 'center',
		width: 10,
		borderRadius: 5,
		backgroundColor: Colors.brandPrimary,
		margin: 5
	},
	inactiveCircle: {
		borderColor: 'gray',
		borderWidth: 2,
		height: 10,
		alignSelf: 'center',
		width: 10,
		borderRadius: 5,
		backgroundColor: 'gray',
		margin: 5
	},
	textContainer: {
		padding: 15,
		alignItems: 'center'
	},
	activeText: {
		color: 'gray',
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 12
	},
	inactiveText: {
		color: 'gray',
		fontFamily: 'Montserrat-Regular',
		fontSize: 12
	}
});
ProgressStatus.propTypes = {
	values: PropTypes.array.isRequired,
	status: PropTypes.string.isRequired
};
export default ProgressStatus;
