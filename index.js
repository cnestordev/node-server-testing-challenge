const app = require('./api/server')

const port = 8000

app.listen(port, () => {
    console.log(`running on port ${port}`)
})