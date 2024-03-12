import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {typeDefs} from './schema.js';
import db from './_db.js'

///sever set up
const resolvers = {
    Query: {
        games(){
            return db.games
        },

        reviews(){
            return db.reviews
        },
        authors(){
            return db.authors
        },
        review(_,args){
            return db.reviews.find((review) => review.id === args.id)
        },
        game(_,args){
            return db.games.find((game) => game.id === args.id)
        },
        author(_,args){
            return db.authors.find((author) => author.id === args.id)
        },

    },
    Game:{
        reviews(parent){
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author:{
        reviews(parent){
            return db.reviews.filter((r) => r.author_id_id === parent.id)
        }
},
  
Review:{
    author(parent){
        return db.authors.filter((a) => a.id === parent.id)
    },
    game(parent){
        return db.games.filter((g) => g.id === parent.game_id)
    }
}
}

const server = new ApolloServer({
    typeDefs,
    resolvers

})


const { url } = await startStandaloneServer(server, {   
    listen: {port:4000}
})   
console.log('server ready at port', 4000)              
