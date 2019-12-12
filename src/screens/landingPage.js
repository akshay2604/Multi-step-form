import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { progressUpdate, resetUserState } from '../redux/actions/form';
import Colors from '../themes/color';
import { scale } from '../utils/scaling';

class LandingPage extends React.Component {
	restartSignup() {
		this.props.progressUpdate('Page1');
		this.props.resetUserState();
		this.props.navigation.popToTop();
	}
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={() => this.restartSignup()} style={styles.submitButton}>
					<Text style={styles.submitButtonText}>Restart</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	submitButton: {
		width: '70%',
		backgroundColor: Colors.brandPrimary,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 6,
		padding: 20
	},
	submitButtonText: {
		textAlign: 'center',
		color: '#fff',
		fontFamily: 'Montserrat-SemiBold',
		fontSize: scale(14)
	}
});

const mapsDispatchToProps = (dispatch) => {
	return {
		progressUpdate: (payload) => dispatch(progressUpdate(payload)),
		resetUserState: () => dispatch(resetUserState())
	};
};

export default connect(null, mapsDispatchToProps)(LandingPage);
