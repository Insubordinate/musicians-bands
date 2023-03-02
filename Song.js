
const {Sequelize, Model, sequelize} = require('./db');


class Song extends Model{

}

Song.init({
    name:Sequelize.STRING,
    year:Sequelize.INT,
},{sequelize})


module.exports = {Song}