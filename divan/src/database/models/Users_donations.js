module.exports = (sequelize, dataTypes) => {
  const alias = "Users_Donations";
  const columns = {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      autoIncrement: true,
    },
    id_user: {
      type: dataTypes.INTEGER,
      references: { models: "Users", key: "id" },
    },
    id_donation: {
      type: dataTypes.INTEGER,
      references: { models: "Donations", key: "id" },
    },
  };
  const config = {
    tablename: "Users_Donations",
    timestamps: false,
  };
  const UsersDonations = sequelize.define(alias, columns, config);
  UsersDonations.associate = (models) => {
    UsersDonations.belongsTo(models.Users, {
      foreignKey: "id_user",
      onDelete: "cascade",
    });
    UsersDonations.belongsTo(models.Donations, {
      foreignKey: "id_donation",
    });
  };
  return UsersDonations;
};
