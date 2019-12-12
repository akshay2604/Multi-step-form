import React, { Component } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { scale } from '../utils/scaling';
import Colors from '../themes/color';
import Font from '../themes/fonts';

class RadioButtonGroup extends Component {
	render() {
		const { selectedElementIndex, group } = this.props;
		return (
			<View>
				{group.map((ele, index) => (
					<View style={styles.group} key={ele.id}>
						<TouchableOpacity
							style={[
								styles.radioBtn,
								{ backgroundColor: selectedElementIndex === index ? Colors.brandPrimary : '#fff' }
							]}
							onPress={() => this.props.radioButtonChecked(index)}
						/>
						<View style={styles.labelContainer}>
							<Text style={styles.labelText}>{ele.category}</Text>
						</View>
					</View>
				))}
			</View>
		);
	}
}
const styles = StyleSheet.create({
	group: {
		flexDirection: 'row',
		marginTop: scale(15)
	},
	radioBtn: {
		width: 20,
		justifyContent: 'flex-start',
		height: 20,
		borderWidth: 1,
		borderRadius: 10
	},
	labelContainer: {
		paddingHorizontal: 10
	},
	labelText: {
		fontFamily: Font.fontType.med,
		fontSize: scale(Font.fontSize.sm1)
	}
});
export default RadioButtonGroup;
