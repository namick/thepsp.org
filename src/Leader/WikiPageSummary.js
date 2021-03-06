import React from 'react'
import wiki from 'wikijs'
import Typography from '@material-ui/core/Typography'

export default function WikiPageSummary({ leader }) {
  const [blurb, setBlurb] = React.useState()

  const federal = leader.LegType === 'FL'

  React.useEffect(() => {
    wiki({ apiUrl: 'https://en.wikipedia.org/w/api.php' })
      .page(`${leader.FirstName} ${leader.LastName}`)
      .then(page => page.summary())
      .then(summary => {
        setBlurb(summary)
      })
  }, [leader.FirstName, leader.LastName])

  if (!federal) return null

  return (
    <Typography variant="body2" align="left" gutterBottom>
      {blurb}
    </Typography>
  )
}
