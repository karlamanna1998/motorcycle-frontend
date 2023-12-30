import { LoaderContext } from "@/app/context/loaderContext"
import { useContext } from "react"

export default function Loader(){
    const loadingContext  = useContext(LoaderContext)
  return (
    <>
    { loadingContext.loading &&
 <div className="loader_container">
 <img src="./loading-loading-forever.gif"/>
</div>
    }
    </>
   
  )
}
