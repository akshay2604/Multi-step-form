import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Platform,
	ScrollView,
	KeyboardAvoidingView,
	ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { isEmpty } from '../../utils/empty-utils';
import { submitPartialForm } from '../../redux/actions/form';
import TextInputWithInfo from '../TextInputWithInfo';
import ProgressStatus from '../progressBar';
import { verticalScale, scale } from '../../utils/scaling';
import CheckboxOption from '../CheckBoxOption';
import Colors from '../../themes/color';

class Page3Fragment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			height: null,
			heightError: null,
			weight: null,
			weightError: null,
			checkBoxOptionSelected: null
		};
		this.onHeightChange = this.onHeightChange.bind(this);
		this.onWeightChange = this.onWeightChange.bind(this);
		this.onSubmitPress = this.onSubmitPress.bind(this);
	}
	onHeightChange(height) {
		this.setState({
			height: height,
			heightError: height > 300 ? 'Height is not correct' : null
		});
	}
	onWeightChange(weight) {
		this.setState({
			weight: weight,
			weightError: weight >= 300 ? 'Weight is not correct' : null
		});
	}
	onSubmitPress() {
		this.props.submitPartialForm({
			page: 'Page3',
			height: this.state.height,
			weight: this.state.weight,
			tobaccoUsed: this.state.tobaccoUsed
		});
	}
	render() {
		const { loading, progress } = this.props;
		return (
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} enabled style={styles.container}>
				<View style={{ paddingTop: 25 }}>
					<ProgressStatus values={[ 'Page1', 'Page2', 'Page3', 'Page4' ]} status={progress} />
				</View>
				<ScrollView style={styles.inner} keyboardShouldPersistTaps="handled">
					<View style={styles.rowContainer}>
						<Text style={styles.questionText} testID={'yourAgeQuestion'}>
							{'Height'}
						</Text>
						<View style={styles.textInputWithInfoView}>
							<TextInputWithInfo
								onChangeText={this.onHeightChange}
								val={this.state.height}
								errorVal={this.state.heightError}
								keyboardType={'numeric'}
								whyAskingText={'Height in cm'}
								textAlign={'center'}
								autoCorrect={false}
								autoFocus={true}
							/>
						</View>
						<Text style={styles.questionText} testID={'yourAgeQuestion'}>
							{'Weight'}
						</Text>
						<View style={styles.textInputWithInfoView}>
							<TextInputWithInfo
								onChangeText={this.onWeightChange}
								val={this.state.weight}
								keyboardType={'numeric'}
								errorVal={this.state.weightError}
								whyAskingText={'Weight in kgs'}
								textAlign={'center'}
								autoCorrect={false}
							/>
						</View>
					</View>
					<View style={styles.CheckboxOptionView}>
						<Text style={[ styles.questionText, { alignSelf: 'center' } ]} testID={'yourAgeQuestion'}>
							Are you a tobacco user
						</Text>
						<CheckboxOption
							option1={'Yes'}
							option2={'No'}
							selectedOption={this.state.checkBoxOptionSelected}
							onOption1Press={() => this.setState({ checkBoxOptionSelected: 'option1' })}
							onOption2Press={() => this.setState({ checkBoxOptionSelected: 'option2' })}
						/>
					</View>
				</ScrollView>
				<View style={styles.btnContainer}>
					<TouchableOpacity
						disabled={
							isEmpty(this.state.height) ||
							isEmpty(this.state.weight) ||
							isEmpty(this.state.checkBoxOptionSelected) ||
							!isEmpty(this.state.heightError) ||
							!isEmpty(this.state.weightError)
						}
						onPress={this.onSubmitPress}
						style={styles.submitButton}>
						{loading ? (
							<ActivityIndicator color="#fff" />
						) : (
							<Text style={styles.submitButtonText}>Next</Text>
						)}
					</TouchableOpacity>
				</View>
				<View style={{ flex: 1 }} />
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	inner: {
		padding: scale(14)
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly'
	},
	questionText: {
		marginTop: verticalScale(30),
		fontSize: scale(14),
		fontFamily: 'Montserrat-SemiBold',
		color: Colors.brandPrimary
	},
	textInputWithInfoView: {
		width: '30%',
		paddingTop: scale(20),
		flexDirection: 'row'
	},
	btnContainer: {
		flex: 1,
		justifyContent: 'flex-end'
	},
	CheckboxOptionView: {
		paddingTop: verticalScale(5)
	},
	submitButton: {
		width: '70%',
		alignSelf: 'center',
		backgroundColor: Colors.brandPrimary,
		justifyContent: 'center',
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

const mapDispatchToProps = (dispatch) => {
	return {
		submitPartialForm: (data) => dispatch(submitPartialForm(data))
	};
};
const mapStateToProps = (state) => {
	return {
		loading: state.user.loading,
		height: state.user.height,
		weight: state.user.weight,
		tobaccoUsed: state.user.tobaccoUsed,
		progress: state.form.progress
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Page3Fragment);
