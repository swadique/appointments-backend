const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MongoClient = require("../db/MongoClient");
const moment = require("moment");
// MongoClient.connect();

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: "Person" },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: "Person" }],
});

const Story = mongoose.model("Story", storySchema);
const Person = mongoose.model("Person", personSchema);

async function test() {
  //   const author = new Person({
  //     _id: new mongoose.Types.ObjectId(),
  //     name: "Ian Fleming",
  //     age: 50,
  //   });

  Story.create({
    title: "Casino",
    author: "6029ec7d011314cb500bd2cf", // assign the _id from the person
  });

  const result = await Story.findOne({ title: "Casino" }).populate("author");
  console.log(result);
}

// test();
function timeTesting(date) {
  const date1 = moment(date).startOf("day").toISOString();
  console.log(moment(date).endOf("day").toISOString(), date1);
}
timeTesting('2021-02-15T13:52:23.023Z');
