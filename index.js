const server = require('./api/server')

server.listen(4000, () => {
    console.log('*** server running on http://localhost:4000 ***')
})