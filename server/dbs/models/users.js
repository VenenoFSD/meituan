import mongoose from 'mongoose'

let userSchema = new mongoose.Schema({
  username: {
    type: 'String',
    unique: true,  //  唯一
    require: true
  },
  password: {
    type: 'String',
    require: true
  },
  email: {
    type: 'String',
    require: true
  }
});

export default mongoose.model('User', userSchema);
