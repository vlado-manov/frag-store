import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "vladimir.manov.bg@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    image: "https://ace.jeka.by/assets/images/avatars/profile-pic.jpg",
    isAdmin: true,
  },
  {
    name: "Tanitka",
    email: "tanitka@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    phone: "+359 888 888 888",
    isAdmin: false,
  },
  {
    name: "Manova",
    email: "manova@abv.bg",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];
export default users;
