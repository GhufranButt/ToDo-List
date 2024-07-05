// const db = require("../db");
// const secretkey = "secretkey";
// // const { validation } = require("../jwt");
// // const Users = require("../models/userModels");
// const Users = require("../Models/userModel");
// const bcrypt = require("bcrypt");

// exports.register = (req, res) => {
//   const { username, password_hash } = req.body;

//   // Check if the username already exists in the database
//   Users.findOne({ where: { username: username } })
//     .then((existingUser) => {
//       if (existingUser) {
//         // If the username already exists, return an error response
//         return res.status(400).json({ error: "Username already exists" });
//       } else {
//         // If the username does not exist, proceed with user registration
//         bcrypt
//           .hash(password_hash, 10)
//           .then((hash) => {
//             Users.create({
//               username: username,
//               password_hash: hash,
//             })
//               .then(() => {
//                 res.json("USER REGISTERED");
//               })
//               .catch((err) => {
//                 console.error("Error during user creation:", err);
//                 res.status(400).json({ error: err.message });
//               });
//           })
//           .catch((hashError) => {
//             console.error("Error hashing password:", hashError);
//             res.status(500).json({ error: "Internal server error" });
//           });
//       }
//     })
//     .catch((queryError) => {
//       console.error("Error querying database:", queryError);
//       res.status(500).json({ error: "Internal server error" });
//     });
// };

// // const salt = bcrypt.genSalt(10);
// // const hashedPassword = bcrypt.hash(password, salt);

// exports.login = async (req, res) => {
//   const { username, password_hash } = req.body;
//   const user = await Users.findOne({ where: { username: username } });
//   if (!user) {
//     res.status(400).json({ error: "User not Found" });
//   }

//   const dbPassword = user.password_hash;
//   bcrypt.compare(password_hash, dbPassword).then((match) => {
//     if (!match) {
//       res.status(400).json({ error: "Wrong password" });
//     } else {
//       // Set user ID in session upon successful login
//       //   req.session.userId = user.user_id;
//       res.status(200).json({ Message: "Successfully Login" });
//     }
//   });
// };

// //token ky saath aik aur condition lagana ky token honay ky saath saath user admin hona chahiye api access krnay ky liye
