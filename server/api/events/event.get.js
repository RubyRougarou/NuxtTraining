import { connectDB } from "#server/utils/db.js";
import UserEvent from "#server/utils/models/user-event.js";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();

    const session = await checkUserSession(event);

    const events = await UserEvent.find({
      owner: session.id,
    })
      .sort({ createdAt: -1 })
      .populate("owner");
    return events;
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: error.message || "Internal server error",
    });
  }
});
