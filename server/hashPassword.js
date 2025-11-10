// hashPassword.js
import bcrypt from 'bcrypt';

const plaintextPassword = process.argv[2]; // take password from command line argument

if (!plaintextPassword) {
  console.log("Usage: node hashPassword.js <password>");
  process.exit(1);
}

const saltRounds = 10; // standard number of salt rounds

bcrypt.hash(plaintextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
    process.exit(1);
  }
  console.log("Hashed password:", hash);
});
