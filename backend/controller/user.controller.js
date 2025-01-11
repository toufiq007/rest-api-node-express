import prisma from "../db/db.config.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // find if email is already present in the db or
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (findUser) {
      return res.status(409).json({ message: "email already exists.." });
    }

    // create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    if (newUser) {
      return res
        .status(201)
        .json({ message: "user creaeted successfull", data: newUser });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const userController = {
  createUser,
};
