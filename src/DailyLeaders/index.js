import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import EmailIcon from 'mdi-material-ui/Email'
import FacebookIcon from 'mdi-material-ui/FacebookBox'
import TwitterIcon from 'mdi-material-ui/TwitterBox'
import InstagramIcon from 'mdi-material-ui/Instagram'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'

import { withFirebase } from '../firebase'
import ExpansionPanel from './ExpansionPanel'
import TwitterTimeline from './TwitterTimeline'
import { useStateCode } from '../utilities/states'

const useStyles = makeStyles(theme => ({
  img: {
    width: '100%',
    borderRadius: theme.shape.borderRadius,
  },
}))

const src = leader => {
  return `https://firebasestorage.googleapis.com/v0/b/repsp123-leaders/o/${leader.PhotoFile}?alt=media`
}

const LeaderGridItem = ({ leader }) => {
  const classes = useStyles()
  return (
    <Grid item xs={4}>
      <Link component={RouterLink} to={`/leader/${leader.permaLink}`}>
        <img src={src(leader)} alt="Leader" className={classes.img} />
      </Link>
    </Grid>
  )
}

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  )
}

const DailyLeaders = ({ db }) => {
  const stateCode = useStateCode()
  const [post, setPost] = useState()
  const classes = useStyles()

  useEffect(() => {
    ; (async () => {
      const snap = await db
        .collection(`/states/${stateCode}/posts/`)
        .orderBy('dateID', 'desc')
        .limit(1)
        .get()
      setPost(snap.docs[0].data())
    })()
  }, [db, stateCode])

  const [tabIndex, setTabIndex] = React.useState(0)

  function handleChange (event, newIndex) {
    setTabIndex(newIndex)
  }

  if (!post) return null

  return (
    <Box bgcolor="common.black" m={2} borderRadius="borderRadius">
      <AppBar position="static">
        <Tabs value={tabIndex} onChange={handleChange}>
          <Tab label="Today" />
          <Tab label={<EmailIcon />} />
          <Tab label={<FacebookIcon />} />
          <Tab label={<TwitterIcon />} />
          <Tab label={<InstagramIcon />} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabIndex} index={0}>
        <Box mb={1} textAlign="center">
          <Typography>{moment(post.dateID).format('dddd, MMMM Do')}</Typography>
        </Box>
        <Box
          my={2}
          className={classes.today}
          fontWeight="bold"
          textAlign="center"
        >
          <Typography variant="h5">Today we are praying for</Typography>
        </Box>
        <Box my={1} p={1}>
          <Grid container spacing={3} justify="space-evenly">
            {[post.leader1, post.leader2, post.leader3].map((leader, i) => (
              <LeaderGridItem leader={leader} key={i} />
            ))}
          </Grid>
        </Box>
        <Box my={2} display="block">
          {[post.leader1, post.leader2, post.leader3].map((leader, i) => (
            <ExpansionPanel leader={leader} key={i} />
          ))}
        </Box>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        Subscribe via Email
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        Follow on Facebook
      </TabPanel>
      <TabPanel value={tabIndex} index={3}>
        <TwitterTimeline />
      </TabPanel>
      <TabPanel value={tabIndex} index={4}>
        Follow on Instagram
      </TabPanel>
    </Box>
  )
}
export default withFirebase(DailyLeaders)