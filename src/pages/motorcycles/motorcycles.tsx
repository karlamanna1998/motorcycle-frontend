import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { getAllBrandForDropdown } from "../../helper";
import './motorcycles.css'
import Paginate from "../../components/paginate/paginate";
import { setLoader } from "../../slices/loader";
import { useAppDispatch } from "../../hooks";
const initialFormState = {
    motorcycle_name : "",
    brand : "",
    display_image : null,
    status : "",
    type : ""
}

export default function Motorcycles(){
    const [allMotorcycles, setallMotorcycles] = useState([]);
    const [allBrands, setallBrands] = useState([]);
    const [editImage , setEditImage] = useState("");
    const [imageName, setImageName] = useState("");
    const [currPage, setCurrPage] = useState(1);
    const [totalDocs, setTotalDocs] = useState()
    const [update, setUpdate] = useState(false)
    const [editID , setEditId] = useState("")
    const [formData , setFormData] = useState(initialFormState)
    const [selectedBrand , setSelectedBrand] = useState("")
    const dispatch = useAppDispatch()
    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (update) {
            Swal.fire({
                title: "Are You Sure You Want To Update?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "hsl(220, 24%, 12%)",
                cancelButtonColor: "hsl(0, 0%, 37%)",
                confirmButtonText: "OK",
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    updateMotorcycle()
                }
            });
        } else {
            // Handle form submission logic
            Swal.fire({
                title: "Are You Sure You Want To Add?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "hsl(220, 24%, 12%)",
                cancelButtonColor: "hsl(0, 0%, 37%)",
                confirmButtonText: "OK",
                allowOutsideClick: false,
                allowEscapeKey: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    if (formData.display_image) {
                        addMotorcycle()
                    } else {
                        toast.error("Please select Image");
                    }
                }
            });
        }

    };

    const addMotorcycle = async () => {
      dispatch(setLoader(true))
        try {
          if(formData.display_image != null){
            let formdata = new FormData();
            formdata.append("motorcycle_name", formData.motorcycle_name);
            formdata.append("display_image", formData.display_image);
            formdata.append("brand", formData.brand);
            formdata.append("status", formData.status);
            formdata.append("type", formData.type);
            const response = await axios.post('http://localhost:5000/api/v1/admin/motorcycle/add-motorcycle', formdata, {
              headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
              },
            });
            setFormData(initialFormState)
            setImageName("")
            toast.success(response.data.message);
            getAllMotorcycles(currPage)
          }
        } catch (err: any) {
          dispatch(setLoader(false))
          toast.error(err.message);
        }
      }

      const updateMotorcycle = async () => {
        dispatch(setLoader(true))
        try {
            let formdata = new FormData();
            if(formData.display_image != null){  formdata.append("display_image", formData.display_image);}
            formdata.append("motorcycle_name", formData.motorcycle_name);
            formdata.append("brand", formData.brand);
            formdata.append("status", formData.status);
            formdata.append("type", formData.type);
            const response = await axios.put(`http://localhost:5000/api/v1/admin/motorcycle/update-motorcycle/${editID}`, formdata, {
              headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
              },
            });
            setFormData(initialFormState)
            setImageName("")
            setEditImage("")
            toast.success(response.data.message);
            setUpdate(false)
            getAllMotorcycles(currPage)
        } catch (err: any) {
          dispatch(setLoader(false))
          toast.error(err.message);
        }
      }

    const handleEdit = async (motorCycleData : any)=>{
      console.log(motorCycleData);
      
        setFormData({
          brand: motorCycleData.brand,
          display_image : null,
          motorcycle_name : motorCycleData.motorcycle_name,
          status : motorCycleData.status,
          type : motorCycleData.type
        })
        setEditId(motorCycleData._id);
        setUpdate(true)
        setEditImage(motorCycleData.display_image_url)
    }
  
    const handleCancelEdit = ()=>{
      setFormData(initialFormState)
      setEditId("")
      setEditImage("")
      setImageName("")
      setUpdate(false)
    }

    const pageCHange = (pageNumber: number) => {
        // getallMotorcycles(pageNumber);
      }

      const getAllMotorcycles = async (page: any) => {
        dispatch(setLoader(true))
        try {
          let all_motorcycles = await axios.get(`http://localhost:5000/api/v1/admin/motorcycle/get-motorcycle?page=${page}&pageSize=${10}&brand=${selectedBrand}`)
          setallMotorcycles(all_motorcycles.data.data)
          setTotalDocs(all_motorcycles.data.total_docs)
          setCurrPage(page);
          dispatch(setLoader(false))
        } catch (err: any) {
          dispatch(setLoader(false))
          toast.error(err.message);
        }
      }

      const displayImage = (imageUrl : string)=>{
        Swal.fire({
            imageUrl: process.env.REACT_APP_NEXT_PUBLIC_MEDIA_BASE_URL + imageUrl,
            imageWidth: 600,
            imageAlt: "Display Image",
            showCloseButton : true,
            showConfirmButton : false,
            heightAuto: true,
            width : 800
          });
      }

      useEffect(()=>{
        (async ()=>{
         
        try{
           let allBrandss = await getAllBrandForDropdown()
           setallBrands(allBrandss.data);
        }catch(err){
            console.log("Failed to get all Brand for dropdown");
        }  
        })()
      },[])

      useEffect(()=>{
        getAllMotorcycles(1)
      }, [selectedBrand])
return (
    <div className="page_container">
    <div className="title_bar">
      <span className="title">MOTORCYCLE's</span>
      <div>
      <select className="form-select" value={selectedBrand} onChange={(e)=>setSelectedBrand(e.target.value)}>
                        <option value={""}>All Brand</option>
                        {
                            allBrands.length && allBrands.map((item: any, i) => (
                                <option value={item._id} key={i}>{item.brand_name}</option>
                            ))
                        }
      </select>
      </div>
   
    </div>
    <div className="row">
      <div className="col-md-4 pe-md-0">
        <div className="left_container">
          <div className="title">ADD Motorcycle</div>

          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="input_box">
              <input type="text" id="name" className="input" name="brand_name" placeholder="Motorcycle Name" onChange={(e)=> setFormData((prev)=>({...prev , motorcycle_name : e.target.value}))}
                value={formData.motorcycle_name}  required/>
            </div>
            <div className="input_box">
              <select onChange={(e)=> setFormData((prev)=>({...prev , brand : e.target.value}))} value={formData.brand} required>
                  <option value={""}>Select Brand</option>
                  {
                    allBrands.length && allBrands.map((item : any, i)=>(
                           <option value={item._id} key={i}>{item.brand_name}</option>
                      ))
                  }
              </select>
            </div>
            <div className="input_box">
              <select onChange={(e)=> setFormData((prev)=>({...prev , status : e.target.value}))} value={formData.status} required>
                  <option value={""}>Select Status</option>
                  <option value={"active"}>Active</option>
                  <option value={"inactive"}>InActive</option>
              </select>
            </div>
            <div className="input_box">
              <select onChange={(e)=> setFormData((prev)=>({...prev , type : e.target.value}))} value={formData.type} required>
                  <option value={""}>Select Type</option>
                  <option value={"IC"}>Internal Combusion</option>
                  <option value={"ELECTRIC"}>Electric</option>
              </select>
            </div>
            <div className="input_box file_container">
              <input type="file" value={imageName} className="form-control mb-3"  accept="image/*" onChange={(e: any) => {
                setFormData((prev)=>({...prev , display_image : e.target.files[0]}))
                setImageName(e.target.value)
              }} />
            </div>
            {
              formData.display_image ? <div className="display_image_container"><img className="display_image" src={URL.createObjectURL(formData.display_image)}/></div>
              : editImage ? <div className="display_image_container"><img className="display_image" src={process.env.REACT_APP_NEXT_PUBLIC_MEDIA_BASE_URL + editImage}/></div>
              : null
              
            }
            {!update && <div><button type="submit" className="add_btn">ADD MOTORCYCLE</button></div>}
            {update &&
              <>
                <div><button type="submit" className="add_btn">UPDATE MOTORCYCLE</button></div>
                <div><button className="cancel_btn" onClick={handleCancelEdit}>CANCEL</button></div>
              </>
            }
          </form>
        </div>
      </div>
      <div className="col-md-8">
        <div className="right_container">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">SL.NO</th>
                <th scope="col">Display Image</th>
                <th  scope="col">Motorcycle Name</th>
                <th  scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                allMotorcycles && allMotorcycles.map((motorcycle: any, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{(10 * currPage + 1) - 10 + i}</th>
                      <td><img className="logo_img" src={process.env.REACT_APP_NEXT_PUBLIC_MEDIA_BASE_URL + motorcycle.display_image_url} onClick={()=>displayImage(motorcycle.display_image_url)}/></td>
                      <td>{motorcycle.motorcycle_name}</td>
                      <td>{motorcycle.status}</td>
                      <td>
                        <img className="edit_icon" src="./edit.svg" onClick={()=>handleEdit(motorcycle)}/>
                      </td>
                    </tr>
                  )
                })
              }
             
            </tbody>
          </table>
          {
                allMotorcycles.length == 0 && <h4 className="text-center">NO DATA AVAILABLE</h4>
              }
        </div>
        <Paginate totalDocsInPage={10} docLength={allMotorcycles.length} currPage={currPage} totalDocs={totalDocs} pageCHange={pageCHange} />
      </div>
    </div>
    <ToastContainer />
  </div>
)
}