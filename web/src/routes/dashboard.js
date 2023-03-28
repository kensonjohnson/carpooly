import { response, Router } from "express";
const router = Router();
import { ensureAuthenticated } from "../config/auth.js";
import { createCarpool } from "../controllers/CarpoolController.js";
import Carpool from "../models/Carpool.js";
import User from "../models/User.js";

router.get("/", (req, res) => {
  res.render("dashboard");
});

router.get("/carpools", ensureAuthenticated, async (req, res) => {
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
    console.log("Data: ", data);
    res.render("carpools", {
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
      owner.carpoolsOwned = owner.carpoolsOwned.filter((carpoolID) => {
        console.log(carpoolID, carpool._id);
        return carpoolID.toString() !== carpool._id.toString();
      });
      await owner.save();
      const members = await Promise.all(
        carpool.members.map((memberID) => {
          return User.findById(memberID);
        })
      );
      await Promise.all(
        members.map(async (member) => {
          member.carpoolsJoined = member.carpoolsJoined.filter((carpoolID) => {
            return carpoolID.toString() !== carpool._id.toString();
          });
          return member.save();
        })
      );
      await Carpool.deleteOne({ _id: carpool._id });
      res.redirect("/dashboard");
    } catch (error) {
      next(error);
    }
  }
);

export default router;
