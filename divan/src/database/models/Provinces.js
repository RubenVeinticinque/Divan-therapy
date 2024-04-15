module.exports = (sequelize, dataTypes) => {
    const alias = "Provinces";
    const columns = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true,
        },
        name_province: dataTypes.STRING,
        id_name_country: {
            type: dataTypes.INTEGER,
            references: { models: "Countries", key: "id" },
        },
    };
    const config = {
        tablename: "Provinces",
        timestamps: false,
    };

    const Provinces = sequelize.define(alias, columns, config);
    Provinces.associate = (models) => {
        //Una provincia de residencia puede pertenecer a muchos terapistas.
        Provinces.hasMany(models.Therapists, {
            foreignKey: "id_province",
        });
        //Una provincia pertenece a un país de residencia.
        Provinces.belongsTo(models.Countries, {
            foreignKey: "id_name_country",
        });
        //Una provincia puede tener muchas ciudades.
        Provinces.hasMany(models.Cities, {
            foreignKey: "id_name_province",
        });
    };
    return Provinces;
};
