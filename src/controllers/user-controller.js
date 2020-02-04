import models from '../models'

export const findUsers = () => models.user.findAll()

export const findUserById = (_, { id }) => models.user.findByPk(id)

export const createUser = (_, { input }) => models.user.create(input)

export const deleteUser = (_, id) => models.user.destroy({ where: id })
