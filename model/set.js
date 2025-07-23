const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Set = sequelize.define("Set", {
  id: { 
    type: DataTypes.BIGINT.UNSIGNED, 
    autoIncrement: true, 
    primaryKey: true 
},
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  help_at: { 
    type: DataTypes.DATE, 
    allowNull: true 
},
  duration: { 
    type: DataTypes.INTEGER, 
    allowNull: true 
},
  question: { 
    type: DataTypes.JSON, 
    allowNull: true 
},
},{
    tableName: "sets",
    timestamps: false
});

module.exports = Set;