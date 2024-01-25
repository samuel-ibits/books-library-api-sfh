// models/user.js
import mongoose from "mongoose";
mongoose.set('useCreateIndex', true); // Optional, to suppress the deprecation warning

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
