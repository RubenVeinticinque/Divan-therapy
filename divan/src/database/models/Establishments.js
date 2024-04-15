module.exports = (sequelize, dataTypes) => {
    const alias = "Establishments";
    const columns = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true,
        },
        name_establishment: dataTypes.STRING,
    };
    const config = {
        tablename: "Establishments",
        timestamps: false,
    };

    const Establishments = sequelize.define(alias, columns, config);
    Establishments.associate = (models) => {
        //Un establecimiento de atención puede pertenecer a muchos terapistas.
        Establishments.hasMany(models.Therapists, {
            foreignKey: "id_name_est",
        });
    };
    return Establishments;
};
