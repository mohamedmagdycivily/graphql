const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema/type-defs");
const { resolvers } = require("./schema/resolvers");
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

// test the connection
pool.query('SELECT * FROM users limit 1')
  .then((result) => {
    console.log(result.rows); // Access the query result here
  })
  .catch((err) => {
    console.error('Error executing query', err);
});

// initialize the server
const server = new ApolloServer({ typeDefs, resolvers, context:{
  pool
} });

server.listen().then(({ url }) => {
  console.log(`YOUR API IS RUNNING AT: ${url} :)`);
});


// Gracefully shutdown the server
process.on('SIGINT', () => {
  // Close the connection pool
  pool.end()
    .then(() => {
      console.log('Connection pool closed');
      server.close();
    })
    .catch((err) => {
      console.error('Error closing connection pool', err);
      server.close();
    });
});