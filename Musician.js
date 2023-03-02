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

    static async addBand(bandName,musicianName){

        let findBand = await Band.findAll({where:{'name':bandName},raw:true})
        await this.update({BandId:findBand[0].id},{where:{name:musicianName}})
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