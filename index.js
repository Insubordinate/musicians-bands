const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {sequelize} = require('./db')
const {Song} = require('./Song')


Band.hasMany(Musician);
Musician.belongsTo(Band);
Song.belongsToMany(Band,{through:'band_song'})
Band.belongsToMany(Song,{through:'band_song'})




module.exports = {
    Band,
    Musician,
    Song,
    sequelize
};
