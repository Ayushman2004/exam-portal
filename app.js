const express = require("express")
const sequelize = require("./config/db")
const adminRouter = require("./routes/admin_router")
const userRouter = require("./routes/user_router")
const studentRouter = require("./routes/student_router")
const setRouter = require("./routes/set_router")
const solutionRouter = require("./routes/solution_router")
require("dotenv").config()


const app = express();
app.use(express.json());


// Connect to MySQL
sequelize.sync()
    .then(() => console.log("MySQL connected"))
    .catch(console.error);


app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)
app.use("/api/student", studentRouter)
app.use("/api/set", setRouter)
app.use("/api/solution", solutionRouter)


// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));