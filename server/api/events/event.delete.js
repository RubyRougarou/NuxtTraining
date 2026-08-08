import { connectDB } from "#server/utils/db.js";
import UserEvent from "#server/utils/models/user-event.js";

export default defineEventHandler(async (event) => {
  try {
    await connectDB();
    const session = await checkUserSession(event);

    const body = await readBody(event);
    console.log(body);
    // const eventId = body.id;
    // const action = body.action;
  } catch (error) {
    console.error(error);
  }
});
