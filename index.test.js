const {Band, Musician,sequelize,Song} = require('./index');


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

    test('Can create a song',async()=>{

        const testSong = await Song.create({name:'Whoop',year:1990})
        var results = await Song.findAll({raw:true})
        expect(results[0].name).toBe('Whoop')
        expect(results[0].year).toBe(1990);
    })

    test('can update a band',async()=>{
        const testBand = await Band.create({name:'Nirvana',genre:'Grunge',showCount:100});
        await testBand.updateBand('Foo Fighters','Dad Rock',20)
        var results = await Band.findAll({raw:true});
        expect(results[0].name).toBe('Foo Fighters');
        expect(results[0].genre).toBe('Dad Rock');
        expect(results[0].showCount).toBe(20);

    })

    test('can delete a band',async()=>{
        const testBand = await Band.create({name:'Nirvana',genre:'Grunge',showCount:100});
        Band.deleteBand('Nirvana')
        var results = await Band.findAll({raw:true})
        expect(results.length).toBe(0)
        
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const testMusician = await Musician.create({name:'Kurt',instrument:'Vocals'})
        var results = await Musician.findAll({raw:true});
        expect(results[0].name).toBe('Kurt');
        expect(results[0].instrument).toBe('Vocals');

    })

    test('Can update a Musician', async()=>{
        const testMusician = await Musician.create({name:'Kurt',instrument:'Vocals'})
        await testMusician.updateMusician('Bill','Drums')
        var results = await Musician.findAll({raw:true})
        expect(results[0].name).toBe('Bill');
        expect(results[0].instrument).toBe('Drums');

    })

    test('Can delete a Musician',async()=>{
        const testMusician= await Musician.create({name:'Kurt',instrument:'Vocals'});
        await Musician.deleteMusician('Kurt')
        var results = await Musician.findAll({raw:true})
        expect(results.length).toBe(0)

    })

    test('Check the Associations',async()=>{
        await Band.create({name:'wow',genre:'test',showCount:'100'})
        await Musician.create({name:'Bill',instrument:'Drums'})
        result = await Musician.findAll({raw:true})
        expect(result[0].BandId).toBe(null)
    })

    test('Check to see if Musician can be added to a band',async()=>{
        await Band.create({name:'wow',genre:'test',showCount:'100'})
        await Musician.create({name:'Bill',instrument:'Drums'})
        let testBand = await Band.findByPk(1)
        let testMusician = await Musician.findByPk(1)
        await testBand.addMusician(testMusician)

        let verifyAdd = await Band.findByPk(1)
        var testData = await verifyAdd.getMusicians({raw:true})

        var testData1 = testData[0]
        expect(testData1.name).toBe('Bill')


    })

    test('Can add Songs to Band',async()=>{
        await Band.create({name:'wow',genre:'test',showCount:'100'})
        await Song.bulkCreate([{name:'sure',year:1990},{name:'sure2',year:1991}])


        let someBand = await Band.findByPk(1)
        let someSong = await Song.findByPk(1)
        let someSong2 = await Song.findByPk(2)

        await someBand.addSong(someSong)
        await someBand.addSong(someSong2)


        let testModel = await Band.findByPk(1)
        var testData = await testModel.getSongs({raw:true})

        var testData1 = testData[0]
        expect(testData1.name).toBe('sure')

        var testData2 = testData[1]
        expect(testData2.name).toBe('sure2')
    })

    test('Can add Bands to Song',async()=>{
        await Band.bulkCreate([{name:'wow',genre:'test',showCount:'100'},{name:'wow2',genre:'test2',showCount:'100'}])
        await Song.create({name:'sure',year:1990})


        let someSong= await Song.findByPk(1)
        let someBand1 = await Band.findByPk(1)
        let someBand2 = await Band.findByPk(2)

        await someSong.addBand(someBand1)
        await someSong.addBand(someBand2)


        let testModel = await Song.findByPk(1)
        var testData = await testModel.getBands({raw:true})

        var testData1 = testData[0]
        expect(testData1.name).toBe('wow')

        var testData2 = testData[1]
        expect(testData2.name).toBe('wow2')
    })

    test('Testing Eager Loading',async()=>{
        await Band.bulkCreate([{name:'Nirvana',genre:'Grunge',showCount:'100'},{name:'Black Sabbath',genre:'Metal',showCount:'200'}])
        await Song.bulkCreate([{name:'Lithium',year:1990},{name:'Polly',year:1991}])
        await Musician.bulkCreate([{name:'Dave Grohl',instrument:'Drums'},{name:"Kurt Cobain",instrument:'Vocals'}])

        //Add Songs to Nirvana, Add Musicians to Nirvana

        var findNirvana = await Band.findAll({where:{name:'Nirvana'}})
        findNirvana = findNirvana[0]


        var findLithium = await Song.findAll({where:{name:"Lithium"}})
        findLithium= findLithium[0]
        var findPolly = await Song.findAll({where:{name:"Polly"}})
        findPolly = findPolly[0]

        var findDave = await Musician.findAll({where:{name:"Kurt Cobain"}})
        findDave = findDave[0]
        let findKurt = await Musician.findAll({where:{name:"Dave Grohl"}})
        findKurt = findKurt[0]
        
        await findNirvana.addSongs([findLithium,findPolly]);
        await findNirvana.addMusicians([findDave,findKurt]);

        var verifyAdds = await Band.findAll({where:{name:'Nirvana'},include:Song})
        verifyAdds = verifyAdds[0]
        expect(verifyAdds.Songs.length).toBe(2)

        var verifyAdds = await Band.findAll({where:{name:'Nirvana'},include:Musician})
        verifyAdds = verifyAdds[0]
        expect(verifyAdds.Musicians.length).toBe(2)
    })
})    