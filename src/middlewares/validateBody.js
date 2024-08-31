export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  next();
};
