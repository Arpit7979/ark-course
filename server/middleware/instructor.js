export const isInstructor = async (req, res, next) => {
  if (req.user.role !== "instructor")
    return res.json({
      success: false,
      message: "Access denied: Instructor only",
    });

  next();
};
