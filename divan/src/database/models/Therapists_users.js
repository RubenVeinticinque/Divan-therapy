module.exports = (sequelize, dataTypes) => {
  const alias = "Therapists_users";
  const columns = {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      autoIncrement: true,
    },
    id_therapist: {
      type: dataTypes.INTEGER,
      references: { models: "Therapists", key: "id" },
    },
    id_user: {
      type: dataTypes.INTEGER,
      references: { models: "Users", key: "id" },
    },
    quantity: dataTypes.INTEGER,
  };
  const config = {
    tablename: "Therapists_users",
    timestamps: false,
  };

  const TherapistsUsers = sequelize.define(alias, columns, config);
  TherapistsUsers.associate = (models) => {
    TherapistsUsers.belongsTo(models.Therapists, {
      foreignKey: "id_therapist",
      onDelete: "cascade",
    });
    TherapistsUsers.belongsTo(models.Users, {
      foreignKey: "id_user",
      onDelete: "cascade",
    });
  };
  return TherapistsUsers;
};
