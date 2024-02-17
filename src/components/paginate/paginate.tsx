import "./paginate.css";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
export default function Paginate({totalDocsInPage , docLength, currPage, totalDocs , pageCHange} : any) {
  function createArrayFromNumber(number : number) {
    let resultArray = [];
    for (let i = 1; i <= number; i++) {
        resultArray.push(i);
    }
    return resultArray;
}
  return (
    <div className="pagination_container">
        <div>Showing {((10 * currPage +1  ) -totalDocsInPage ) } to {docLength +  ((totalDocsInPage * currPage)- totalDocsInPage) } of {totalDocs} Docs</div>
        <div className="buttons_container">
            <button className="paninate_button" onClick={()=>pageCHange(currPage - 1)} disabled={currPage == 1}><ArrowLeftIcon/>Prev</button>
            {
              createArrayFromNumber(Math.ceil(totalDocs/totalDocsInPage)).map((item, i)=>{
                return (
                 <button onClick={()=>pageCHange(i + 1)} className={`paninate_button_number ${currPage == (i + 1) ? "active" :""}`}>{i+1}</button>
                )
              })
            }
            
            <button className="paninate_button" onClick={()=>pageCHange(currPage + 1)} disabled={Math.ceil(totalDocs/totalDocsInPage) == currPage}>Next<ArrowRightIcon/></button>
        </div>
    </div>
  )
}
