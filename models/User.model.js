const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({

  name: String,

  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  description: String,

  image: String,
  
  role: {
    type:String,
  enum: ['GUEST','USER', 'HOST','ADMIN'],
  default:'GUEST'
  }
} ,

{ timestamps: true }
)

const User = model("User", userSchema);

module.exports = User;
