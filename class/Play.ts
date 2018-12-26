import { Request, Response } from 'express'
import { IPlay, IPlayTts } from '../types'
import { exec, cd } from 'shelljs'
import { Main } from '../Main'

export class Play {
  public play(req: Request, res: Response) {
    let datas: IPlay = req.body

    if (!datas.streamURL) {
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

    if (isYoutubeLink) {
      datas.streamURL = this.getApiUrl(`youtube/${encodeURIComponent(datas.streamURL)}`)
    }

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
    req.body.streamURL = this.getApiUrl(`tts/${encodeURI(datas.textToSpeech)}`)
    this.play(req, res)
  }

  public stop(req: Request, res: Response) {
    req.body.textToSpeech = ' '
    this.tts(req, res)
  }

  private static isRadioInfoCorrect(data: IPlay) {
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

  private getApiUrl(url: string) {
    return `http://${Main.Host}:${Main.Port}/api/${url}`
  }
}
