# Vaulti.co
Vaulti.co is a wrapper around [yearn.tools](https://yearn.tools/#/).  
If yearn.tools is a great way to get insight and data on yearn's Vaults, it's not an efficient way : if you need a specific vault information, you will need to fetch all the vaults, then to filter the vaults you want.  
Even if it's not hard to do, it means more useless brandwidth, and just more work.  

Vaulti.co will provide you some very simple routes to get exactly what you need. Right now, this means to get **one** specific vault. Whao.
In order to improve reactivity and to be fast, the request are cached for 10 minutes.  
You can know when was the last update with the `_VAULTI_LAST_ACCESS_` key, and force a refresh with `?revalidate=true`.

_But why is it a react app ?!_ : Because I am lazy and I needed to boostrat this quickly. It's using the API feature of next+vercel, so it's basically a nodeJs server (with extra step, but not for me)

## Routes
For now there is only one route (haha, great proxy) :

### Get a specific Vault 1️⃣
▸ Request: `GET vaulti.co/api/_THE_VAULT_ADDRESS_`  
▸ Params: [none | `?revalidate=true` | `?revalidate=false`]  

```bash
curl -X GET "https://vaulti.co/api/0x671a912C10bba0CFA74Cfc2d6Fba9BA1ed9530B2" -H  "accept: application/json"
```

```js
axios.get('https://vaulti.co/api/0x671a912C10bba0CFA74Cfc2d6Fba9BA1ed9530B2')
	.then(function (response) {
		return response.data;
	})
	.catch(function (error) {
		console.warn(error);
		return null;
	})
```

### Get a list of specific Vaults 🔁
▸ Request: `GET vaulti.co/api/_THE_VAULT_0_ADDRESS_,_THE_VAULT_1_ADDRESS_,_THE_VAULT_N_ADDRESS_`  
▸ Params: [none | `?revalidate=true` | `?revalidate=false`]  

```bash
curl -X GET "https://vaulti.co/api/0x671a912C10bba0CFA74Cfc2d6Fba9BA1ed9530B2,0xe9Dc63083c464d6EDcCFf23444fF3CFc6886f6FB" -H  "accept: application/json"
```

```js
axios.get('https://vaulti.co/api/0x671a912C10bba0CFA74Cfc2d6Fba9BA1ed9530B2,0xe9Dc63083c464d6EDcCFf23444fF3CFc6886f6FB')
	.then(function (response) {
		return response.data;
	})
	.catch(function (error) {
		console.warn(error);
		return null;
	})
```
