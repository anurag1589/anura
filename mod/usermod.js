const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({

  firstName: { type: String, required: true },
  lastName: String,
   email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
          v
        );
      },
      message: "Invaild Email-Address",
    },
    required: [true],
  },
  password: { type: String, minLength: 6, required: true },
  token: String,
});

exports.User = mongoose.model("User", userSchema);
