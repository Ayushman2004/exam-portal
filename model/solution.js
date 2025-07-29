const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Solution = sequelize.define("Solution", {
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
  solutions: { 
    type: DataTypes.JSON, 
    allowNull: true 
},
},{
    tableName: "solutions",
    timestamps: false
});

module.exports = Solution;
