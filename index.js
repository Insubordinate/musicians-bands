const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {sequelize} = require('./db')
const {Song} = require('./Song')


Band.hasMany(Musician);
Musician.belongsTo(Band);

 

   





module.exports = {
    Band,
    Musician
};
