import React, { useState } from 'react';
import Web3 from 'web3';
import CheckWeb3 from './Web3Utils';
import Container from "@material-ui/core/Container";

import "../css/metamask.css";


export default function MetamaskLogin(props) {

    this.web3Provider = CheckWeb3(props);


    return (
        <Container component="main" maxWidth="xs">

        </Container>
    );
}