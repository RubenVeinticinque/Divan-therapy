module.exports = (sequelize, dataTypes) => {
  const alias = "Session_hours";
  const columns = {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      autoIncrement: true,
    },
    session_hours: dataTypes.STRING,
  };
  const config = {
    tablename: "Session_hours",
    timestamps: false,
  };
  const SessionHours = sequelize.define(alias, columns, config);
  SessionHours.associate = (models) => {
    //Una cantidad de tiempo puede pertenecer a muchos terapistas.
    SessionHours.hasMany(models.Therapists, {
      as: "Therapists",
      foreignKey: "id_session_hours",
    });
  };
  return SessionHours;
};
