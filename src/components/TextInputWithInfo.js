import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { verticalScale, scale } from '../utils/scaling';
import Font from '../themes/fonts';
import Colors from '../themes/color';

export default class TextInputWithInfo extends React.Component {
	constructor(props) {
		super(props);
		this.textInput = React.createRef();
		this.focusTextInput = this.focusTextInput.bind(this);
	}

	render() {
		let { onChangeText, errorVal, whyAskingText } = this.props;
		whyAskingText = errorVal != null ? errorVal : whyAskingText;
		return (
			<View style={styles.container}>
				<TextInput
					{...this.props}
					style={styles.input}
					ref={this.textInput}
					onChangeText={(value) => onChangeText(value)}
				/>
				<View style={styles.inputUnderline} />
				<View style={styles.notificationView}>
					<Text style={[ styles.whyAskingText, { color: errorVal != null ? '#d44c0e' : '#3F2E5C' } ]}>
						{whyAskingText}
					</Text>
				</View>
			</View>
		);
	}
	focusTextInput() {
		this.textInput.current.focus();
	}
}

const styles = StyleSheet.create({
	Container: {
		flexDirection: 'column',
		width: '100%'
	},
	inputView: {
		justifyContent: 'center'
	},
	input: {
		fontSize: verticalScale(18),
		fontFamily: Font.fontType.med
	},
	inputUnderline: {
		marginVertical: verticalScale(10),
		borderRadius: 4,
		borderWidth: 0.5,
		borderColor: '#d6d7da'
	},
	notificationView: {
		alignItems: 'center'
	},
	errorNotificationText: {
		margin: scale(7),
		color: '#980004'
	},
	whyAskingText: {
		fontSize: scale(Font.fontSize.sm1),
		fontFamily: Font.fontType.base,
		opacity: 0.87,
		color: Colors.brandPrimary
	}
});
