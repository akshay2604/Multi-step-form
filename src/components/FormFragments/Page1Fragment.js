import React from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
	Platform,
	Dimensions,
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

const { width, height } = Dimensions.get('window');

class NameFragment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name,
			nameError: null,
			enable: false,
			selected: null,
			data: []
		};
		this.onSubmitPress = this.onSubmitPress.bind(this);
	}
	validateNameField(value) {
		const regExp = /[0123456789!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/;
		const r = regExp.test(value);

		if (r) {
			return 'Name should contain only letters';
		}
		return null;
	}
	onNameChange = (name) => {
		this.setState({
			name: name,
			nameError: this.validateNameField(name)
		});
	};
	onSubmitPress() {
		this.props.submitPartialForm({ page: 'Page1', name: this.state.name });
	}
	render() {
		const { loading, progress } = this.props;
		return (
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
				<View style={{ paddingTop: 25 }}>
					<ProgressStatus values={[ 'Page1', 'Page2', 'Page3', 'Page4' ]} status={progress} />
				</View>
				<ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">
					<Text testID={'yourNameQuestion'} style={styles.questionText}>
						{'What is your name'}
					</Text>
					<View style={styles.textInputWithInfoView}>
						<TextInputWithInfo
							onChangeText={this.onNameChange}
							val={this.state.name}
							errorVal={this.state.nameError}
							whyAskingText={'How will you be seen'}
							textAlign={'center'}
							autoCorrect={false}
							autoFocus={true}
						/>
					</View>
				</ScrollView>
				<View style={styles.btnContainer}>
					<TouchableOpacity
						disabled={isEmpty(this.state.name) || !isEmpty(this.state.nameError)}
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
	questionText: {
		marginTop: verticalScale(60),
		fontSize: scale(20),
		alignSelf: 'center',
		fontFamily: 'Montserrat-SemiBold',
		color: Colors.brandPrimary
	},
	textInputWithInfoView: {
		width: '100%',
		paddingTop: '24%'
	},
	btnContainer: {
		flex: 1,
		justifyContent: 'flex-end'
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
		progress: state.form.progress,
		name: state.user.name
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(NameFragment);
