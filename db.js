const { default: mongoose } = require("mongoose");
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL)

const AnimalSchema = new mongoose.Schema({
    Name: { type: String, required: true }
  });


const Animal = mongoose.model("Animal",AnimalSchema)

module.exports = {Animal}