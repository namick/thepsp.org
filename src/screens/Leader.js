import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'

import Screen from '../Screen'
import ActualLeader from '../Leader'
import { useFirebase } from '../firebase'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
})

export default function Leader() {
  const params = useParams()
  const { db } = useFirebase()
  const [leader, setLeader] = React.useState()
  const classes = useStyles()

  React.useEffect(() => {
    ;(async () => {
      const snapshot = await db
        .collectionGroup('leaders')
        .where('permaLink', '==', params.id)
        .get()
      setLeader(snapshot.docs[0].data())
    })()
  }, [db, params])

  if (!leader) return null

  return (
    <Screen>
      <div className={classes.root}>{leader && <ActualLeader leader={leader} />}</div>
    </Screen>
  )
}
