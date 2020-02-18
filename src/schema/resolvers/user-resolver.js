import * as user from '../../controllers/user-controller.js'

export default {
  Query: {
    users: user.findUsers,
    user: user.findUserById
  },
  Mutation: {
    createUser: user.createUser,
    deleteUser: user.deleteUser,
    getUserByUsername: user.getUserByUsername,
    signUp: user.signUp,
    signIn: user.signIn
  }
}
