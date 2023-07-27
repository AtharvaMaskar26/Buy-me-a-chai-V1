import React, { memo, useEffect, useState } from "react";

export const Memos = ({state}) => {
    const [memos, setMemos] = useState([]);
    // This will help us access the functions of the contract
    const {contract} = state;
    // We are using useEffect so that our memos is updating constantly
    useEffect(() => {
        const memosMessage = async() => {
            const memos = await contract.getMemos(); // accessing the getMemos function
            setMemos(memos)
        }
        contract && memosMessage();

    }, [contract])
    return(
        <div>
            {memos.map((memo) => {
                return (
                    <div>
                    <p>{memo.name}</p> 
                    <p>{memo.message}</p> 
                    <p>{memo.timestamp}</p> 
                    <p>{memo.from}</p> 
                </div>
                )
            })}
        </div>
    )
}