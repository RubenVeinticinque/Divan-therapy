module.exports = (sequelize, dataTypes) => {
  const alias = "Donations";
  const columns = {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      autoIncrement: true,
    },
    date: dataTypes.DATEONLY,
    time: dataTypes.TIME,
    donation: dataTypes.INTEGER,
    donor_email: dataTypes.STRING,
  };
  const config = {
    tablename: "Donations",
    timestamps: false,
  };

  const Donations = sequelize.define(alias, columns, config);
  Donations.associate = (models) => {
    //Una donación puede pertenecer a muchos usuarios.
    Donations.belongsToMany(models.Users, {
      //tabla intermedia
      as: "users_donations",
      through: "Users_Donations",
      foreignKey: "id_user",
      otherKey: "id_donation",
      timestamps: false,
    });
  };
  return Donations;
};
