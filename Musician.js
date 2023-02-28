const {Sequelize, sequelize} = require('./db');

// TODO - define the Musician model
let Musician = sequelize.define('musician',{
    name:Sequelize.STRING,
    instrument:Sequelize.STRING
})

async function updateMusician(musician,newName,newGenre){
    musician.name = newName;
    musician.instrument = newGenre
    await musician.save()
}

async function deleteMusician(instance,columnName,columnValue){
    await instance.destroy({
        where:{
            columnName:columnValue
        }
    });
}
module.exports = {
    Musician,
    updateMusician,
    deleteMusician
};