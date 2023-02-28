const { updateBand,deleteBand } = require('./Band');
const {sequelize} = require('./db');
const {Band, Musician} = require('./index');
const { updateMusician,deleteMusician } = require('./Musician');

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeEach(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const testBand = await Band.create({name:'Nirvana',genre:'Grunge',showCount:100})
        var results = await Band.findAll({raw:true});
        expect(results[0].showCount).toBe(100)
        expect(results[0].name).toBe('Nirvana');
        expect(results[0].genre).toBe('Grunge');
    })

    test('can update a band',async()=>{
        const testBand = await Band.create({name:'Nirvana',genre:'Grunge',showCount:100});
        await updateBand(testBand,'Foo Fighters','Dad Rock',20)
        var results = await Band.findAll({raw:true});
        expect(results[0].name).toBe('Foo Fighters');
        expect(results[0].genre).toBe('Dad Rock');
        expect(results[0].showCount).toBe(20);

    })

    test('can delete a band',async()=>{
        const testBand = await Band.create({name:'Nirvana',genre:'Grunge',showCount:100});
        deleteBand(testBand,'name','nirvana')
        var results = await Band.findAll({raw:true})
        expect(results.length).toBe(0)
        
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const testMusician = await Musician.create({name:'Kurt',instrument:'Vocals'})
        expect(testMusician.name).toBe('Kurt');
        expect(testMusician.instrument).toBe('Vocals')

    })

    test('Can update a Musician', async()=>{
        const testMusician = await Musician.create({name:'Kurt',instrument:'Vocals'})
        updateMusician(testMusician,'Bill','Drums')
        var results = await Musician.findAll({raw:true})
        expect(results[0].name).toBe('Bill');
        expect(results[0].instrument).toBe('Drums');

    })

    test('Can delete a Musician',async()=>{
        const testMusician= await Musician.create({name:'Kurt',instrument:'Vocals'});
        deleteMusician(testMusician,'name','Kurt')
        var results = await Musician.findAll({raw:true})
        expect(results.length).toBe(0)

    })
})