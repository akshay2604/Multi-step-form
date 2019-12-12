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
import TextInputWithInfo from '../TextInputWithInfo';
import ProgressStatus from '../progressBar';
import { verticalScale, scale } from '../../utils/scaling';
import Colors from '../../themes/color';
import CheckboxOption from '../CheckBoxOption';
import { ScrollView } from 'react-native-gesture-handler';

class Page2Fragment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			age: props.age,
			ageError: null,
			checkBoxOptionSelected: null
		};
		this.onAgeChange = this.onAgeChange.bind(this);
		this.onSubmitPress = this.onSubmitPress.bind(this);
	}
	componentDidMount() {
		const { age, gender } = this.props;
		this.setState({
			age: age,
			checkBoxOptionSelected: gender && gender === 'Male' ? 'option1' : !gender ? null : 'option2'
		});
	}
	validateAgeField(value) {
		if (value > 200) return 'Age is not correct';
		return null;
	}
	onAgeChange(age) {
		this.setState({
			age: age,
			ageError: age > 200 ? 'Age is not correct' : null
		});
	}
	onSubmitPress() {
		const genderSelected = this.state.checkBoxOptionSelected === 'option1' ? 'Male' : 'Female';
		this.props.submitPartialForm({ page: 'Page2', age: parseInt(this.state.age), gender: genderSelected });
	}
	render() {
		const { loading, progress } = this.props;
		return (
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} enabled style={styles.container}>
				<View style={{ paddingTop: 25 }}>
					<ProgressStatus values={[ 'Page1', 'Page2', 'Page3', 'Page4' ]} status={progress} />
				</View>
				<ScrollView style={styles.inner} keyboardShouldPersistTaps="handled">
					<Text style={styles.questionText} testID={'yourAgeQuestion'}>
						{'What is your age'}
					</Text>
					<View style={styles.textInputWithInfoView}>
						<TextInputWithInfo
							onChangeText={this.onAgeChange}
							val={this.state.age}
							keyboardType={'numeric'}
							errorVal={this.state.ageError}
							whyAskingText={'Your age in years'}
							textAlign={'center'}
							autoCorrect={false}
							autoFocus={true}
						/>
					</View>
					<View style={styles.CheckboxOptionView}>
						<Text style={styles.questionText} testID={'yourAgeQuestion'}>
							Gender
						</Text>
						<CheckboxOption
							option1={'Male'}
							option2={'Female'}
							selectedOption={this.state.checkBoxOptionSelected}
							onOption1Press={() => this.setState({ checkBoxOptionSelected: 'option1' })}
							onOption2Press={() => this.setState({ checkBoxOptionSelected: 'option2' })}
						/>
					</View>
				</ScrollView>
				<View style={styles.btnContainer}>
					<TouchableOpacity
						disabled={
							isEmpty(this.state.age) ||
							!isEmpty(this.state.ageError) ||
							isEmpty(this.state.checkBoxOptionSelected)
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
	questionText: {
		marginTop: verticalScale(60),
		fontSize: scale(20),
		alignSelf: 'center',
		fontFamily: 'Montserrat-SemiBold',
		color: Colors.brandPrimary
	},
	textInputWithInfoView: {
		width: '100%',
		paddingTop: scale(20)
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
		age: state.user.age,
		gender: state.user.gender,
		progress: state.form.progress
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Page2Fragment);
