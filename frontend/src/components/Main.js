import { Routes, Route, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import AddItem from './AddItem'
import Home from './Home'
import Cart from './Cart'
import Orders from './Order'

function Main() {
  return (
    <div>
      <Routes>
        <Route path='/home' element={<Home/>}>
        </Route>
        <Route path='/addItem' element={<AddItem/>}>
        </Route>
        <Route path='/cart' element={<Cart/>}>
        </Route>
        <Route path='/orders' element={<Orders/>}>
        </Route>
        <Route path='/' element={<Navigate to='/home'/>} />
      </Routes>
    </div>
  )
}

export default connect()(Main)
