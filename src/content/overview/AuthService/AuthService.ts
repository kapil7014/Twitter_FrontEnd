import http from "../../../services/http-common";
import IAuthModel from "./IAuthModel";

const authTwitterLogin = () => {
    return http.get<IAuthModel>('/TwitterLoginUrl');
};

const getTwitterAccessToken = (code: any) => {
    return http.get<IAuthModel>('/GetTwitterAccessToken?code=' + code);
};

const AuthService = {
    authTwitterLogin,
    getTwitterAccessToken
};

export default AuthService;