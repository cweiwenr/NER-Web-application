const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// just store text identified (assumption)
// or want the category , i.e. spcification..., and key plus text identified.
const entitySchema = new Schema({
  category: String,
  textIdentified: [String],
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now()
  },
  updatedAt: {
    // this currently does not updatein mongodb
    type: Date,
    default: () => Date.now()
  }
});

const Entity = mongoose.model("Entity", entitySchema);

module.exports = Entity;
