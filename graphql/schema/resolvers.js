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
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });

      return userUpdated;
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = { resolvers };
