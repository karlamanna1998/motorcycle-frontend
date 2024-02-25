import { Audio, InfinitySpin, ThreeCircles } from "react-loader-spinner";
import "./loader.css"

export default function Loader() {
    return (
        <div className="loader_wrapper">
           <ThreeCircles
  visible={true}
  height="100"
  width="100"
  color="#171c26"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
  <h4 className="mt-3">LOADING..</h4>
        </div>
    )
}