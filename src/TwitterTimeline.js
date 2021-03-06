import React, { useEffect } from 'react'

import Box from '@material-ui/core/Box'

export default function TwitterTimeline({ accountName }) {
  const elementId = `twitter-timeline-${accountName}`

  useEffect(() => {
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.createTimeline(
        {
          sourceType: 'profile',
          screenName: accountName,
        },
        document.getElementById(elementId),
        {
          theme: 'dark',
          height: '500',
          dnt: true,
          chrome: 'transparent nofooter',
        }
      )
    }
  }, [accountName, elementId])

  return <Box id={elementId} />
}
