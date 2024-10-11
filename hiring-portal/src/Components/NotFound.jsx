import '../CSS/NotFound.css'
import {Link} from 'react-router-dom'
const NotFound = () => (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
        alt="not found"
        className="not-found-img"
      />
      <Link to="/">
      <button className="button">
        Back To Home
      </button>
      </Link>
    </div>
  )
  
  export default NotFound