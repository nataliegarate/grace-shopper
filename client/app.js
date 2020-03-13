import React from 'react'

import {Navbar} from './components'
import Footer from './components/Footer'
import Routes from './routes'

const App = () => {
  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Kaushan+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <Navbar />
      <Routes />
      <Footer />
    </>
  )
}

export default App
