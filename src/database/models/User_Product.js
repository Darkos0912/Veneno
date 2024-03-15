module.exports = (sequelize, dataTypes) => {
    const alias = "User_Product";

    const cols = {
        id: {
            type: dataTypes.INTEGER(),
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: dataTypes.INTEGER(),
            references: {
                model: "User",
                key: "id"
            }
        },
        product_id: {
            type: dataTypes.INTEGER(),
            references: {
                model: "Product",
                key: "id"
            }
        }
    };
    
    const config = {
        tableName: "users_products",
        timestamps: false
    }

    const UserProduct = sequelize.define(alias,cols,config);

    UserProduct.associate = (models) => {
        UserProduct.belongsTo(models.User, {
            as: "users",
            foreignKey : "user_id"
        })

        UserProduct.belongsTo(models.Product, {
            as: "products",
            foreignKey : "product_id"
        })
    }
    
    return UserProduct;
}