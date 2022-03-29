import React from 'react'

import type { NextPage } from 'next'

const toDataURL = (blob: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const Home: NextPage = () => {
  const [previews, setPreviews] = React.useState<string[]>([])
  const submit = React.useCallback((event) => {
    event.preventDefault()
  }, [])
  const fileChanged = React.useCallback(
    async (event) => {
      if (event.target.files.length === 0) return
      for (const file of event.target.files) {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: file.name,
            contents: await toDataURL(file)
          })
        })
        const json = await response.json()
        if (json.result === 'OK' && !previews.includes(file.name)) {
          setPreviews([...previews, file.name])
        }
      }
    },
    [previews]
  )
  return (
    <div>
      <form onSubmit={submit}>
        <input name="file" type="file" onChange={fileChanged} />
      </form>
      {previews.map((preview, index) => (
        <img key={index} src={`/images/${preview}`} alt={preview} />
      ))}
    </div>
  )
}

export default Home
