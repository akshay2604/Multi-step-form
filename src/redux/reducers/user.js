import types from '../actions/types';

const initialState = {
	name: null,
	age: null,
	gender: null,
	height: null,
	weight: null,
	tobaccoUsed: false,
	riskGroupCategorySelected: null,
	permanentResidence: false,
	loading: false,
	page: null
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case types.submitPartialForm:
			return { ...state, ...action.payload };
		case types.requestInitiation:
			return { ...state, loading: true };
		case types.requestCompleted:
			return { ...state, loading: false };
		case types.resetUserState:
			return initialState;
		default:
			return state;
	}
};
export default user;
