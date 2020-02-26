import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { createServer } from 'http'

import passport from 'passport'
import {Strategy as JwtStrategy} from 'passport-jwt'
import {ExtractJwt} from 'passport-jwt'

import schema from './schema'

require('dotenv').config()

const port = process.env.PORT || 3001

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({id: jwt_payload.sub}, function(err, user) {
    if (err) {
      return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
  });
}));

passport.use(JwtStrategy)

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
