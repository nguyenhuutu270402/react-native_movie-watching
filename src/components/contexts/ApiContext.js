import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getAllPhim
} from '../services/ApiService';

export const ApiContext = createContext();
export const ApiContextProvider = (props) => {
    const { children } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nguoidung, setNguoidung] = useState({});


    useEffect(() => {
        try {
            AsyncStorage.getItem('nguoidung')
                .then(value => {
                    const myObject = JSON.parse(value);
                    setNguoidung(myObject);
                    if (myObject == null) {
                        setIsLoggedIn(false);
                    } else {
                        setIsLoggedIn(true);
                    }
                });
        } catch (error) {
            console.log(error)
        }
    }, [])


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
                isLoggedIn, setIsLoggedIn, onGetAllPhim, nguoidung, setNguoidung
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}
