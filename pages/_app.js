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

  Account
  have a modal that you can click on to close
  clear email and passwords after closing the modal
  lock update button until the user enters some information to start

  Dashboard
  restyle the button

*/