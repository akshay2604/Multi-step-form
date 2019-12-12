import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Platform,
	KeyboardAvoidingView,
	ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { isEmpty } from '../../utils/empty-utils';
import { submitPartialForm } from '../../redux/actions/form';
import ProgressStatus from '../progressBar';
import Font from '../../themes/fonts';
import { verticalScale, scale } from '../../utils/scaling';
import CheckboxOption from '../CheckBoxOption';
import RadioButtonGroup from '../RadioButton';
import Colors from '../../themes/color';

class Page4Fragment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checkBoxOptionSelected: null,
			selectedElementIndex: null
		};
		this.riskGroupCategories = [
			{ id: 221, category: 'Low risk Lower returns' },
			{ id: 222, category: 'Balanced Risk Moderate returns' },
			{ id: 223, category: 'High Risk High Return' }
		];
		this.onSubmitPress = this.onSubmitPress.bind(this);
	}
	onSubmitPress() {
		const permanentResidence = this.state.checkBoxOptionSelected === 'option1' ? 'Yes' : 'No';
		this.props.submitPartialForm({
			page: 'Page4',
			riskGroupCategorySelected: this.riskGroupCategories[this.state.selectedElementIndex],
			permanentResidence: permanentResidence
		});
	}
	render() {
		const { loading, progress } = this.props;
		return (
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} enabled style={styles.container}>
				<View style={{ paddingTop: 25 }}>
					<ProgressStatus values={[ 'Page1', 'Page2', 'Page3', 'Page4' ]} status={progress} />
				</View>
				<View style={styles.inner}>
					<View>
						<Text style={[ styles.questionText, { alignSelf: 'center' } ]}>
							Which best describes your risk appetite
						</Text>
						<RadioButtonGroup
							group={this.riskGroupCategories}
							radioButtonChecked={(index) => this.setState({ selectedElementIndex: index })}
							selectedElementIndex={this.state.selectedElementIndex}
						/>
					</View>
					<View style={styles.CheckboxOptionView}>
						<Text style={[ styles.questionText, { alignSelf: 'center' } ]}>Are you an Indian Citizen</Text>
						<CheckboxOption
							option1={'Yes'}
							option2={'No'}
							selectedOption={this.state.checkBoxOptionSelected}
							onOption1Press={() => this.setState({ checkBoxOptionSelected: 'option1' })}
							onOption2Press={() => this.setState({ checkBoxOptionSelected: 'option2' })}
						/>
					</View>
				</View>
				<View style={styles.btnContainer}>
					<TouchableOpacity
						disabled={
							isEmpty(this.state.selectedElementIndex) || isEmpty(this.state.checkBoxOptionSelected)
						}
						onPress={this.onSubmitPress}
						style={styles.submitButton}>
						{loading ? (
							<ActivityIndicator color="#fff" />
						) : (
							<Text style={styles.submitButtonText}>Finish</Text>
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
		fontSize: scale(Font.fontSize.med),
		fontFamily: Font.fontType.bold,
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
		fontFamily: Font.fontType.bold,
		fontSize: scale(Font.fontSize.med)
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
		progress: state.form.progress
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Page4Fragment);
