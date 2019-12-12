import { combineReducers } from 'redux';
import user from './user';
import form from './form';

const reducers = combineReducers({
	user,
	form
});
export default reducers;
