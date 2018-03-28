/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPool) => {
  // `dbPool` is accessible within this function scope
  return {
    create: (pokemon, callback) => {
      // set up query
      const queryString = `INSERT INTO pokemons (name, num, img, weight, height)
        VALUES ($1, $2, $3, $4, $5)`;
      const values = [
        pokemon.name,
        pokemon.num,
        pokemon.img,
        pokemon.weight,
        pokemon.height
      ];

      // execute query
      dbPool.query(queryString, values, (err, queryResult) => {
  
        callback(err, queryResult);
      });

    },

    get: (id, callback) => {
      const values = [id];
      dbPool.query('SELECT * from pokemons WHERE id=$1', values, (error, queryResult) => {
        callback(error, queryResult);
      });
    },

    userPokemonsUpdate: (pokemon,user,callback)=>{
      let queryString="select * from pokemons where num=$1";
      let values =[pokemon.num];
      dbPool.query(queryString,values,(err,queryResult)=>{
        let pokemonId=queryResult.rows[0].id;
        queryString="select * from users where name=$1";
        values=[user];
        dbPool.query(queryString,values,(err,queryResult)=>{
          let userId=queryResult.rows[0].id;
          queryString = "insert into user_pokemons (pokemon_id,user_id) values($1,$2)"
          values= [pokemonId,userId];
          dbPool.query(queryString,values,(error,queryResult)=>{
            callback(error,queryResult);
          })
        })
      })
    },

    update: (pokemon,callback)=>{
      const queryString='Update pokemons Set id=$1,num=$2,name=$3,img=$4,height=$5,weight=$6 WHERE id=$7';
      const values=[pokemon.id,pokemon.num,pokemon.name,pokemon.img,pokemon.height,pokemon.weight,pokemon.id];
      dbPool.query(queryString,values,(error,queryResult)=>{
        callback(error,queryResult)
      });
    }
  };
};
