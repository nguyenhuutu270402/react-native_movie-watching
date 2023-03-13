import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getAllPhim, getListBinhLuanByIdPhim, getListLichSuTheoIdNguoiDung,
    getOnePhimById, getTop10Phim, addBinhLuan, addDanhGia, addLichSu,
    addLuotXem, addTheoDoi, addUser, updatePasswordUser, updateUser,
    deleteLichSu, deleteTheoDoi, kiemTraTheoDoi, loginUser, getOneTapById
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
                    if (myObject == null) {
                        setIsLoggedIn(false);
                    } else {
                        setIsLoggedIn(true);
                        setNguoidung(myObject);
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
    const onGetListBinhLuanByIdPhim = async (id) => {
        try {
            const res = await getListBinhLuanByIdPhim(id);
            return res;
        } catch (error) {
            console.log('onGetListBinhLuanByIdPhim error: ', error);
        }
    }
    const onGetListLichSuTheoIdNguoiDung = async (id) => {
        try {
            const res = await getListLichSuTheoIdNguoiDung(id);
            return res;
        } catch (error) {
            console.log('onGetListLichSuTheoIdNguoiDung error: ', error);
        }
    }
    const onGetTop10Phim = async () => {
        try {
            const res = await getTop10Phim();
            return res;
        } catch (error) {
            console.log('onGetTop10Phim error: ', error);
        }
    }
    const onGetOnePhimById = async (idPhim, idnguoidung) => {
        try {
            const res = await getOnePhimById(idPhim, idnguoidung);
            return res;
        } catch (error) {
            console.log('onGetOnePhimById error: ', error);
        }
    }
    const onAddBinhLuan = async (idnguoidung, idphim, noidung) => {
        try {
            const res = await addBinhLuan(idnguoidung, idphim, noidung);
            return res;
        } catch (error) {
            console.log('onAddBinhLuan error: ', error);
        }
    }
    const onAddLichSu = async (idnguoidung, idphim, idtap) => {
        try {
            const res = await addLichSu(idnguoidung, idphim, idtap);
            return res;
        } catch (error) {
            console.log('onAddLichSu error: ', error);
        }
    }
    const onAddDanhGia = async (idnguoidung, idphim, sosao) => {
        try {
            const res = await addDanhGia(idnguoidung, idphim, sosao);
            return res;
        } catch (error) {
            console.log('onAddDanhGia error: ', error);
        }
    }
    const onAddUser = async (email, matkhau) => {
        try {
            const res = await addUser(email, matkhau);
            return res;
        } catch (error) {
            console.log('onAddUser error: ', error);
        }
    }
    const onLoginUser = async (email, matkhau) => {
        try {
            const res = await loginUser(email, matkhau);
            return res;
        } catch (error) {
            console.log('onLoginUser error: ', error);
        }
    }
    const onAddTheoDoi = async (idnguoidung, idphim) => {
        try {
            const res = await addTheoDoi(idnguoidung, idphim);
            return res;
        } catch (error) {
            console.log('onAddTheoDoi error: ', error);
        }
    }
    const onAddLuotXem = async (idnguoidung, idtap) => {
        try {
            const res = await addLuotXem(idnguoidung, idtap);
            return res;
        } catch (error) {
            console.log('onAddLuotXem error: ', error);
        }
    }
    const onUpdatePasswordUser = async (matkhau, id) => {
        try {
            const res = await updatePasswordUser(matkhau, id);
            return res;
        } catch (error) {
            console.log('onUpdatePasswordUser error: ', error);
        }
    }
    const onUpdateUser = async (tennguoidung, avatar, id) => {
        try {
            const res = await updateUser(tennguoidung, avatar, id);
            return res;
        } catch (error) {
            console.log('onUpdateUser error: ', error);
        }
    }
    const onKiemTraTheoDoi = async (idnguoidung, idphim) => {
        try {
            const res = await kiemTraTheoDoi(idnguoidung, idphim);
            return res;
        } catch (error) {
            console.log('onKiemTraTheoDoi error: ', error);
        }
    }
    const onDeleteLichSu = async (idnguoidung, idphim) => {
        try {
            const res = await deleteLichSu(idnguoidung, idphim);
            return res;
        } catch (error) {
            console.log('onDeleteLichSu error: ', error);
        }
    }
    const onDeleteTheoDoi = async (idnguoidung, idphim) => {
        try {
            const res = await deleteTheoDoi(idnguoidung, idphim);
            return res;
        } catch (error) {
            console.log('onDeleteTheoDoi error: ', error);
        }
    }
    const onGetOneTapById = async (idTap, idPhim, idnguoidung) => {
        try {
            const res = await getOneTapById(idTap, idPhim, idnguoidung);
            return res;
        } catch (error) {
            console.log('onGetOneTapById error: ', error);
        }
    }

    return (
        <ApiContext.Provider
            value={{
                isLoggedIn, setIsLoggedIn, onGetAllPhim, nguoidung, setNguoidung,
                onGetListBinhLuanByIdPhim, onGetListLichSuTheoIdNguoiDung, onGetOnePhimById,
                onGetTop10Phim, onAddBinhLuan, onAddDanhGia, onAddLichSu, onAddLuotXem, onAddTheoDoi,
                onAddUser, onLoginUser, onUpdatePasswordUser, onUpdateUser, onKiemTraTheoDoi,
                onDeleteTheoDoi, onDeleteLichSu, onGetOneTapById
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}
