import * as Express from 'express'
import * as BodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import * as morgan from 'morgan'
import { Play } from './class'

dotenv.config()

class main {
  private _port: number
  private _host: string
  private _expressApp: Express.Express
  private _play: Play

  constructor(port?: number, host?: string, lang?: string) {
    this._port = port || Number(process.env.port)
    this._host = host || process.env.host
    this._play = new Play(lang)
    this._expressApp = Express()
    this._expressApp.use(morgan('dev'))
  }

  public start() {
    this._expressApp.use(BodyParser.json())
    this._expressApp.use(BodyParser.urlencoded({ extended: true }))
    this._expressApp.use(Express.static('client/build'))

    const api = Express.Router()
    api.post('/playmusic', this._play.music)
    api.post('/playtts', this._play.tts)
    api.post('/lang', this._play.setLang)
    this._expressApp.use('/api', api)

    this._expressApp.listen(
      this._port,
      this._host,
      () => console.log(`Listening to port ${this._port}`)
    )
  }
}

const app = new main()
app.start()
