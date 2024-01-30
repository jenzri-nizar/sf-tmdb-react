
class AuthService {
    login(data) {
        return API.post("/login_check",data);
    }

}


export default new AuthService();
