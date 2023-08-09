var express = require("express");
var router = express.Router();
var Profile = require("../models/profile");
const { v4: UUID } = require("uuid");
const ADMIN_USERS = {
  email: "abhimanyututeja@gmail.com",
  password: "Aviral@1991",
};

const isAdminLoggedIn = (req, res, next) => {
  if (req.session.user && req.session.user.email === ADMIN_USERS.email) {
    next();
  } else {
    res.redirect("/admin/login");
  }
};

/* GET users listing. */
router.get("/", isAdminLoggedIn, function (req, res, next) {
  res.render("admin/index", {
    layout: "admin/layout",
  });
});

router.get("/login", function (req, res) {
  res.render("admin/login", {
    layout: false,
  });
});

router.post("/login", function (req, res) {
  if (
    req.body.email === ADMIN_USERS.email &&
    req.body.password === ADMIN_USERS.password
  ) {
    req.session.user = ADMIN_USERS;
    res.redirect("/admin/");
  } else {
    res.redirect("/admin/login");
  }
});

router.get("/logout", isAdminLoggedIn, function (req, res) {
  req.session.destroy();
  res.redirect("/admin/login");
});

router.get("/newProfile", isAdminLoggedIn, async function (req, res) {
  try {
    const uniqueId = UUID();

    console.log(uniqueId);

    const profile = await Profile.create({
      uuid: uniqueId,
    });

    console.log(profile);

    return res.render("admin/newProfile", {
      layout: "admin/layout",
      profileLink: "/profile/" + profile.uuid,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
