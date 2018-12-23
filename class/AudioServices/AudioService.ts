import { Request, Response } from 'express'

export abstract class AudioService {
  public abstract play(req: Request, res: Response)
}
