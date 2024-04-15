module.exports = (sequelize, dataTypes) => {
  const alias = "Prices";
  const columns = {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      autoIncrement: true,
    },
    price: dataTypes.INTEGER,
  };
  const config = {
    tablename: "Prices",
    timestamps: false,
  };
  const Prices = sequelize.define(alias, columns, config);
  Prices.associate = (models) => {
    //Un precio puede pertenecer a muchos terapistas.
    Prices.hasMany(models.Therapists, {
      as: "Therapists",
      foreignKey: "id_price",
    });
  };
  return Prices;
};
