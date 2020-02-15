import * as user from '../../controllers/user-controller.js'

export default {
  Query: {
    users: user.findUsers,
    user: user.findUserById
  },
  Mutation: {
    createUser: user.createUser,
    deleteUser: user.deleteUser,
    signUp: user.signUp
  }
}
