import models from '../models'
import jwt from 'jsonwebtoken'

export const findUsers = () => models.user.findAll()

export const findUserById = (_, { id }) => models.user.findByPk(id)

export const createUser = (_, { input }) => models.user.create(input)

export const deleteUser = (_, id) => models.user.destroy({ where: id })

export const signUp = async (_, { input: user }, { secret }) => {
  try {
    const newUser = await models.user.create(user)
    const newToken = jwt.sign({ subject: newUser.id, username: newUser.username }, 'secret', { expiresIn: '10d' })
    return {
      user: newUser,
      jwt: newToken
    }
  } catch (error) {
    return error
  }
}
