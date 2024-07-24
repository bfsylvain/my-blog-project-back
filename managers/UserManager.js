const AbstractManager = require("../managers/AbstractManager");
const userModel = require("../models/user.model");

class UserManager extends AbstractManager {
    constructor() {
        super({collection: userModel})
    }

    updateUserPicture(id, picturePath) {
        return userModel.findByIdAndUpdate(
            id,
            {$set: picturePath},
            {new: true, upsert: true, setDefaultOnInsert: true}
        )
    }
}

module.exports = UserManager;