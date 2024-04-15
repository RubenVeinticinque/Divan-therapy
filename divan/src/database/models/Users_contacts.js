module.exports = (sequelize, dataTypes) => {
  const alias = "Users_contacts";
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
    id_contact: {
      type: dataTypes.INTEGER,
      references: { models: "Contacts", key: "id" },
    },
    quantity_contacts: dataTypes.INTEGER,
  };
  const config = {
    tablename: "Users_contacts",
    timestamps: false,
  };

  const UsersContacts = sequelize.define(alias, columns, config);
  UsersContacts.associate = (models) => {
    UsersContacts.belongsTo(models.Users, {
      foreignKey: "id_user",
      onDelete: "cascade",
    });
    UsersContacts.belongsTo(models.Contacts, {
      foreignKey: "id_contact",
    });
  };
  return UsersContacts;
};
