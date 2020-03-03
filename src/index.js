import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'

import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import jwt from 'jsonwebtoken'

import schema from './schema'
import models from './models'

require('dotenv').config()

const port = process.env.PORT || 3001

const params = {
  secretOrKey: 'secret',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new JwtStrategy(params, async (payload, done) => {
  try {
    const user = await models.user.findOne({ where: { id: payload.sub } })
    done(null, user)
  } catch (err) {
    done(err)
  }
})

passport.use(strategy)

const app = express()

passport.initialize()

app.use('/graphql', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      req.user = user
    }

    next()
  })(req, res, next)
})

const server = new ApolloServer({
  ...schema,
  instrospection: true,
  playground: true,
  tracing: true,
  context: ({ req }) => ({
    user: req.user
  })
})

server.applyMiddleware({ app })

const httpServer = createServer(app)

server.installSubscriptionHandlers(httpServer)

httpServer.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  console.log(
    `Subscriptions ready at ws://localhost:${port}${server.subscriptionsPath}`
  )
})
