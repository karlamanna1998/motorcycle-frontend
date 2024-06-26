import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import './brand.css'
import Paginate from "../../components/paginate/paginate";
import { setLoader } from "../../slices/loader";
import { useAppDispatch } from "../../hooks";
export default function Brand() {

  const [allBrands, setAllBrands] = useState([]);
  const [image, setImage] = useState<null | Blob>(null);
  const [editImage, setEditImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [currPage, setCurrPage] = useState(1);
  const [totalDocs, setTotalDocs] = useState()
  const [update, setUpdate] = useState(false)
  const [editID, setEditId] = useState("")
  const [brandname, setBrandName] = useState("")
  const [slug , setSlug] = useState('')

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
          UpdateBrand()
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
          if (image) {
            addBrand()
          } else {
            toast.error("Please select Image");
          }
        }
      });
    }

  };

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
        deleteBrand(data)
      }
    });
  };

  const addBrand = async () => {
    dispatch(setLoader(true))
    try {
      if (image != null) {
        let formData = new FormData();
        formData.append("brand_name", brandname);
        formData.append("slug", slug);
        formData.append("file", image);
        const response = await axios.post('${process.env.REACT_APP_NEXT_PUBLIC_API_BASE_URL}api/v1/admin/brand/add-brand', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
          },
        });
        setSlug('')
        setBrandName("")
        setImage(null)
        setImageName("")
        toast.success(response.data.message);
        getAllBrands(currPage)
      }

    } catch (err: any) {
      toast.error(err.message);
    }
  }

  const UpdateBrand = async () => {
    dispatch(setLoader(true))
    try {

      let formData = new FormData();
      formData.append("brand_name", brandname);
      formData.append("slug", slug);
      if (image != null) {
        formData.append("file", image);
      }
      const response = await axios.put(`${process.env.REACT_APP_NEXT_PUBLIC_API_BASE_URL}api/v1/admin/brand/update-brand/${editID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      setSlug('')
      setUpdate(false);
      setBrandName("")
      setEditId("")
      setImage(null)
      setImageName("")
      setEditImage("")
      toast.success(response.data.message);
      getAllBrands(currPage)

    } catch (err: any) {
      dispatch(setLoader(false))
      toast.error(err.message);
    }
  }



  const deleteBrand = async (data: any) => {
    dispatch(setLoader(true))
    try {
      const response = await axios.delete(`${process.env.REACT_APP_NEXT_PUBLIC_API_BASE_URL}api/v1/admin/brand/delete-brand/${data._id}`);
      toast.success(response.data.message);
      dispatch(setLoader(false))
      getAllBrands(currPage)
    } catch (err: any) {
      dispatch(setLoader(false))
      toast.error(err.message);
    }
  }


  const getAllBrands = async (page: any) => {
    dispatch(setLoader(true))
    console.log(currPage);

    try {
      let all_brands = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_BASE_URL}api/v1/admin/brand/get-brand?page=${page}&pageSize=${10}`)
      dispatch(setLoader(false))
      setAllBrands(all_brands.data.data)
      setTotalDocs(all_brands.data.total_docs)
      setCurrPage(page);
      dispatch(setLoader(false))
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  const pageCHange = (pageNumber: number) => {
    getAllBrands(pageNumber);
  }

  const handleEdit = async (brandData: any) => {
    setEditId(brandData._id);
    setSlug(brandData.slug)
    setBrandName(brandData.brand_name)
    setUpdate(true)
    setImage(null)
    setEditImage(brandData.logo_url)
  }

  const handleCancelEdit = () => {
    setBrandName("")
    setSlug('')
    setEditId("")
    setImage(null);
    setEditImage("")
    setImageName("")
    setUpdate(false)
  }



  useEffect(() => {
    dispatch(setLoader(true))
    getAllBrands(1)
  }, [])


  return (
    <div className="page_container">
      <div className="title_bar"><span className="title">MOTORCYCLE BRAND'S</span></div>
      <div className="row">
        <div className="col-md-4 pe-md-0">
          <div className="left_container">
            <div className="title">ADD BRAND</div>

            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="input_box">
                <input type="text" id="name" className="input" name="brand_name" placeholder="Brand Name" onChange={(e) => setBrandName(e.target.value)}
                  value={brandname} required />
                {/* {formik.touched.brand_name && formik.errors.brand_name && <div className="error_text">{formik.errors.brand_name}</div>} */}
              </div>
              <div className="input_box">
                <input type="text" id="name" className="input" name="slug" placeholder="Enter Slug" onChange={(e) => setSlug(e.target.value)}
                  value={slug} required />
                {/* {formik.touched.brand_name && formik.errors.brand_name && <div className="error_text">{formik.errors.brand_name}</div>} */}
              </div>
              <div className="input_box file_container">
                <input type="file" value={imageName} className="form-control mb-3" accept="image/*" onChange={(e: any) => {
                  setImage(e.target.files[0])
                  setImageName(e.target.value)
                }} />
              </div>
              {
                image ? <div className="display_image_container"><img className="display_image" src={URL.createObjectURL(image)} /></div>
                  : editImage ? <div className="display_image_container"><img className="display_image" src={process.env.REACT_APP_NEXT_PUBLIC_MEDIA_BASE_URL + editImage} /></div>
                    : null

              }
              {!update && <div><button type="submit" className="add_btn">ADD BRAND</button></div>}
              {update &&
                <>
                  <div><button type="submit" className="add_btn">UPDATE BRAND</button></div>
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
                  <th scope="col">Logo</th>
                  <th scope="col">Brand Name</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  allBrands && allBrands.map((brand: any, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row">{(10 * currPage + 1) - 10 + i}</th>
                        <td><img className="logo_img" src={process.env.REACT_APP_NEXT_PUBLIC_MEDIA_BASE_URL + brand.logo_url} /></td>
                        <td>{brand.brand_name}</td>
                        <td>{brand.slug}</td>
                        <td>
                          <img className="edit_icon" src="./edit.svg" onClick={() => handleEdit(brand)} />
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <Paginate totalDocsInPage={10} docLength={allBrands.length} currPage={currPage} totalDocs={totalDocs} pageCHange={pageCHange} />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}