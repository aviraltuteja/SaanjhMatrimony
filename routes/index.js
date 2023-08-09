var express = require("express");
var router = express.Router();
const Profile = require("../models/profile");

/* GET home page. */
router.get("/profile/:uuid", async function (req, res) {
  const { uuid } = req.params;

  const profile = await Profile.findOne({
    where: { uuid: uuid },
  });

  console.log(profile);

  if (!profile) {
    return res.redirect("/404");
  }

  res.render("profile", { profile: profile, layout: false });
});

router.post("/profile/:uuid/save", async function (req, res) {
  const { uuid } = req.params;

  const profile = await Profile.findOne({
    where: { uuid: uuid },
  });

  console.log(profile);

  if (!profile) {
    return res.redirect("/404");
  }

  if (profile.submitted) {
    return res.redirect(`/profile/${profile.uuid}`);
  }

  profile.fullname = req.body.fullname;
  profile.fathername = req.body.fathername;
  profile.mothername = req.body.mothername;
  profile.age = req.body.age;
  profile.phoneNumber = req.body.phoneNumber;

  await profile.save();

  res.redirect(`/profile/${profile.uuid}`);
});

router.post("/profile/:uuid/submit", async function (req, res) {
  const { uuid } = req.params;

  const profile = await Profile.findOne({
    where: { uuid: uuid },
  });

  console.log(profile);

  if (!profile) {
    return res.redirect("/404");
  }

  if (profile.submitted) {
    return res.redirect(`/profile/${profile.uuid}`);
  }

  profile.fullname = req.body.fullname;
  profile.fathername = req.body.fathername;
  profile.mothername = req.body.mothername;
  profile.age = req.body.age;
  profile.phoneNumber = req.body.phoneNumber;
  profile.submitted = true;
  await profile.save();

  res.redirect(`/profile/${profile.uuid}`);
});

module.exports = router;
