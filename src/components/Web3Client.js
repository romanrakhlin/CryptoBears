import Web3 from "web3";
import CryptoBearsContractBuild from "contracts/CryptoBearsContract.json";

let selectedAccount;
let cryptoBearsContract;
let isInitialized = false;

export const initWeb3 = async () => {
	let provider = window.ethereum;

	if (typeof provider !== "undefined") {
		// this means that MetaMask is installed
		provider.request({ method: "eth_requestAccounts" })
		.then((accounts) =>  {
			selectedAccount = accounts[0];
			console.log(`selected account is: ${accounts}`);
		}).catch((error) => {
			console.log(error);
			return;
		});

		// keep track of switching accounts
		window.ethereum.on("accountsChanged", function (accounts) {
			selectedAccount = accounts[0];
			console.log(`selected account changed to: ${accounts}`);
		});

		// actually setting up the connection with out Smart Contract
		// const web3 = new Web3(provider);
		const web3 = new Web3("HTTP://127.0.0.1:7545");

		// Fix for depreciated web3
		// In case something happens
		provider.enable().catch(error => {
			// User denied account access
			console.log(error)
		});

		//const netId = await web3.eth.net.getId()
		// const netId = await provider.request({method: 'eth_chainId'})
		const networkId = await web3.eth.net.getId();

		//load contracts
		try {
			// cryptoBearsContract = new web3.eth.Contract(CryptoBearsContractBuild.abi, CryptoBearsContractBuild.networks[netId].address)
			cryptoBearsContract = new web3.eth.Contract(
				CryptoBearsContractBuild.abi, 
				CryptoBearsContractBuild.networks[networkId].address
			);
		} catch (e) {
			console.log('Error', e);
			window.alert('Contracts not deployed to the current network');
		}

		// set that our connectio is setted up and stable
		// so we can run out smart contracts functions
		isInitialized = true
	} else {
		window.alert('Please install MetaMask');
	}
}

export const createBearGen0 = async (genes) => {
	if (!isInitialized) {
		await initWeb3();
	}

	return cryptoBearsContract.methods.createBearGen0(genes).send({
		from: selectedAccount,
		gas: 6000000 // now sure if its a proper number, found it on forum
	});
}

export const totalSupply = async () => {
	if (!isInitialized) {
		await initWeb3();
	}

	return await cryptoBearsContract.methods.totalSupply().send({
		from: selectedAccount
	});
}

export const getBear = async (bearId) => {
	if (!isInitialized) {
		await initWeb3();
	}

	return await cryptoBearsContract.methods.getBear(bearId).send({
		from: selectedAccount
	});
}

// export const totalSupply = async () => {
// 	if (!isInitialized) {
// 		await initWeb3();
// 	}

// 	if (cryptoBearsContract !== 'undefined') {
// 		try {
// 			await cryptoBearsContract.methods.totalSupply().send({from: selectedAccount});
// 		} catch (e) {
// 			console.log('Error getting total supply: ', e);
// 		}
// 	}

// 	// let result = await cryptoBearsContract.methods.totalSupply().send({
// 	// 	from: selectedAccount
// 	// });;
// 	// console.log(result)
// 	// return result;
// }