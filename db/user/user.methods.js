async function updateUser(
  user = {
    firstName,
    lastName,
    email,
    password,
    timeSlots,
    profilePic,
  }
) {
  console.log(this, "This is here");
  await this.create(user, function (err, document) {
    if (err) console.log(err.message);
    return document;
  });
}

module.exports = { updateUser };
