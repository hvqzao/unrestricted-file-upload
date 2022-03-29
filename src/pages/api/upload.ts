// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from 'node:fs'

import type { NextApiRequest, NextApiResponse } from 'next'

type Result = {
  result: string
}

const fromDataURL = (data: string) => {
  if (!data.startsWith('data:') || !data.includes(',')) return
  const contents = data.slice(data.indexOf(',') + 1)
  return data.includes(';base64,')
    ? Buffer.from(contents, 'base64')
    : Buffer.from(contents)
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>
) {
  const name = req.body.name
  const contents = fromDataURL(req.body.contents)
  if (contents) {
    fs.writeFileSync(`public/images/${name}`, contents)
    res.status(200).send({ result: 'OK' })
  } else {
    res.status(200).send({ result: 'Failed' })
  }
}
