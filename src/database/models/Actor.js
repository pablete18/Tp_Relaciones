module.exports = (sequelize, dataTypes) => {
    let alias = 'Actor';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        first_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3,1),
            allowNull: false
        },
        favorite_movie_id: dataTypes.BIGINT(10).UNSIGNED
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Actor = sequelize.define(alias, cols, config); 

    Actor.associate = function (models){
        Actor.belongsToMany(models.Movie,{
            as:"actores",
            through: 'actor_movie',//a traves de que tabla(tabla pivot)
            foreignKey:'actor_id',//la tabla de donde hacemos la relacion 
            otherKey : 'movie_id'//la fk de la otra tabla donde hacemos la relacion
        });
        Actor.belongsTo(models.Movie,{
            as : "favorite",
            foreignKey : "favorite_movie_id"
        })
    }
    return Actor
};