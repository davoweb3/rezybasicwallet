import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router";
import { magic } from "../magic";
import Loading from "./Loading";
import Web3 from "web3";
import QRCode from "qrcode.react"; // Import the QRCode component

export default function Profile() {
  const [userMetadata, setUserMetadata] = useState();
  const [balance, setBalance] = useState();
  const [amount, setAmount] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();

  const web3 = new Web3(magic.rpcProvider);

  useEffect(() => {
    magic.user.isLoggedIn().then((magicIsLoggedIn) => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then((user) => {
          setUserMetadata(user);
          web3.eth.getBalance(user.publicAddress).then((b) => {
            setBalance(web3.utils.fromWei(b));
          });
        });
      } else {
        history.push("/login");
      }
    });
  }, []);

  const transfer = async () => {
    if (!amount || !toAddress) return;
    setDisabled(true);
    const tx = await web3.eth.sendTransaction({
      from: userMetadata.publicAddress,
      to: userMetadata.publicAddress,
      value: amount
    });
    console.log(tx);
    setAmount("");
    setToAddress("");
    setDisabled(false);
  };

  const logout = useCallback(() => {
    magic.user.logout().then(() => {
      history.push("/login");
    });
  }, []);

  return userMetadata ? (
    <>
      <div className="container">
        <h1>Current User: {userMetadata.email}</h1>
        <button onClick={logout}>Logout</button>
      </div>
      <div className="container">
        <h1>Address</h1>
        <div className="info">
          <a
            href={`https://testnet.ftmscan.com/address/${userMetadata.publicAddress}`}
            target="_blank"
          >
            {userMetadata.publicAddress}
          </a>
          {/* Include the QRCode component here */}
          <QRCode value={userMetadata.publicAddress} size={128} />
        </div>
      </div>
      <div className="container">
        <h1>Balance</h1>
        <div className="info">{balance} FTM</div>
        <div>
          <a href="https://faucet.fantom.network/" target="_blank">
            FTM Faucet
          </a>
        </div>
      </div>
      <div className="container">
        <h1>Send Transaction</h1>
        <input
          placeholder="To Address"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <input
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <button onClick={transfer} disabled={disabled}>
          Send Transaction
        </button>
      </div>
    </>
  ) : (
    <Loading />
  );
}
