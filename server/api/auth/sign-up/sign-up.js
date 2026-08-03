export default defineEventHandler(async (event) => {
  const connectToDB = async () => {
    await connectDB();
  };

  await connectToDB();
});
