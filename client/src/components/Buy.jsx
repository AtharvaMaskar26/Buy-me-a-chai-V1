import React from "react";
import {ethers} from "ethers"

export const Buy = ({state}) => {
    const buyChai = async(event) => {
        event.preventDefault();
        const {contract} = state;

        // Collecting/Reading input
        const name = document.querySelector("#name").value;
        const message = document.querySelector("#message").value;

        // Ethers.utils.parseEther has been migrated from utils to ethers
        const amount = {value:ethers.parseEther("0.001")}
        // Calling the buyChai function
        const transaction = await contract.buyChai(name, message, amount);
        // Wait for the transavtion
        await transaction.wait();
        alert("Transcation successful");
        console.log(name, message);
    }

    return(
        <div className="">
            <form onSubmit={buyChai}>
                <input id="name"></input>
                <input id="message"></input>
                <button>Pay</button>
            </form>
        </div>
    )
}