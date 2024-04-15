module.exports = (sequelize, dataTypes) => {
    const alias = "Zones";
    const columns = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true,
        },
        name_zone: dataTypes.STRING,
        id_name_city: {
            type: dataTypes.INTEGER,
            references: { models: "Cities", key: "id" },
        },
    };
    const config = {
        tableName: "Zones",
        timestamps: false,
    };

    const Zones = sequelize.define(alias, columns, config);
    Zones.associate = (models) => {
        //Un país de residencia puede pertenecer a muchos terapistas.
        Zones.hasMany(models.Therapists, {
            foreignKey: "id_zone",
        });
        //Una zona pertenece a un país.
        Zones.belongsTo(models.Countries, {
            foreignKey: "id_name_city",
        });
        //Una zona pertenece a una ciudad.
        Zones.belongsTo(models.Cities, {
            foreignKey: "id_name_city",
        });
    };
    return Zones;
};
