import Carpool from "../models/Carpool.js";
import User from "../models/User.js";

export async function getDashboard(req, res) {
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
}
