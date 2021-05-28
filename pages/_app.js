import '../styles/styles.css'
import { AuthContextProvider } from '../context/authContext'
import initFirebase from '../firebase/initFirebase'

initFirebase()

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp

// TODO
/*
  Dashboard
  restyle the button

*/