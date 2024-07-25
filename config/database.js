const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.on("connected", () => {
  console.info(`Connected to MongoDB ${mongoose.connection.name}.`);
});
