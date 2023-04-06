import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x46f882B11a1f03CbBc8acf1Ac81279793A18A82d');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async form => {
        try {
            const data = await createCampaign([
                address, form.title, form.description, form.target, new Date(form.deadline).getTime(), form.image
            ])
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign
            }}
        >
            {children}
        </StateContext.Provider>
    )

};

export const useStateContext = () => useContext(StateContext);