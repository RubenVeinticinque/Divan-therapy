module.exports = (sequelize, dataTypes) => {
  const alias = "Moods";
  const columns = {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      autoIncrement: true,
    },
    date: dataTypes.DATEONLY,
    time: dataTypes.TIME,
    mood: dataTypes.STRING,
  };
  const config = {
    tablename: "Moods",
    timestamps: false,
  };
  const Moods = sequelize.define(alias, columns, config);
  Moods.associate = (models) => {
    //Un estado de ánimo puede tener muchos ususarios.
    Moods.belongsToMany(models.Users, {
      //tabla intermedia
      as: "moods_users",
      through: "Moods_users",
      foreignKey: "id_mood",
      otherKey: "id_user",
      timestamps: false,
    });
  };
  return Moods;
};
