module.exports = (sequelize, dataTypes) => {
  const alias = "Genders";
  const columns = {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      autoIncrement: true,
    },
    name_gender: dataTypes.STRING,
  };
  const config = {
    tablename: "Genders",
    timestamps: false,
  };

  const Genders = sequelize.define(alias, columns, config);
  Genders.associate = (models) => {
    //Un género puede pertenecer a muchos terapistas.
    Genders.hasMany(models.Therapists, {
      foreignKey: "id_name_gender",
    });
  };
  return Genders;
};
