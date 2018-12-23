import { Request, Response } from 'express'
import { IPlayMusic, IPlayTts, ISetLang } from '../types'
import { exec, cd } from 'shelljs'
const NodeGtts = require('node-gtts')

export class Play {
  private _gtts = NodeGtts('en')
  private _lang: string

  public set Lang(lang: string) {
    this._lang = lang
    this._gtts = NodeGtts(lang)
  }
  public get Lang() {
    return this._lang
  }

  public constructor(lang?: string) {
    if (lang) {
      this.Lang = lang
    }
  }

  public music(req: Request, res: Response) {
    let datas: IPlayMusic = req.body

    if (datas.streamURL) {
      res.status(400).send({
        status: 'error',
        message: 'You must to specify the audio stream URL'
      })
      return
    }

    if (!Play.isRadioInfoCorrect(datas)) {
      res.status(400).send({
        status: 'error',
        message: 'You must to specify the name, the text, and the radio frequency between 87.5 and 108.0'
      })
      return
    }

    const isYoutubeLink = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/.test(datas.streamURL)
    console.log(isYoutubeLink)

    cd('/home/pi/PiFmRds/src/')
    
    let freq = parseFloat(datas.radioFrequency).toFixed(1)
    const cmd = `ffmpeg -i ${datas.streamURL} -f wav - | sudo ./pi_fm_rds -freq ${freq} -ps "${datas.radioName}" -rt "${datas.radioText}" -audio -`

    exec(cmd, (code, stdout, stderr) => {
      console.log('Exit code:', code)
      console.log('Program output:', stdout)
      console.log('Program stderr:', stderr)
    })

    res.status(200).send({
      status: 'success',
      message: 'Streaming audio successfully send to radio'
    })
  }

  public tts(req: Request, res: Response) {
    let datas: IPlayTts = req.body

    if (!datas.textToSpeech) {
      res.status(400).send({
        status: 'error',
        message: 'You must specify the text to speech'
      })
      return
    }

    res.set({'Content-Type': 'audio/mpeg'})
    this._gtts.stream(datas.textToSpeech).pipe(res)
    this.music(req, res)
  }

  public setLang(req: Request, res: Response) {
    const datas: ISetLang = req.body

    if (!datas.lang) {
      res.status(400).send({
        status: 'error',
        message: 'You must specify the lang'
      })
      return
    }

    this.Lang = datas.lang
  }

  private static isRadioInfoCorrect(data: IPlayMusic) {
    let freq: number = 0
  
    if (data.radioFrequency) {
      freq = parseFloat(data.radioFrequency)
    }
  
    return (
      data.radioName && data.radioName.length > 0 &&
      data.radioText && data.radioText.length > 0 &&
      data.radioFrequency && freq >= 87.5 && freq <= 108.0
    )
  }
}
