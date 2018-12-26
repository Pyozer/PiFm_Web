import * as Express from 'express'
import * as BodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import * as morgan from 'morgan'
import { Play } from './class'
import { YoutubeAudioService, TtsAudioService } from './class/AudioServices'
import { v4 } from 'internal-ip'

dotenv.config()

export class Main {
  public static readonly Port: number = Number(process.env.port) || 3000
  public static readonly Host: string = process.env.host || v4.sync() || 'localhost'
  private _expressApp: Express.Express
  private _play: Play
  private _ttsAudioService: TtsAudioService
  private _youtubeAudioService: YoutubeAudioService

  constructor() {
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
      Main.Port,
      Main.Host,
      () => console.log(`Listening to ${Main.Host}:${Main.Port}`)
    )
  }
}

const app = new Main()
app.start()
