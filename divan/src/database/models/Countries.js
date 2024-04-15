module.exports = (sequelize, dataTypes) => {
    const alias = "Countries";
    const columns = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true,
        },
        name_country: dataTypes.STRING,
    };
    const config = {
        tablename: "Countries",
        timestamps: false,
    };

    const Countries = sequelize.define(alias, columns, config);
    Countries.associate = (models) => {
        //Un país de residencia puede pertenecer a muchos terapistas.
        Countries.hasMany(models.Therapists, {
            foreignKey: "id_country",
        });
        //Un país de residencia tiene muchas provincias.
        Countries.hasMany(models.Provinces, {
            foreignKey: "id_name_country",
        });
        //Un país de residencia tiene muchas ciudades.
        Countries.hasMany(models.Cities, {
            foreignKey: "id_name_province",
        });
        //Un país de residencia tiene muchas zonas.
        Countries.hasMany(models.Zones, {
            foreignKey: "id_name_city",
        });
    };
    return Countries;
};
