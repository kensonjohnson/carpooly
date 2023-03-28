import User from "../models/User.js";
import Carpool from "../models/Carpool.js";

export async function createCarpool(req, res, next) {
  const { name, description } = req.body;
  const errors = [];
  if (!name || !description) {
    errors.push({ msg: " Please fill in all fields." });
  }
  if (errors.length) {
    res.render("createCarpools", { errors, name, description });
  }
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (user.carpoolsOwned.length >= 5) {
      errors.push({ message: "You already have 5 carpools!" });
      res.redirect("/dashboard");
    }
    const newCarpool = new Carpool({ owner: user._id, name, description });
    await newCarpool.save();
    user.carpoolsOwned.push(newCarpool._id);
    await user.save();
    res.redirect("/dashboard/carpools");
  } catch (err) {
    next(err);
  }
}
