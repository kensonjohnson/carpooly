import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";

export function getProfilePage(req, res) {
  const { name, profilePicURI } = req.user;
  if (profilePicURI) {
    const data = { name, profilePicURI };
    return res.render("profile", { data });
  }
  res.render("profile", {
    data: { name: "Default", profilePicURI: req.user.profilePicURI },
  });
}

export async function uploadProfilePicture(req, res, next) {
  const user = await User.findById(req.user._id);
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: "us-east-2",
  });

  // In rare cases, req.files can be null
  if (req.files) {
    const fileContent = Buffer.from(req.files.profilePic.data, "binary");

    const uniqueName = uuidv4() + req.files.profilePic.name;

    const params = {
      Bucket: "carpooly",
      Key: uniqueName, // File name you want to save as in S3
      Body: fileContent, // The file buffer
    };

    s3.upload(params, (err) => {
      if (err) {
        next(err);
      }
    });

    const cloudfrontURI = process.env.CLOUDFRONT_URI + uniqueName;

    user.profilePicURI = cloudfrontURI;
    await user.save();
    req.user.profilePicURI = cloudfrontURI;

    res.render("profile", {
      data: { name: req.user.name, profilePicURI: cloudfrontURI },
    });
  } else {
    res.render("profile", {
      data: { name: req.user.name, profilePicURI: req.user.profilePicURI },
    });
  }
}
