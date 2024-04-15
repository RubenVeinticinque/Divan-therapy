module.exports = (sequelize, dataTypes) => {
    const alias = "Users_categories";
    const columns = {
        id: {
            primaryKey: true,
            type: dataTypes.INTEGER,
            autoIncrement: true,
        },
        type: dataTypes.STRING,
    };
    const config = {
        tablename: "Users_categories",
        timestamps: false,
    };

    const UsersCategories = sequelize.define(alias, columns, config);
    UsersCategories.associate = (models) => {
        UsersCategories.hasMany(models.Users, {
            as: "Users",
            foreignKey: "id_user_category",
        });
    };
    return UsersCategories;
};
