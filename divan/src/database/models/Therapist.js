module.exports = (sequelize, dataTypes) => {
  const alias = "Therapists";
  const columns = {
    id: {
      primaryKey: true,
      type: dataTypes.INTEGER,
      autoIncrement: true,
    },
    name: dataTypes.STRING,
    lastname: dataTypes.STRING,
    email: dataTypes.STRING,
    birthdate: dataTypes.DATE,
    avatar: dataTypes.STRING,
    speciality: dataTypes.STRING,
    type_therapist: dataTypes.STRING,
    total_sessions: dataTypes.INTEGER,
    phone: dataTypes.INTEGER,
    medical_registration: dataTypes.INTEGER,
    id_country: {
      type: dataTypes.INTEGER,
      references: { models: "Countries", key: "id" },
    },
    id_province: {
      type: dataTypes.INTEGER,
      references: { models: "Provinces", key: "id" },
    },
    id_city: {
      type: dataTypes.INTEGER,
      references: { models: "Cities", key: "id" },
    },
    id_zone: {
      type: dataTypes.INTEGER,
      references: { models: "Zones", key: "id" },
    },
    id_name_est: {
      type: dataTypes.INTEGER,
      references: { models: "Establishment", key: "id" },
    },
    id_name_gender: {
      type: dataTypes.INTEGER,
      references: { models: "Genders", key: "id" },
    },
    id_price: {
      type: dataTypes.INTEGER,
      references: { models: "Prices", key: "id" },
    },
    id_session_hours: {
      type: dataTypes.INTEGER,
      references: { models: "Session_hours", key: "id" },
    },
  };
  const config = {
    tablename: "Therapists",
    timestamps: false,
  };
  const Therapists = sequelize.define(alias, columns, config);
  Therapists.associate = (models) => {
    //Un terapista tiene un país de residencia.
    Therapists.belongsTo(models.Countries, {
      as: "Countries",
      foreignKey: "id_country",
    });
    //Un terapista tiene una provincia de residencia.
    Therapists.belongsTo(models.Provinces, {
      foreignKey: "id_province",
    });
    //Un terapista tiene una ciudad de residencia.
    Therapists.belongsTo(models.Cities, {
      foreignKey: "id_city",
    });
    //Un terapista tiene una zona de residencia.
    Therapists.belongsTo(models.Zones, {
      foreignKey: "id_zone",
    });
    //Un terapista tiene un establecimiento de atención.
    Therapists.belongsTo(models.Establishments, {
      foreignKey: "id_name_est",
    });
    //Un terapista tiene un género.
    Therapists.belongsTo(models.Genders, {
      foreignKey: "id_name_gender",
    });
    //Un terapista puede tener muchos usuarios.
    Therapists.belongsToMany(models.Users, {
      //tabla intermedia
      as: "users",
      through: "therapists_users",
      foreignKey: "id_user",
      otherKey: "id_therapist",
      timestamps: false,
    });
    //Muchos terapista puede tener una cita médica.
    Therapists.hasMany(models.Medical_appointments, {
      as: "Medical_appointments",
      foreignKey: "id_therapist",
    });
    //Un terapista tiene un precio.
    Therapists.belongsTo(models.Prices, {
      foreignKey: "id_price",
    });
    //Un terapista tiene un tiempo de sesión.
    Therapists.belongsTo(models.Session_hours, {
      foreignKey: "id_session_hours",
    });
  };
  return Therapists;
};
