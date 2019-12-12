import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View, Text, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from './src/redux/store';
const { width, height } = Dimensions.get('window');

import SignupFlowScreen from './src/screens/signupflow';

const App = () => {
	const store = configureStore();
	return (
		<Provider store={store}>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView style={styles.pageContainer}>
				<SignupFlowScreen />
			</SafeAreaView>
		</Provider>
	);
};

const styles = StyleSheet.create({
	pageContainer: {
		flex: 1,
		width: width,
		height: height
	}
});

export default App;
