const {Sequelize, Model, sequelize} = require('./db');

// TODO - define the Band model

class Band extends Model{
    async updateBand(newName,newGenre,newShowCount){
        this.name = newName
        this.genre = newGenre
        this.showCount = newShowCount
        await this.save()
    }
    
    static async deleteBand(columnValue){
        await this.destroy({
            where:{
                'name':columnValue
            }
        });
    }

}

Band.init(
    {
    name:Sequelize.STRING,
    genre:Sequelize.STRING,
    showCount:Sequelize.INTEGER,
    
    },
    
    {
        sequelize,
    }
)


module.exports = {
    Band,
};