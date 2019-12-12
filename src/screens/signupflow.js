import React from 'react';
import { View } from 'react-native';
import AppNavigator from '../navigation/index';
import NavigatorService from '../navigation/navigationService';

class SignupFlowScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<AppNavigator
					ref={(navigatorRef) => {
						NavigatorService.setContainer(navigatorRef);
					}}
				/>
			</View>
		);
	}
}

export default SignupFlowScreen;
