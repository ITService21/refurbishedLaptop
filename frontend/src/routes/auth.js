import { api } from "../Components/common/apiWrapper";

export const loginRegisterAPI = async (url, obj) => {
 try{
    const response = await api?.post(url, obj);
    return response;
 }
 catch(error){
    throw error;
 }
};
