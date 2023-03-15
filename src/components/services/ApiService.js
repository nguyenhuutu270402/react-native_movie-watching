import axiosInstance from "../../utilities/axios";

export const loginUser = async (email, matkhau) => {
    const data = { email, matkhau }
    const res = await axiosInstance.post(`api/login`, data);
    return res;
}
export const addUser = async (email, matkhau) => {
    const data = { email, matkhau }
    const res = await axiosInstance.post(`api/add-user`, data);
    return res;
}
export const getAllPhim = async () => {
    const res = await axiosInstance.get(`api/get-all-phim`);
    return res;
}
export const getTop10Phim = async () => {
    const res = await axiosInstance.get(`api/get-top-10-phim`);
    return res;
}
export const updateUser = async (tennguoidung, avatar, id) => {
    const data = { tennguoidung, avatar, id }
    const res = await axiosInstance.post(`api/update-user`, data);
    return res;
}
export const updatePasswordUser = async (matkhau, id) => {
    const data = { matkhau, id }
    const res = await axiosInstance.get(`api/update-password-user`, data);
    return res;
}
export const getOnePhimById = async (idPhim, idNguoiDung) => {
    const res = await axiosInstance.get(`api/get-one-phim-by-id/${idPhim}/${idNguoiDung}`);
    return res;
}
export const addLuotXem = async (idnguoidung, idtap) => {
    const data = { idnguoidung, idtap }
    const res = await axiosInstance.post(`api/add-luot-xem`, data);
    return res;
}
export const addDanhGia = async (idnguoidung, idphim, sosao) => {
    const data = { idnguoidung, idphim, sosao }
    const res = await axiosInstance.post(`api/add-danh-gia`, data);
    return res;
}
export const addTheoDoi = async (idnguoidung, idphim) => {
    const data = { idnguoidung, idphim }
    const res = await axiosInstance.post(`api/add-theo-doi`, data);
    return res;
}
export const kiemTraTheoDoi = async (idnguoidung, idphim) => {
    const data = { idnguoidung, idphim }
    const res = await axiosInstance.post(`api/kiem-tra-theo-doi`, data);
    return res;
}
export const deleteTheoDoi = async (idnguoidung, idphim) => {
    const data = { idnguoidung, idphim }
    const res = await axiosInstance.post(`api/delete-theo-doi`, data);
    return res;
}
export const addBinhLuan = async (idnguoidung, idphim, noidung) => {
    const data = { idnguoidung, idphim, noidung }
    const res = await axiosInstance.post(`api/add-binh-luan`, data);
    return res;
}
export const getListBinhLuanByIdPhim = async (id) => {
    const res = await axiosInstance.get(`api/get-list-binh-luan-theo-id-phim/${id}`);
    return res;
}
export const getListLichSuTheoIdNguoiDung = async (id) => {
    const res = await axiosInstance.get(`api/get-list-lich-su-theo-id-nguoi-dung/${id}`);
    return res;
}
export const addLichSu = async (idnguoidung, idphim, idtap) => {
    const data = { idnguoidung, idphim, idtap }
    const res = await axiosInstance.post(`api/add-lich-su`, data);
    return res;
}
export const deleteLichSu = async (idnguoidung, idphim) => {
    const data = { idnguoidung, idphim }
    const res = await axiosInstance.post(`api/delete-lich-su`, data);
    return res;
}
export const getOneTapById = async (idTap, idPhim, idNguoiDung) => {
    const res = await axiosInstance.get(`api/get-one-tap-by-id/${idTap}/${idPhim}/${idNguoiDung}`);
    return res;
}
export const getPhimTheoLoai = async (qrMidle) => {
    const data = { qrMidle }
    const res = await axiosInstance.post(`api/list-phim-theo-loai`, data);
    return res;
}

