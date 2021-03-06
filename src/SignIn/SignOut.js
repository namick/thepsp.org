import React from 'react'
import { Redirect } from 'react-router-dom'
import Box from '@material-ui/core/Box'

import useHomePath from '../utilities/useHomePath'
import { useFirebase, useUser } from '../utilities/firebase'
import { H1 } from '../utilities/formating'

export default function SignOut() {
  const homePath = useHomePath()
  const { auth } = useFirebase()
  const [user, initializing] = useUser()

  React.useEffect(() => {
    auth.signOut()
  })

  if (user || initializing) {
    return (
      <Box m={3}>
        <H1>Signing you out...</H1>
      </Box>
    )
  } else {
    return <Redirect to={homePath} />
  }
}
