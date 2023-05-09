import { Router } from "express";
const router = Router();
import { ensureAuthenticated } from "../config/auth.js";
import { createCarpool } from "../controllers/CarpoolController.js";
import Carpool from "../models/Carpool.js";
import User from "../models/User.js";
import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";

router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const carpoolsOwned = Promise.all(
      user.carpoolsOwned.map(async (carpoolID) => {
        return Carpool.findById(carpoolID, {});
      })
    );
    const carpoolsJoined = Promise.all(
      user.carpoolsJoined.map((carpoolID) => {
        return Carpool.findById(carpoolID, {});
      })
    );

    const profilePicURI = user.profilePicURI;

    const data = {
      carpoolsOwned: await carpoolsOwned,
      carpoolsJoined: await carpoolsJoined,
      profilePicURI,
    };
    res.render("dashboard", {
      data,
    });
  } catch (error) {
    // TODO create Error page
    // res.render("error", {error})
    next(error);
  }
});

router.get("/carpools/create", ensureAuthenticated, (req, res) => {
  res.render("createCarpools");
});

router.post("/carpools/create", ensureAuthenticated, createCarpool);

router.post(
  "/carpools/:id/delete",
  ensureAuthenticated,
  async (req, res, next) => {
    try {
      const carpool = await Carpool.findById(req.params.id);
      const owner = await User.findById(carpool.owner);

      // Filter out the carpool from the Owner's list
      owner.carpoolsOwned = owner.carpoolsOwned.filter((carpoolID) => {
        return carpoolID.toString() !== carpool._id.toString();
      });
      // Save the updated list
      await owner.save();

      // Find all members of the carpool
      const members = await Promise.all(
        carpool.members.map((memberID) => {
          return User.findById(memberID);
        })
      );
      // Filter the carpool out of each member's joined carpools list
      await Promise.all(
        members.map(async (member) => {
          member.carpoolsJoined = member.carpoolsJoined.filter((carpoolID) => {
            return carpoolID.toString() !== carpool._id.toString();
          });
          return member.save();
        })
      );

      // After everyone's data has been updated, we can remove the carpool.
      await Carpool.deleteOne({ _id: carpool._id });
      res.redirect("/dashboard");
    } catch (error) {
      // TODO: Added error page
      next(error);
    }
  }
);

// Route to edit profile page
router.get("/profile", ensureAuthenticated, (req, res) => {
  const { name, profilePicURI } = req.user;
  if (profilePicURI) {
    const data = { name, profilePicURI };
    return res.render("profile", { data });
  }
  res.render("profile", {
    data: { name: "Default", profilePicURI: req.user.profilePicURI },
  });
});

// Route to upload profile pic
router.post(
  "/profile/upload-picture",
  ensureAuthenticated,
  async (req, res, next) => {
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
);

export default router;
