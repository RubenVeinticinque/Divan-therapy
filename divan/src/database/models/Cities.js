module.exports = (sequelize, dataTypes) => {
  const alias = "Cities";
  const columns = {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      autoIncrement: true,
    },
    name_city: dataTypes.STRING,
    id_name_province: {
      type: dataTypes.INTEGER,
      references: { models: "Cities", key: "id" },
    },
  };
  const config = {
    tablename: "Cities",
    timestamps: false,
  };

  const Cities = sequelize.define(alias, columns, config);
  Cities.associate = (models) => {
    //Una ciudad de residencia puede pertenecer a muchos terapistas.
    Cities.hasMany(models.Therapists, {
      foreignKey: "id_city",
    });
    //Una ciudad pertenece a un país.
    Cities.belongsTo(models.Countries, {
      foreignKey: "id_name_province",
    });
    //Una ciudad pertenece a una provincia.
    Cities.belongsTo(models.Provinces, {
      foreignKey: "id_name_province",
    });
    //Una ciudad puede tener muchas zonas.
    Cities.hasMany(models.Zones, {
      foreignKey: "id_name_city",
    });
  };
  return Cities;
};
