module.exports = (sequelize, dataTypes) => {
  const alias = "Users";
  const columns = {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      autoIncrement: true,
    },
    name: dataTypes.STRING,
    lastname: dataTypes.STRING,
    email: dataTypes.STRING,
    avatar: dataTypes.STRING,
    password: dataTypes.STRING,
    id_user_category: {
      type: dataTypes.INTEGER,
      references: { models: "Users_categories", key: "id" },
    },
  };
  const config = {
    tablename: "Users",
    timestamps: false,
  };

  const Users = sequelize.define(alias, columns, config);
  Users.associate = (models) => {
    //Un usuario tiene una categoría.
    Users.belongsTo(models.Users_categories, {
      as: "Users_categories",
      foreignKey: "id_user_category",
    });
    //Un usuario puede tener muchos contactos.
    Users.belongsToMany(models.Contacts, {
      //tabla intermedia
      as: "contacts",
      through: "users_contacts",
      foreignKey: "id_contact",
      otherKey: "id_user",
      timestamps: false,
    });
    //Un usuario puede tener muchos terapistas.
    Users.belongsToMany(models.Therapists, {
      //tabla intermedia
      as: "Therapists",
      through: "therapists_users",
      foreignKey: "id_therapist",
      otherKey: "id_user",
      timestamps: false,
    });
    //Un usuario puede tener muchas donaciones.
    Users.belongsToMany(models.Donations, {
      //tabla intermedia
      as: "users_donations",
      through: "Users_Donations",
      foreignKey: "id_donation",
      otherKey: "id_user",
      timestamps: false,
    });
    //Un usuario o más puede tener una cita.
    Users.hasMany(models.Medical_appointments, {
      as: "Medical_appointments",
      foreignKey: "id_user",
    });
    //Un usuario pueden tener muchos estados de ánimo.
    Users.belongsToMany(models.Moods, {
      //tabla intermedia
      as: "moods_users",
      through: "Moods_users",
      foreignKey: "id_user",
      otherKey: "id_mood",
      timestamps: false,
    });
    //Un usuario tiene uno o más mensajes.
    Users.hasMany(models.Messages, {
      as: "Messages",
      foreignKey: "id_user_message",
    });
  };
  return Users;
};
