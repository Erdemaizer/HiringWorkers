    import axios, { AxiosResponse } from "axios";
    import { ErrorsModel, MessageErrorModel } from "./errorModels";

    export const getErrors = async (error: unknown): Promise<string[] | undefined> => {
        let errorMessages: string[] | undefined;

        if(axios.isAxiosError(error)){
            if(error.response){
                errorMessages = await getResponseErrors(error.response);
            } 
            else if(error.request){
                errorMessages = getRequestErrors(error.code, error.message);
            } 
            // else{
            //     errorMessages = [];
            // }
        } 
        // else{
        //     errorMessages = handleNotAxiosError();
        // }

        return errorMessages;
    }

    const getResponseErrors = async (response: AxiosResponse): Promise<string[] | undefined> => {
        const errorMessages = await tryGetErrorFromData(response);
        if(errorMessages){
            return errorMessages;
        }
    }

    const tryGetErrorFromData = async (response: AxiosResponse) : Promise<string[] | undefined> => {
        if(!response.data){
            return undefined;
        }

        const errorMessages: string[] = [];

        const errors = (response.data as ErrorsModel).errors;
        if(errors){
            for(const errorKey in errors){
                errorMessages.push(errors[errorKey]);
            }
            return errorMessages;
        }

        const errorMessage = (response.data as MessageErrorModel).Message;
        if(errorMessage){
            errorMessages.push(errorMessage);
            
            return errorMessages;
        }

        return undefined;
    }

    const getRequestErrors = (code?: string, message?: string) => {
        if(code){
            if(code === 'ECONNABORTED'){
                return ['Превышено время ожидания ответа от сервера'];
            }

            if (message?.includes('Network Error')) {
                return ['Ошибка сети. Попробуйте позже'];
            }
        
            if (message?.includes('CORS')) {
                return ['Запрос заблокирован из-за CORS'];
            }

            return ['Сервер не ответил на запрос'];
        }
    }