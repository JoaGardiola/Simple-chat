import models from '../models'

export const findUsers = () => {
  return models.user.findAll()
}

export const findUserById = (id) => {
  return models.user.findByPk(id)
}

export const createUser = ({ input }) => {
  return models.user.create(input)
}

export const deleteUser = (args) => {
  return models.user.destroy({ where: args })
}
