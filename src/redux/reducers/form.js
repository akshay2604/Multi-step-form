import types from '../actions/types';

const initialState = {
	progress: 'Page1'
};

const form = (state = initialState, action) => {
	switch (action.type) {
		case types.progressUpdate:
			return { ...state, progress: action.payload };
		default:
			return state;
	}
};
export default form;
