# Getting Started with Create React App

1) Configuring truffle projet


2) Setting up a wallet for testing
- Download MetaMask extension to your browser and log it to a wallet
- Install Ganache, and open it that are all traansactions will be showed when working with Truffle
- Next step is to open Metamask extension and tap on networks on top, then add new network
write name - Ganache, the you can get RPC-URl when open Ganache and on top you will see RPC Server, copy that url and paste it. Then the Chain Id is 1337
- For testing an app we need some Ether. Open Ganache, choose one of ten accounts with some Ether on them, click the key image on the right and copy the private key. Then go to MetaMask, click on your icon in the top right corner, tap import account, paste your private key and press add.
Finally, you are able to test your app with MetaMask wallet !!

3) I was using the tutorial to implement web3 in projet - https://www.youtube.com/watch?v=h9PdvEDuZS8
The new react version work really weird with web3.js so this tutorial saved the day:
https://github.com/ChainSafe/web3.js#web3-and-create-react-app
