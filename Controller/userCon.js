import User from "../model/User.js";

export const updateUser = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { username: req.body.username, email: req.body.email, password: hash },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user.isAdmin == true) {
    return next(createError(401, "Can not đelete this user"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been delete.");
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (err) {
    // res.status(500).json(error);
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmins: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};
