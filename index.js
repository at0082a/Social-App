const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB } = require('./config');
const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req})
});

mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('connected to database');
  return server.listen({port: 5000});
})
.then(res => {
    console.log(`Server is listening on ${res.url}`);
});


