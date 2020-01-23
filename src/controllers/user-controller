import db from '../models'

export const createUser = ({ input: args }) => {
  return db.user.create({
    firstName: args.firstName,
    lastName: args.lastName,
    username: args.username,
    password: args.password
  })
}

export const deleteUser = (args) => {
  return db.user.destroy({
    where: {
      id: args.id
    }
  })
}
