const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Admin = sequelize.define("Admin", {
  id: { 
    type: DataTypes.BIGINT.UNSIGNED, 
    autoIncrement: true, 
    primaryKey: true 
},
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
},
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  remember_token: { 
    type: DataTypes.STRING(100), 
    allowNull: true 
},
  created_at: { 
    type: DataTypes.DATE, 
    allowNull: true 
},
  phone_number: { 
    type: DataTypes.STRING, 
    allowNull: true 
},
  gender: { 
    type: DataTypes.STRING, 
    allowNull: true 
},
},{
    tableName: "admin",
    timestamps: false
});

module.exports = Admin;