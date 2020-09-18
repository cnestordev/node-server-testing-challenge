const app = require('./api/server')
const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`port running on port ${port}`)
})