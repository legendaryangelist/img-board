import React from 'react';
import Web3 from 'web3';
import * as settings from '../settings';

export default function CheckWeb3(props) {
    var web3 = new Web3();
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
          window.ethereum.enable().then(function() {
            // User has allowed account access to DApp...
          });
        } catch (e) {
          // User has denied account access to DApp...
        }
      }
    // Legacy DApp Browsers
    else if (window.web3) {
        web3 = new Web3(web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
        alert("You have to install MetaMask!");
    }
    window.ethereum.enable();
    console.log("type of = ", typeof web3);

    if (typeof web3 != "undefined") {
        this.web3Provider = web3.currentProvider;
        window.ethereum.enable();
    } 
    else {
        this.web3Provider = new Web3.providers.WebsocketProvider(settings.INFURA_WEBSOCKET_API);
        window.ethereum.enable();
    }

    return this.web3Provider;
}