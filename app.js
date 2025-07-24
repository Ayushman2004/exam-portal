const express = require("express");
const sequelize = require("./config/db");
const adminRouter = require("./routes/admin_router");
const userRouter = require("./routes/user_router");
const studentRouter = require("./routes/student_router");
require("dotenv").config();


const app = express();
app.use(express.json());


// Connect to MySQL
sequelize.sync()
    .then(() => console.log("MySQL connected"))
    .catch(console.error);


app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.use("/student", studentRouter)


// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));