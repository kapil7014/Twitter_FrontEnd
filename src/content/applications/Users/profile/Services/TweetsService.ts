import http from "../../../../../services/http-common";

const getReverseTimelineTweets = (userId: any, token: any) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return http.get<any>(`/GetReverseTimelineTweets?userId=${userId}`, config);
};

const TweetsService = {
    getReverseTimelineTweets
};

export default TweetsService;