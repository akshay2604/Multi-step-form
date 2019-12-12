const isEmpty = (value) => {
	if (typeof value === 'number') return false;
	else if (typeof value === 'string') return value.trim().length === 0;
	else if (Array.isArray(value)) return value.length === 0;
	else if (typeof value === 'object') return value == null || Object.keys(value).length === 0;
	else if (typeof value === 'boolean') return false;
	else return !value;
};

export { isEmpty };
