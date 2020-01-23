import * as user from '../../controllers/user-controller.js'

export default {
  Query: {
    users: (parent, args, { db }) => db.user.findAll(),
    user: (parent, { id }, { db }) => db.user.findByPk(id)
  },
  Mutation: {
    createUser: (parent, args) => user.createUser(args),
    deleteUser: (parent, id) => user.deleteUser(id)
  }
}
