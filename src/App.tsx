import Navbar from "./Navbar"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Play from "./pages/Play"
import {Route, Routes} from "react-router-dom"
import { PointsProvider } from "./PointsContext"

function App() {
  return (
      <>
        <PointsProvider>
          <Navbar/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/play" element={<Play/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </div>
        </PointsProvider>
      
    </>
    
    
    
  )
}

export default App
