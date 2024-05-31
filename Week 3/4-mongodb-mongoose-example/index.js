const mongoose = require("mongoose");

mongoose.connect("CONNECTION_URL");

/* 
    Basic format called model in which our data will be stored

    * structure: mongoose.model(collectionName or database name, format as object)
*/
const User = mongoose.model("Users", { name: String, password: String });

const user = new User({
  name: "Test User",
  password: "Mai nai bataunga",
});

// finding existing user with same name exists or not
async function insert() {
  const existingUser = await User.findOne({ name: "Test User" }); // await is necessary else it will always return a query object

  if (!existingUser) {
    // user.save();
    user.save().then(function () {
      console.log("Done");
    });
  } else {
    console.log("user found");
  }
}

insert();
