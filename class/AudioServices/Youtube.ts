import { AudioService } from '.'
import { Request, Response } from 'express'
import { IPlayYT } from '../../types'
const YoutubeStream = require('youtube-audio-stream')

export class YoutubeAudioService extends AudioService {
  public play(req: Request, res: Response) {
    let datas: IPlayYT = req.params
    datas.link = decodeURIComponent(datas.link)
  
    if (!datas.link) {
      res.status(400).send({
        status: 'error',
        message: 'You must specify the link'
      })
      return
    }

    try {
      YoutubeStream(datas.link).pipe(res)
    } catch (exception) {
      res.status(500).send(exception)
    }
  }
}