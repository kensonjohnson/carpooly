import User from "../models/User.js";
import Carpool from "../models/Carpool.js";

// GET route /carpools/create
export function getCreateCarpoolPage(req, res) {
  res.render("createCarpools");
}

// POST route /carpools/create
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

// POST route /carpools/:id/delete
export async function deleteCarpoolById(req, res) {
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

