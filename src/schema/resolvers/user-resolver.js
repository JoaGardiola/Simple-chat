import * as user from '../../controllers/user-controller.js'

export default {
  Query: {
    users: (parent, args) => user.findUsers(),
    user: (parent, { id }) => user.findUserById(id)
  },
  Mutation: {
    createUser: (parent, args) => user.createUser(args),
    deleteUser: (parent, id) => user.deleteUser(id)
  }
}
