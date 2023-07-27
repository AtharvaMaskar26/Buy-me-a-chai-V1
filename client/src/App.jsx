import { useState, useEffect } from "react";
import "./App.css";

import abi from "./contractJSON/Chai.json";
import { ethers } from "ethers";

// Importing components
import { Buy } from "./components/Buy";
import { Memos } from "./components/Memos";

// Importing image
import chai from './chai.png'

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("Not Connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = "0x211F46C54542e91331C5Fe606A6598627F5Bfdeb";
      const contractABI = abi.abi;

      try {
        // Metamask Part
        // To do transactions, metamask consits of infura api which helps in connecting to the blockhain

        // 2. Connecting to Metamask
        const { ethereum } = window;

        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // Problem currently is that, on changing the network it is not updating in real time, so we do this: reload the page
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        // Once connected to metamask we can update our account state
        setAccount(account);
        const provider = new ethers.BrowserProvider(window.ethereum);
        // const provider = new ethers.providers.Web3Provider(ethereum); // Reading the blockchain
        const signer = await provider.getSigner(); // Writing on the blockchain

        // Creating contract instance
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        console.log(contract);
        // Once we have our contract instance ready we can update our state
        setState({
          provider,
          signer,
          contract,
        });
      } catch (error) {
        console.log(error);
      }
    };
    template();
  }, []);

  return (
    <div>
      <img src={chai} className="img-fluid" alt=".." width="100%" />
      <p style={{ marginTop: "10px", marginLeft: "5px" }}>
        <small>Connected Account - {account}</small>
      </p>

      <Buy state={state} />
      <Memos state={state} />
    </div>
  );
}

export default App;
