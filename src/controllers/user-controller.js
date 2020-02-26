import models from '../models'
import jwt from 'jsonwebtoken'

export const findUsers = () => models.user.findAll()

export const findUserById = (_, { id }) => models.user.findByPk(id)

export const createUser = (_, { input }) => models.user.create(input)

export const deleteUser = (_, id) => models.user.destroy({ where: id })

export const getUserByUsername = (_, { username }) => {
  return models.user.findOne({ where: { username } })
}

export const signUp = async (_, { input: user }) => {
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

export const signIn = async (_, { input: { username, password } }) => {
  const user = await getUserByUsername(_, { username })
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = user.passwordMatches(password)
  if (!valid) {
    throw new Error('Invalid password')
  }

  const token = jwt.sign({ subject: user.id, username: user.username }, 'secret', { expiresIn: '10d' })

  return {
    user,
    jwt: token
  }
}
