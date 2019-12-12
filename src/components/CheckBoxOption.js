import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../themes/color';
import { verticalScale, scale } from '../utils/scaling';

const CheckBoxOption = (props) => (
	<View style={styles.container}>
		<TouchableOpacity
			style={[
				styles.button,
				{ backgroundColor: props.selectedOption === 'option1' ? Colors.brandPrimary : '#fff' }
			]}
			onPress={() => props.onOption1Press()}>
			<Text style={[ styles.optionText, { color: props.selectedOption === 'option1' ? '#fff' : 'black' } ]}>
				{props.option1}
			</Text>
		</TouchableOpacity>
		<TouchableOpacity
			style={[
				styles.button,
				{ backgroundColor: props.selectedOption === 'option2' ? Colors.brandPrimary : '#fff' }
			]}
			onPress={() => props.onOption2Press()}>
			<Text style={[ styles.optionText, { color: props.selectedOption === 'option2' ? '#fff' : 'black' } ]}>
				{props.option2}
			</Text>
		</TouchableOpacity>
	</View>
);

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingVertical: verticalScale(30),
		paddingHorizontal: scale(20),
		flexDirection: 'row'
	},
	button: {
		paddingVertical: verticalScale(10),
		paddingHorizontal: scale(30),
		borderWidth: 1
	},
	optionText: {
		color: '#fff',
		fontFamily: 'Montserrat-SemiBold',
		fontSize: 12
	}
});
export default CheckBoxOption;
