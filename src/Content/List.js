import React from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import Tab from '@material-ui/core/Tab'

import { useContentCollection } from '../utilities/firebase'
import UpdateButtons from './UpdateButtons'

function ContentItem({ content }) {
  return (
    <Box m={2} key={content.docId}>
      <Paper>
        <Box p={2} key={content.docId}>
          <h2>{content.title}</h2>
          <p>{content.blurb}</p>
          <UpdateButtons content={content} />
        </Box>
      </Paper>
    </Box>
  )
}

function ContentCategory({ category }) {
  const [docs] = useContentCollection(category)

  if (!docs) return null
  console.log(docs)
  return (
    <>
      {docs.map((doc, i) => (
        <ContentItem content={doc} key={i} />
      ))}
    </>
  )
}

function TabPanel({ children, value, index }) {
  if (value !== index) return null

  return (
    <Typography component="div" role="tabpanel">
      {children}
    </Typography>
  )
}

export default function List() {
  const [tabIndex, setTabIndex] = React.useState(0)

  const handleChange = (event, newValue) => setTabIndex(newValue)

  return (
    <>
      <Box m={2}>
        <AppBar position="static" style={{ borderRadius: '8px' }}>
          <Tabs value={tabIndex} onChange={handleChange} textColor="secondary" centered>
            <Tab label="None" />
            <Tab label="Events" />
            <Tab label="Updates" />
            <Tab label="Articles" />
          </Tabs>
        </AppBar>
      </Box>

      <TabPanel value={tabIndex} index={0}>
        <ContentCategory category="" />
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <ContentCategory category="events" />
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <ContentCategory category="updates" />
      </TabPanel>

      <TabPanel value={tabIndex} index={3}>
        <ContentCategory category="articles" />
      </TabPanel>
    </>
  )
}
