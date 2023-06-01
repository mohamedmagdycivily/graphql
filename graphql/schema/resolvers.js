const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
  Query: {
    // USER RESOLVERS
    users: async (parent, args, context) => {
      const res = await context.pool.query('SELECT * FROM users');
      return res.rows;
    },
    user: async (parent, args, context) => {
      const id = args.id;
      const res = await context.pool.query('SELECT * FROM users WHERE id = $1', [id]);
      return res.rows[0];
    },

    // MOVIE RESOLVERS
    movies: async (parent, args, context) => {
      const res = await context.pool.query('SELECT * FROM movies');
      return res.rows;
    },
    movie:async (parent, args, context) => {
      const name = args.name;
      const res = await context.pool.query('SELECT * FROM movies WHERE name = $1', [name]);
      return res.rows[0];
    },
  },
  User: {
    favoriteMovies: async (parent, args, context) => {
      const {favorite_movies} = parent;
      const res = await context.pool.query(`SELECT * FROM movies WHERE id = ANY($1)`, [favorite_movies]);
      return res.rows;
    },
  },

  Mutation: {
    createUser: async (parent, args, context) => {
      const user = args.input;
      const res = await context.pool.query('INSERT INTO users (name, username, age, nationality) VALUES ($1, $2, $3, $4) RETURNING *', [user.name, user.username, user.age, user.nationality]);
      return res.rows[0];
    },

    updateUsername: async (parent, args, context) => {
      const { id, newUsername } = args.input;
      const res = await context.pool.query('UPDATE users SET name = $1 WHERE id = $2 RETURNING *', [newUsername, id]);
      return res.rows[0];
    },

    deleteUser: async (parent, args, context) => {
      const id = args.id;
      await context.pool.query('DELETE FROM users WHERE id = $1', [id]);
      return null;
    },
  },
};

module.exports = { resolvers };
