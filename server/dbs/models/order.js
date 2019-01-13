import mongoose from 'mongoose'

let orderSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  id: {
    type: String,
    require: true
  },
  status: {
    type: Number,
    require: true
  },
  user: {
    type: String,
    require: true
  },
  time: {
    type: String,
    require: true
  },
  total: {
    type: Number,
    require: true
  },
  img: {
    type: String,
    require: true
  },

});

export default mongoose.model('Order', orderSchema);
