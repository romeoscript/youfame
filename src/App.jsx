
import './App.css'
import Header from "./component/header/Header"
import Body from "./component/body/Body"
// import Review from "./component/review/Review"
import Services from "./component/services/Services"
import Footer from "./component/footer/Footer"
import YouTubeLinkFetcher from './Search'

function App() {

  return (
    <div>
      <Header />
      <Body />
      {/* <Review /> */}
      <YouTubeLinkFetcher />
      <Services />
      <Footer />
    </div>
  )
}

export default App
