require("dotenv").config();

const app = require("./app");
const connectDB = require("./src/config/dbConfig");

// Connect DB
connectDB();

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
module.exports = app;