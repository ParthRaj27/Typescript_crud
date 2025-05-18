// src/models/Item.ts
import mongoose, { Schema, Document } from "mongoose";

interface IItem extends Document {
  name: string;
}

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
});

const Item = mongoose.model<IItem>("Item", ItemSchema);
export default Item;


// const item = new Item({ name: "Sample" });
// console.log(item.name); // No type checking here
// interface IItem {
//   name: string;
// }
// const item: IItem = new Item({ name: "Sample" });
// console.log(item.name); // TypeScript knows `name` is string
  