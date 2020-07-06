const pool = require('../databasePool')
const TRAITS = require('../data/traits.json')

TRAITS.forEach(TRAITS => {
    const traitType = TRAITS.type
    const tratiValues = TRAITS.values

    tratiValues.forEach(tratiValue => {
        pool.query(
            `INSERT INTO trait("traitType", "traitValue")
             VALUES($1, $2) RETURNING id`,
             [traitType, tratiValue],
             (error, response) =>{
                 if(error) console.error(error)

                 const traitId = response.rows[0].id
                 
                 console.log(`Insertd trait - id:  ${traitId}`)
             }
        )
    })
})