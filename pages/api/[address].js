import	axios			from	'axios';

const	performGet = (url) => {
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

async function asyncForEach(array, callback) {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

const	mapping = {};

async function fetchAndGetAddress(address) {
	const	now = new Date().getTime();
	const	vaults = await performGet('https://api.yearn.tools/vaults/all');
	const	vault = vaults.find(v => address === v.address.toLowerCase());
	if (!vault) {
		return ({code: 404, json: {}});
	}
	mapping[address] = vault;
	mapping[address]._VAULTI_LAST_ACCESS_ = now;
	return ({code: 200, json: mapping[address]});
}
async function checkAndGetAddress(address, revalidate) {
	const	now = new Date().getTime();
	const	lastAccess = mapping[address]._VAULTI_LAST_ACCESS_;
	if (((now - lastAccess) > 10 * 60 * 1000) || revalidate === 'true') {
		const	vaults = await performGet('https://api.yearn.tools/vaults/all');
		const	vault = vaults.find(v => address === v.address.toLowerCase());
		if (!vault) {
			return ({code: 404, json: {}});
		}
		mapping[address] = vault;
		mapping[address]._VAULTI_LAST_ACCESS_ = now;
		return ({code: 200, json: vault});
	}
	mapping[address]._VAULTI_LAST_ACCESS_ = now;
	return ({code: 200, json: mapping[address]});
}
async function getAddress(address, revalidate) {
	if (mapping[address] !== undefined) {
		return await checkAndGetAddress(address, revalidate);
	} else {
		return await fetchAndGetAddress(address);
	}
}

export default async function handler(req, res) {
	let		{address, revalidate} = req.query;
	const	addresses = address.toLowerCase().split(',')
	address = address.toLowerCase();

	if (addresses.length === 0) {
		return res.status(404).json({});
	}
	if (addresses.length === 1) {
		const	{code, json} = await getAddress(address, revalidate)
		return	res.status(code).json(json);
	}
	//so if addresses > 1
	const	responseBuilder = {};
	await asyncForEach(addresses, (async (addr) => {
		const	{json} = await getAddress(addr, revalidate)
		responseBuilder[addr] = json;
	}));
	return	res.status(200).json(responseBuilder);
	
}