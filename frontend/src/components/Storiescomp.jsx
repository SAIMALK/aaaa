import { Link } from 'react-router-dom';
// import Rating from './Rating';
import LazyLoad from "react-lazyload";

const Storiescomp = ({ story }) => {
  return (
    
      
    <li className="zoomed-landing-page">
    <LazyLoad>
    <Link to={`/story/${story._id}`}>
      <img
        src={story.cover}
        alt="loading cover..."
        loading="lazy"
      
        style={{ width: "190px" }}
      />
      </Link>
    </LazyLoad>
    <Link to={`/story/${story._id}`}>
  <div className="overlay">
    <span style={{ color: "white !important" }}>{story.title}</span>
  </div>
</Link>

  </li>
   
)}

    export default Storiescomp;