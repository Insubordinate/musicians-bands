const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {sequelize} = require('./db')



Band.hasMany(Musician);
Musician.belongsTo(Band);

 

   





module.exports = {
    Band,
    Musician
};
