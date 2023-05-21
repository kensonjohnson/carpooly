import User from "../models/User.js";
import Carpool from "../models/Carpool.js";

// GET route /carpools
export async function getCarpoolsPage(req, res) {
  try {
    const carpoolsOwned = Promise.all(
      req.user.carpoolsOwned.map(async (carpoolID) => {
        return Carpool.findById(carpoolID, {});
      })
    );
    const carpoolsJoined = Promise.all(
      req.user.carpoolsJoined.map((carpoolID) => {
        return Carpool.findById(carpoolID, {});
      })
    );
    const profilePicURI = req.user.profilePicURI;

    const data = {
      carpoolsOwned: await carpoolsOwned,
      carpoolsJoined: await carpoolsJoined,
      profilePicURI,
    };
    res.render("carpools", {
      data,
    });
  } catch (error) {
    //TODO: convert to res.render("error")
    console.log(error);
  }
}

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
    res.redirect("/dashboard/carpools");
  } catch (error) {
    // TODO: Added error page
    next(error);
  }
}

export function getSearchPage(req, res) {
  res.render("findCarpools");
}

export async function getSearchResults(req, res) {
  const searchString = req.body.searchbar;
  console.log("Search String: ", searchString);
  try {
    if (searchString !== null && typeof searchString !== "undefined") {
      const results = await Carpool.find({
        name: { $regex: searchString, $options: "i" },
      });
      console.log("Search Results: ", results);

      // const data = {
      //   carpoolsOwned: req.user.carpoolsOwned,
      //   carpoolsJoined: req.user.carpoolsJoined,
      //   profilePicURI: req.user.profilePicURI,
      //   results,
      // };
      res.render("findCarpools", { results });
    }
  } catch (error) {
    console.log(error);
  }
}
