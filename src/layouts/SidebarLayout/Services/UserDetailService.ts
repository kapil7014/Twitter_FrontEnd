import http from "../../../services/http-common";

const getTwitterAuthUser = (token: any) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return http.get<any>('/GetTwitterAuthUser', config);
};

const UserDetailService = {
    getTwitterAuthUser
};

export default UserDetailService;