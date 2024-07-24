const userModel = require("../models/user.model");

class AuthManager {

    identifyUser (email, password) {
        return userModel.login(email, password);
    }
}

module.exports = AuthManager;