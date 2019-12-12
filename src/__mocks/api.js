class Api {
	static formService(args) {
		return new Promise((resolve, reject) => {
			setTimeout(() => resolve(args), 1000);
		});
	}
}
export default Api;
