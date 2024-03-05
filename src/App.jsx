import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { useState } from "react"
import { LocationContext } from "./components/LocationContext";

function App() {
  const [location, setLocation] = useState({
    address: '',
    city: '',
    utc: '',
    isprovider: '',
    location: ''
  });

  return (
    <LocationContext.Provider value={{location, setLocation}}>
      <Header />
      <Footer />
    </LocationContext.Provider>
  )
}

export default App
