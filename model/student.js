const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Student = sequelize.define("Student", {
  id: { 
    type: DataTypes.BIGINT.UNSIGNED, 
    autoIncrement: true, 
    primaryKey: true 
},
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  rollno: { 
    type: DataTypes.INTEGER, 
    allowNull: true 
},
  classes: { 
    type: DataTypes.STRING, 
    allowNull: true 
},
  email: { 
    type: DataTypes.STRING, 
    allowNull: true 
},
  password: { 
    type: DataTypes.STRING, 
    allowNull: true 
},
  DOB: { 
    type: DataTypes.DATE, 
    allowNull: true 
},
  age: { 
    type: DataTypes.INTEGER, 
    allowNull: true 
},
  gender: { 
    type: DataTypes.STRING, 
    allowNull: true 
},
},{
    tableName: "students",
    timestamps: false
});

module.exports = Student;