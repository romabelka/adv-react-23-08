export const sortByAplhabet = (events) => events.sort((prev, next) => {{
	if (prev.title[0].toUpperCase() < next.title[0].toUpperCase()) return -1;
	if (prev.title[0].toUpperCase() > next.title[0].toUpperCase()) return 1;

	return 0;
}});

export const getIndexByTitle = (arr, str) => {
	let index = -1;

	if (!arr.length)
		return index;

	arr.forEach((item, i) => {
		if (item.title === str) {
			index = i;
		}
	});

	return index;
};

export const groupByAphabet = (events) => {
	return events.reduce((prev, item) => {
		const matchIndex = getIndexByTitle(prev, item.title[0].toUpperCase());

		if (!prev.length || matchIndex < 0) {
			prev.push({
				title: item.title[0].toUpperCase(),
				data: [item]
			});
		} else {
			prev[matchIndex].data.push(item);
		}

		return prev;
	}, []);
};