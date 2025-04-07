import { api } from "../../../api/axiosInstance";
import { UserRegistrationData } from "../types/RegistrationRequestType";

export const register = async (userData: UserRegistrationData) => {
    try{
        const response = await api.post(`/auth/register-user`, userData);
        return {
            data: response.data,
            loading: false,
            error: null
        };
    }catch(e){
        console.error(e);
        throw e;
    }
}