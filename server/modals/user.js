const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  interests: [String],
  avatar: String,
  role: { type: String, default: "user" }
}, { timestamps: true });
