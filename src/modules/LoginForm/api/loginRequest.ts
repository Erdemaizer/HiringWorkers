import { api } from "../../../api/axiosInstance";
import { UserLoginData } from "../types/LoginRequestType";

export const login = async (userData: UserLoginData) => {
    const response = await api.post(`/auth/login`, userData);
    return response.data;
}