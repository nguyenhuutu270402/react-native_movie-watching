import React, { useContext, createContext, useState } from 'react';
import {
    getAllPhim
} from '../services/ApiService';

export const ApiContext = createContext();
export const ApiContextProvider = (props) => {
    const { children } = props;

    const onGetAllPhim = async () => {
        try {
            const res = await getAllPhim();
            return res;
        } catch (error) {
            console.log('onGetAllPhim error: ', error);
        }
    }

    return (
        <ApiContext.Provider
            value={{
                onGetAllPhim
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}
