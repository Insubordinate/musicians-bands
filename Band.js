const {Sequelize, sequelize} = require('./db');

// TODO - define the Band model
let Band = sequelize.define('band',{
    name:Sequelize.STRING,
    genre:Sequelize.STRING,
    showCount:Sequelize.INTEGER
})

 async function updateBand(band,newName,newGenre,newShowCount){
    band.name = newName
    band.genre = newGenre
    band.showCount = newShowCount
    await band.save()
}

async function deleteBand(instance,columnName,columnValue){
    await instance.destroy({
        where:{
            columnName:columnValue
        }
    });
}
module.exports = {
    Band,
    updateBand,
    deleteBand
};