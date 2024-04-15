module.exports = (sequelize, dataTypes) => {
    const alias = "Contacts";
    const columns = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true,
        },
        name: dataTypes.STRING,
        lastname: dataTypes.STRING,
        email: dataTypes.STRING,
        description: dataTypes.STRING,
    };
    const config = {
        tablename: "Contacts",
        timestamps: false,
    };

    const Contacts = sequelize.define(alias, columns, config);
    Contacts.associate = (models) => {
        //Un contacto puede pertenecer a muchos terapistas.
        Contacts.belongsToMany(models.Therapists, {
            //tabla intermedia
            as: "therapists",
            through: "therapists_contacts",
            foreignKey: "id_therapist",
            otherKey: "id_contact",
            timestamps: false,
        });
    };
    return Contacts;
};
