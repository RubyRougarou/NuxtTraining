import UserEvent from "#server/utils/models/user-event.js";
import { connectDB } from "#server/utils/db.js";
import { checkUserSession } from "#server/utils/index.js";
import { EventSchema } from "#server/utils/schemas.js";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    const body = await readBody(event);
    const session = await checkUserSession(event);

    //validation here
    try {
      await EventSchema.validate(body, { abortEarly: false });
    } catch (validationError) {
      throw createError({
        statusCode: 400,
        statusMessage: "Validation failed",
        data: validationError.errors,
      });
    }

    // create new event
    const userEvent = new UserEvent({
      ...body,
      owner: session.id,
    });

    await userEvent.save();
    return { status: 201, message: "Event created successfully" };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || error.message,
      data: error.data || null,
    });
  }
});
