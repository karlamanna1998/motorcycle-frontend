"use client"
import "./motorcycles.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import '../../node_modules/react-toastify/dist/ReactToastify.css';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoaderContext } from "../context/loaderContext";
import Paginate from "../components/pagination/Paginate";
import {getAllBrandForDropdown} from "../helper"

const initialFormState = {
    motorcycle_name : "",
    brand : "",
    display_image : null
}
export default function Mototcycles(){
    const [allMotorcycles, setallMotorcycles] = useState([]);
    const [allBrands, setallBrands] = useState([]);
    const [editImage , setEditImage] = useState("");
    const [imageName, setImageName] = useState("");
    const [currPage, setCurrPage] = useState(1);
    const [totalDocs, setTotalDocs] = useState()
    const [update, setUpdate] = useState(false)
    const [editID , setEditId] = useState("")
    const [formData , setFormData] = useState(initialFormState)
    const loadingContext = useContext(LoaderContext)

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
                    // UpdateBrand()
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
                        toast.error("Please select Image", {
                            position: toast.POSITION.BOTTOM_RIGHT
                        });
                    }
                }
            });
        }

    };

    const addMotorcycle = async () => {
        loadingContext.setLoading(true)
        try {
          if(formData.display_image != null){
            let formdata = new FormData();
            formdata.append("motorcycle_name", formData.motorcycle_name);
            formdata.append("display_image", formData.display_image);
            formdata.append("brand", formData.brand);
            const response = await axios.post('http://localhost:5000/api/v1/admin/motorcycle/add-motorcycle', formdata, {
              headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
              },
            });
            setFormData(initialFormState)
            setImageName("")
            toast.success(response.data.message, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
            loadingContext.setLoading(false)
            getAllMotorcycles(currPage)
          }
        } catch (err: any) {
          toast.error(err.message, {
            position: toast.POSITION.BOTTOM_RIGHT
          });
          loadingContext.setLoading(false)
        }
      }

    const handleDelete = (data: any) => {
        // Handle form submission logic
        Swal.fire({
          title: "Are You Sure You Want To Delete?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "hsl(220, 24%, 12%)",
          cancelButtonColor: "hsl(0, 0%, 37%)",
          confirmButtonText: "OK",
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            // deleteBrand(data)
          }
        });
      };
    

    const handleEdit = async (motorCycleData : any)=>{
        setFormData({
          brand: motorCycleData.brand,
          display_image : null,
          motorcycle_name : motorCycleData.motorcycle_name
        })
        setEditId(motorCycleData._id);
        setUpdate(true)
        setEditImage(motorCycleData.display_image)
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
        loadingContext.setLoading(true)
        try {
          let all_motorcycles = await axios.get(`http://localhost:5000/api/v1/admin/motorcycle/get-motorcycle?page=${page}&pageSize=${10}`)
          setallMotorcycles(all_motorcycles.data.data)
          setTotalDocs(all_motorcycles.data.total_docs)
          setCurrPage(page);
          loadingContext.setLoading(false)
        } catch (err: any) {
          loadingContext.setLoading(false)
          toast.error(err.message, { position: toast.POSITION.BOTTOM_RIGHT });
        }
      }

      const displayImage = (imageUrl : string)=>{
        Swal.fire({
            imageUrl: imageUrl,
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
        }finally{
            getAllMotorcycles(1)  
        }   
        })()
      },[])

  return (
    <div className="page_container">
      <div className="title_bar"><span className="title">MOTORCYCLE's</span></div>
      <div className="row">
        <div className="col-md-4">
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
              <div className="input_box file_container">
                <input type="file" value={imageName} className="form-control mb-3"  accept="image/*" onChange={(e: any) => {
                  setFormData((prev)=>({...prev , display_image : e.target.files[0]}))
                  setImageName(e.target.value)
                }} />
              </div>
              {
                formData.display_image ? <div className="display_image_container"><img className="display_image" src={URL.createObjectURL(formData.display_image)}/></div>
                : editImage ? <div className="display_image_container"><img className="display_image" src={editImage}/></div>
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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  allMotorcycles && allMotorcycles.map((motorcycle: any, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{(10 * currPage + 1) - 10 + i}</th>
                        <td><img className="logo_img" src={motorcycle.display_image_url} onClick={()=>displayImage(motorcycle.display_image_url)}/></td>
                        <td>{motorcycle.motorcycle_name}</td>
                        <td>
                          <img className="edit_icon" src="./edit.svg" onClick={()=>handleEdit(motorcycle)}/>
                          <img className="delete_icon" src="./delete.svg" onClick={() => handleDelete(motorcycle)} />
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <Paginate totalDocsInPage={10} docLength={allMotorcycles.length} currPage={currPage} totalDocs={totalDocs} pageCHange={pageCHange} />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
