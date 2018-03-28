/**
 * ===========================================
 * Controller logic
 * ===========================================
 */
const get = (db) => {
  return (request, response) => {
    // use pokemon model method `get` to retrieve pokemon data
    db.pokemon.get(request.params.id, (error, queryResult) => {
      // queryResult contains pokemon data returned from the pokemon model
      if (error) {
        console.error('error getting pokemon:', error);
        response.sendStatus(500);
      } else {
        // render pokemon.handlebars in the pokemon folder
        response.render('pokemon/pokemon', { pokemon: queryResult.rows[0] });
      }
    });
  };
};

const updateForm = (db) => {
  return (request, response) => {
    db.pokemon.get(request.params.id,(err,queryResult)=>{
    let context={pokemon:queryResult.rows[0]}
    response.render('pokemon/edit',context);
  });
 };
};

const update = (db) => {
  return (request, response) => {
    // TODO: Add logic here
    db.pokemon.update(request.body,(error,queryResult)=>{
      response.send('Updated');
    })
  };
};

const createForm = (request, response) => {
  response.render('pokemon/new');
};

const create = (db) => {
  return (request, response) => {
    // use pokemon model method `create` to create new pokemon entry in db
    let pokemonid=null;

    db.pokemon.create(request.body, (error, queryResult) => {
      // queryResult of creation is not useful to us, so we ignore it
      // (console log it to see for yourself)
      // (you can choose to omit it completely from the function parameters)

      if (error) {
        console.error('error getting pokemon:', error);
        response.sendStatus(500);
      }

      if (queryResult.rowCount >= 1) {
        console.log('Pokemon created successfully');
        db.pokemon.userPokemonsUpdate(request.body,request.cookies['username'],(error,queryResult)=>{
          if(error){
            console.log("update error",error);
          }
          console.log('updated user_pokemons table');
        })
      } else {
        console.log('Pokemon could not be created');
      }
      // redirect to home page after creation
      response.redirect('/');
    });
  };
};

/**
 * ===========================================
 * Export controller functions as a module
 * ===========================================
 */
module.exports = {
  get,
  updateForm,
  update,
  createForm,
  create
};
