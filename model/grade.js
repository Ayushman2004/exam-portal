const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Grade = sequelize.define("Grade", {
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
  for_class: { 
    type: DataTypes.STRING, 
    allowNull: true 
},
  exam_name: { 
    type: DataTypes.STRING, 
    allowNull: true 
},
  marks: { 
    type: DataTypes.INTEGER, 
    allowNull: true 
},
},{
    tableName: "grade",
    timestamps: false
});

module.exports = Grade;