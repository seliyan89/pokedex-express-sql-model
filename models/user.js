const bcrypt = require('bcrypt');

/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPool) => {
  // `dbPool` is accessible within this function scope
  return {
    create: (user, callback) => {
      // run user input password through bcrypt to obtain hashed password
      bcrypt.hash(user.password, 1, (err, hashed) => {
        if (err) console.error('error!', err);

        // set up query
        const queryString = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
        const values = [
          user.name,
          user.email,
          hashed
        ];

        // execute query
        dbPool.query(queryString, values, (error, queryResult) => {
          // invoke callback function with results after query has executed
          callback(error, queryResult);
        });
      });
    },

    get: (id, callback) => {
      // set up query
      const queryString = 'SELECT * from users WHERE id=$1';
      const values = [id];

      // execute query
      dbPool.query(queryString, values, (error, queryResult) => {
        // invoke callback function with results after query has executed
        callback(error, queryResult);
      });
    },

    login: (user, callback) => {
      const queryString='select * from users where name=$1';
      const values = [user.name];
      dbPool.query(queryString,values,(error,queryResult)=>{
        let hash=queryResult.rows[0].password;
        bcrypt.compare(user.password, hash, function(err, res) {
          callback(err,res);
        });
      });
    }
  };
};
