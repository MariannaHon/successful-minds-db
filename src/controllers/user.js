import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { env } from '../utils/env.js';
import { getUser, patchUser, patchAvatar } from '../services/user.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const patchAvatarController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const img = req.file;

  let avatarUrl;

  if (img) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      avatarUrl = await saveFileToCloudinary(img);
    } else {
      avatarUrl = await saveFileToUploadDir(img);
    }
  }

  const result = await patchAvatar(userId, { avatarUrl });

  if (!result) {
    return next(createHttpError(404, 'User not found'));
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully patched a user avatar!',
    data: result,
  });
};

export const getUserController = async (req, res, next) => {
  const { _id: userId } = req.user;

  const user = await getUser(userId);

  if (!user) {
    return next(createHttpError(404, 'User not found'));
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully found user information!',
    data: user,
  });
};


export const patchUserController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { name, email, password, gender, waterRate } = req.body;

  // let updatedData = { name, email, gender, waterRate };

  let updatedData = {};

  if (name) updatedData.name =  name;

  if (email) updatedData.email =  email;

  if (gender) updatedData.gender =  gender;

  if (waterRate) updatedData.waterRate =  waterRate;

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updatedData.password = hashedPassword;
  }

  const result = await patchUser(userId, updatedData);

  if (!result) {
    return next(createHttpError(404, 'User not found'));
  }

  res.status(200).send({
    status: 200,
    message: 'Successfully updated user information!',
    data: result,
  });
};
