import types from './types';
import NavigatorService from '../../navigation/navigationService';
import Api from '../../__mocks/api';

const progressUpdate = (payload) => {
	return {
		type: types.progressUpdate,
		payload: payload
	};
};

const submitPartialForm = (data) => (dispatch) => {
	dispatch({ type: types.requestInitiation });
	Api.formService(data).then((result) => {
		dispatch({ type: types.submitPartialForm, payload: result });
		dispatch({ type: types.requestCompleted });
		if (result.page === 'Page1') {
			dispatch(progressUpdate('Page2'));
			NavigatorService.navigate('Page2Fragment');
		} else if (result.page === 'Page2') {
			dispatch(progressUpdate('Page3'));
			NavigatorService.navigate('Page3Fragment');
		} else if (result.page === 'Page3') {
			dispatch(progressUpdate('Page4'));
			NavigatorService.navigate('Page4Fragment');
		} else {
			NavigatorService.navigate('LandingPage');
		}
	});
};

const resetUserState = () => {
	return {
		type: types.resetUserState
	};
};
export { progressUpdate, submitPartialForm, resetUserState };
