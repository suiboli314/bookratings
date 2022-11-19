import axios from "axios"; // HTTP Client

function getuserallreview(userName) {
    return axios.post(`/api/getuserallreview`, {
        userName,
    });
}

const UserService = {
    getuserallreview
};

export default UserService;
