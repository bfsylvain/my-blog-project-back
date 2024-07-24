const fs = require("fs");
const path = require("path");
const userManagers = require("../managers/UserManager");

const UserManager = new userManagers();

const uploadProfile = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    const validMimeTypes = ["image/jpg", "image/jpeg", "image/png"];

    if (!validMimeTypes.includes(req.file.mimetype)) {
      throw new Error("invalid file type");
    }

    if (req.file.size > 500000) throw Error("file oversize");

    const fileName = `${req.body.name}.jpg`;
    const filePath = path.join(
      __dirname,
      "../public/uploads/profile",
      fileName
    );

    fs.writeFile(filePath, req.file.buffer, (err) => {
      if (err) {
        throw new Error("Error writing file");
      }

      res.status(200).send({ message: "file upload success", fileName });
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
  const userId = req.body.userId;
  const picturePath = `/uploads/profile/${req.body.name}.jpg`;
  try {
    const updatedUser = await UserManager.updateUserPicture(
      userId,
      picturePath
    );
    if (updatedUser) {
      res.status(200).send(updatedUser);
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  uploadProfile,
};
