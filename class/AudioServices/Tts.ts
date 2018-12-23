import { AudioService } from '.'
import { Request, Response } from 'express'
import { IPlayTts } from '../../types'
const NodeGtts = require('node-gtts')

export class TtsAudioService extends AudioService {
  private _lang: string = 'fr'

  public get Lang() {
    return this._lang
  }

  public set Lang(lang) {
    this._lang = lang
  }

  public constructor(lang?: string) {
    super()
    this.Lang = lang
  }

  public play(req: Request, res: Response) {
    let datas: IPlayTts = req.params

    if (!datas.textToSpeech) {
      res.status(400).send({
        status: 'error',
        message: 'You must specify the text to speech'
      })
      return
    }

    res.set({ 'Content-Type': 'audio/mpeg' })
    NodeGtts(this.Lang).stream(datas.textToSpeech).pipe(res)
  }
}