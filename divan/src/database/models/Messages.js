module.exports = (sequelize, dataTypes) => {
  const alias = "Messages";
  const columns = {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      autoIncrement: true,
    },
    city_message: dataTypes.STRING,
    province_message: dataTypes.STRING,
    country_message: dataTypes.STRING,
    date_message: dataTypes.DATEONLY,
    message: dataTypes.STRING,
    id_user_message: {
      type: dataTypes.INTEGER,
      references: { models: "Users", key: "id" },
    },
  };
  const config = { tablename: "Messages", timestamps: false };

  const Messages = sequelize.define(alias, columns, config);
  Messages.associate = (models) => {
    //Muchos mensajes pueden pertenecer a un usuario.
    Messages.belongsTo(models.Users, {
      as: "Users",
      foreignKey: "id_user_message",
    });
  };
  return Messages;
};
