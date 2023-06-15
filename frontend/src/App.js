import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import Main from './components/Main'
import store from './store/store'
import { loadUser } from './actions/authActions'
import { BrowserRouter } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  )
}

export default App
