import { StackActions, NavigationActions } from 'react-navigation';

let _container;

function setContainer(container) {
	_container = container;
}

function reset(routeName, params) {
	_container.dispatch(
		StackActions.reset({
			index: 0,
			actions: [
				NavigationActions.navigate({
					type: 'Navigation/NAVIGATE',
					routeName,
					params
				})
			]
		})
	);
}
function popToTop() {
	_container.dispatch(StackActions.popToTop());
}

function navigate(routeName, params) {
	_container.dispatch(
		NavigationActions.navigate({
			type: 'Navigation/NAVIGATE',
			routeName,
			params
		})
	);
}
function goBack(routeName, params) {
	_container.dispatch(NavigationActions.back());
}

function navigateDeep(actions) {
	_container.dispatch(
		actions.reduceRight(
			(prevAction, action) =>
				NavigationActions.navigate({
					type: 'Navigation/NAVIGATE',
					routeName: action.routeName,
					params: action.params,
					action: prevAction
				}),
			undefined
		)
	);
}

export default {
	setContainer,
	navigateDeep,
	navigate,
	goBack,
	popToTop,
	reset
};
