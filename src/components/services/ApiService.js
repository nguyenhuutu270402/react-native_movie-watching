import axiosInstance from "../../utilities/axios";

export const getAllPhim = async () => {
    const res = await axiosInstance.get("api/get-all-phim");
    return res;
}