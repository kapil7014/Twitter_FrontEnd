import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        "Content-type": "application/json",
        "client_key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijoic3R1ZmYiLCJpYXQiOjE2Njk3MTc2NjF9.UOz13r_aheTYWZsZO5WJyxg5NKz4QAzwPKYgFDNdi6o"
    }
});