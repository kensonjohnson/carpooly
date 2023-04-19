import { Router } from "express";
const router = Router();
import { ensureAuthenticated } from "../config/auth.js";
import { createCarpool } from "../controllers/CarpoolController.js";
import Carpool from "../models/Carpool.js";
import User from "../models/User.js";
import { uuidv4 } from "uuid";

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
    const data = {
      carpoolsOwned: await carpoolsOwned,
      carpoolsJoined: await carpoolsJoined,
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

// Route to upload profile pic
router.post(
  "/profile/upload-picture",
  ensureAuthenticated,
  async (req, res, next) => {
    const user = await User.findById(req.user._id);
  }
);

export default router;
