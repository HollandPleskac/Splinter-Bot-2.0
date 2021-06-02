import '../styles/styles.css'
import { AuthContextProvider } from '../context/authContext'
import initFirebase from '../firebase/initFirebase'
import ProtectRoute from '../components/protectRoute'

initFirebase()

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      {/* <ProtectRoute> */}
      <Component {...pageProps} />
      {/* </ProtectRoute> */}
    </AuthContextProvider>
  )
}

export default MyApp

// TODO
/*
  Dashboard
  restyle the button

*/