import bcrypt from "bcryptjs";
import User from "../../utils/models/user.js";
import { connectDB } from "../../utils/db.js";
import { SignUpSchema } from "#server/utils/schemas.js";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();

    const body = await readBody(event);
    const { email, password } = body;

    // Validating with yup
    try {
      await SignUpSchema.validate(body, { abortEarly: false });
    } catch (validationError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation failed",
        data: {
          errorsArray: validationError.errors,
        },
      });
    }

    // Check if user already exists
    const userExisting = await User.findOne({ email });
    if (userExisting) {
      throw createError({
        statusCode: 400,
        statusMessage: "User Already exists!",
      });
    }

    // Hash password using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const user = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Create new session for new user
    await setUserSession(event, {
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
      data: error.data || null,
    });

    return false;
  }
});
