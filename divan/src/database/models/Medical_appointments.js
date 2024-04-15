module.exports = (sequelize, dataTypes) => {
  const alias = "Medical_appointments";
  const columns = {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      autoIncrement: true,
    },
    date: dataTypes.DATEONLY,
    time: dataTypes.TIME,
    modality: dataTypes.STRING,
    id_user: {
      type: dataTypes.INTEGER,
      references: { models: "Users", key: "id" },
    },
    id_therapist: {
      type: dataTypes.INTEGER,
      references: { models: "Therapists", key: "id" },
    },
  };
  const config = {
    tablename: "Medical_appointments",
    timestamps: false,
  };
  const MedicalAppointments = sequelize.define(alias, columns, config);
  MedicalAppointments.associate = (models) => {
    //Una cita médica puede pertencer a uno o más terapistas.
    MedicalAppointments.belongsTo(models.Therapists, {
      foreignKey: "id_therapist",
      onDelete: "cascade",
    });
    //Una cita médica pertenecen a uno a más usuarios.
    MedicalAppointments.belongsTo(models.Users, {
      as: "Users",
      foreignKey: "id_user",
      onDelete: "cascade",
    });
  };
  return MedicalAppointments;
};
