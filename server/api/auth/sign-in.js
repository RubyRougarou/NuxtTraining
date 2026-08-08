import User from "#server/utils/models/user.js";
import { connectDB } from "../../utils/db.js";
import { SignUpSchema } from "#server/utils/schemas.js";
import bcrypt from "bcryptjs";

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
    const user = await User.findOne({ email });
    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid credentials!",
      });
    }

    // Checking password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid credentials",
      });
    }

    // Create new session for user
    await setUserSession(event, {
      user: {
        id: user._id.toString(),
        email: user.email,
      },
    });

    return {
      success: true,
      user: {
        id: user._id,
        email: user.email,
      },
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
      data: error.data || null,
    });
  }
});
