import * as Express from 'express'
import * as http from 'http'

export function runHttpServer() {
  const app = Express()
  const port = process.env.NODE_ENV === 'production' ? 80 : 3000

  app.set('port', port)
  app.get('/.well-known/', Express.static('./dist/.well-known'))
  app.get('*', (req, res) => {
    res.redirect('https://' + req.headers.host + req.path)
  })

  http.createServer(app).listen(app.get('port'), function() {
    console.log('\nListening on http port ' + app.get('port') + '\n')
  })
}
