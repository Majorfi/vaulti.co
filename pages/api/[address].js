import	axios			from	'axios';

export const	performGet = (url) => {
	return (
		axios.get(url)
			.then(function (response) {
				return response.data;
			})
			.catch(function (error) {
				console.warn(error);
				return null;
			})
	);
};

const	mapping = {};
export default async function handler(req, res) {
	const	{address, revalidate} = req.query;
	const	now = new Date().getTime();

	if (mapping[address] !== undefined) {
		const	lastAccess = mapping[address]._VAULTI_LAST_ACCESS_;
		if (((now - lastAccess) > 10 * 60 * 1000) || revalidate === 'true') {
			const	vaults = await performGet('https://api.yearn.tools/vaults/all');
			const	vault = vaults.find(v => v.address.toLowerCase() === address.toLowerCase());
			mapping[address] = vault;
			mapping[address]._VAULTI_LAST_ACCESS_ = now;
			res.status(200).json(vault)
		} else {
			mapping[address]._VAULTI_LAST_ACCESS_ = now;
			res.status(200).json(mapping[address]);
		}
	} else {
		const	vaults = await performGet('https://api.yearn.tools/vaults/all');
		const	vault = vaults.find(v => v.address.toLowerCase() === address.toLowerCase());
		mapping[address] = vault;
		mapping[address]._VAULTI_LAST_ACCESS_ = now;
		res.status(200).json(vault)
	}
}