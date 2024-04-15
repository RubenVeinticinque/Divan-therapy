module.exports = (sequelize, dataTypes) => {
  const alias = "Moods_users";
  const columns = {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      autoIncrement: true,
    },
    id_mood: {
      type: dataTypes.INTEGER,
      references: { models: "Moods", key: "id" },
    },
    id_user: {
      type: dataTypes.INTEGER,
      references: { models: "Users", key: "id" },
    },
  };
  const config = {
    tablename: "Moods_users",
    timestamps: false,
  };
  const MoodsUsers = sequelize.define(alias, columns, config);
  MoodsUsers.associate = (models) => {
    MoodsUsers.belongsTo(models.Moods, {
      foreignKey: "id_mood",
    });
    MoodsUsers.belongsTo(models.Users, {
      foreignKey: "id_user",
      onDelete: "cascade",
    });
  };
  return MoodsUsers;
};
