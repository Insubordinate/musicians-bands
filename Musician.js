const {Sequelize, Model,sequelize} = require('./db');
const {Band} = require('./Band')
// TODO - define the Musician model


class Musician extends Model{
    async updateMusician(newName,newGenre){
        this.name = newName;
        this.instrument = newGenre
        await this.save()
    }
    
    static async deleteMusician(columnValue){
        await this.destroy({
            where:{
                'name':columnValue
            }
        });
    }

}

Musician.init(
    {
        name:Sequelize.STRING,
        instrument:Sequelize.STRING,
    
        
    },
    {
        sequelize,
        modelName:'Musician'
    }
)


module.exports = {
    Musician,
};