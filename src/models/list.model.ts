import mongoose from "mongoose";

const listItem = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

const listSchema = new mongoose.Schema({
  listName: { type: String, required: true },
  listItems: [listItem],
});

const List = mongoose.model("List", listSchema);

module.exports = List;
