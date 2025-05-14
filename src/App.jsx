import {  ToastContainer, Zoom } from 'react-toastify'
import './App.css'
import Home from './pages/Home'


function App() {
  

  return (
    <>
    <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Zoom}
      />
     <Home/>
    </>
  )
}

export default App
