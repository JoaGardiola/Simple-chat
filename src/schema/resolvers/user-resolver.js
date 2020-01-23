export default {
  Query: {
    users: (parent, args, { db }) => db.user.findAll(),
    user: (parent, { id }, { db }) => db.user.findByPk(id)
  },
  Mutation: {
    createUser: (parent, { input: args }, { db }) =>
      db.user.create({
        firstName: args.firstName,
        lastName: args.lastName,
        username: args.username,
        password: args.password
      }),
    updateUserPassword: (parent, { id, password }, { db }) =>
      db.user.update({
        password: password
      },
      {
        where: {
          id: id
        }
      }),
    deleteUser: (parent, { id }, { db }) =>
      db.user.destroy({
        where: {
          id: id
        }
      })
  }
}
