import * as Express from 'express'
import * as BodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import * as morgan from 'morgan'
import { Play } from './class'
import { YoutubeAudioService, TtsAudioService } from './class/AudioServices'
import { v4 } from 'internal-ip'

dotenv.config()

class Main {
  private _port: number
  private _host: string
  private _expressApp: Express.Express
  private _play: Play
  private _ttsAudioService: TtsAudioService
  private _youtubeAudioService: YoutubeAudioService

  constructor(host?: string, port?: number, lang?: string) {
    this._port = port || Number(process.env.port)
    this._host = host || process.env.host
    this._play = new Play()
    this._ttsAudioService = new TtsAudioService()
    this._youtubeAudioService = new YoutubeAudioService()
    this._expressApp = Express()
    this._expressApp.use(morgan('dev'))
  }

  public start() {
    this._expressApp.use(BodyParser.json())
    this._expressApp.use(BodyParser.urlencoded({ extended: true }))
    this._expressApp.use(Express.static('client/build'))

    const api = Express.Router()
    api.post('/playmusic', this._play.play.bind(this._play))
    api.post('/playtts', this._play.tts.bind(this._play))
    api.post('/stop', this._play.stop.bind(this._play))
    api.get('/youtube/:link', this._youtubeAudioService.play.bind(this._youtubeAudioService))
    api.get('/tts/:textToSpeech', this._ttsAudioService.play.bind(this._ttsAudioService))
    this._expressApp.use('/api', api)

    this._expressApp.listen(
      this._port,
      this._host,
      () => console.log(`Listening to ${this._host}:${this._port}`)
    )
  }
}

const app = new Main(v4.sync())
app.start()
