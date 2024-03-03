import { useEffect, useState } from "react"
import "./uploadImages.css"
import { getAllBrandForDropdown, getAllMotorcyclesForDropdown } from "../../helper";
import { useAppDispatch } from "../../hooks";
import { setLoader } from "../../slices/loader";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

interface fetchedImage {
  images: Array<string> | [],
  _id: string,
  motorcycle : string
}


export default function UploadImages() {
  const dispatch = useAppDispatch()
  const [images, setImages] = useState<FileList | null>(null);
  const [allBrands, setallBrands] = useState([]);
  const [allmotorcycles, setallmotorcycles] = useState([]);
  const [selectedBrand, setselectedBrand] = useState("")
  const [selectedMotorcycle, setselectedMotorcycle] = useState("")
  const [fetchedImageData, setfetchedImageData] = useState<fetchedImage>({
    images: [],
    _id: "",
    motorcycle : ""
  })
  const [viewImage, setViewImage] = useState(false)
  const imageBaseUrl = process.env.REACT_APP_NEXT_PUBLIC_MEDIA_BASE_URL || ""

  function Imagesrender() {
    if (images) {
      const imagesArray = Array.from(images);
      const imageElements = [];
      for (let i = 0; i < imagesArray.length; i++) {
        imageElements.push(
          <div className="image_wrapper">
            <img key={i} src={URL.createObjectURL(imagesArray[i])} />
          </div>
        );
      }
      return imageElements;
    }

  }


  const brandChangeHandler = async (brand: string) => {
    try {
      setselectedBrand(brand);
      let allmotorcycles = await getAllMotorcyclesForDropdown(brand)
      setallmotorcycles(allmotorcycles.data)
      setselectedMotorcycle("")
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(e.nativeEvent.submitter.name);
    if (e.nativeEvent.submitter.name == 'upload') {
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
          if (images && images.length != 0) {
            uploadImages()
          } else {
            toast.error("Please select Image");
          }
        }
      });
    } else {
      getImages()
    }


  };

  async function uploadImages() {
    if (!images) {
      toast.error("No images selected.");
      return;
    }

    dispatch(setLoader(true));
    const formData = new FormData();
    formData.append("brand", selectedBrand);
    formData.append("motorcycle", selectedMotorcycle);
    Array.from(images).forEach(image => {
      formData.append("images", image);
    });

    try {
     const data =  await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_BASE_URL}api/v1/admin/images/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
     toast.success(data.data.message);
      setImages(null);
      dispatch(setLoader(false));
    } catch (error: any) {
      dispatch(setLoader(false));
      toast.error(error.message);
    }
  }



  async function getImages() {
    dispatch(setLoader(true))
    try {
      const data = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_BASE_URL}api/v1/admin/images/list?brand=${selectedBrand}&motorcycle=${selectedMotorcycle}`)
      const result = data.data
      
      if (result.data.length > 0 && result.data[0]?.images?.length > 0) {
        setfetchedImageData(
          {
            images: result.data[0]?.images,
            _id: result.data[0]?._id,
            motorcycle : result.data[0]?.motorcycle
          }
        )
        setViewImage(true)
        dispatch(setLoader(false))
      } else {
        setfetchedImageData(
          {
            images: [],
            _id: "",
            motorcycle : ""
          }
        )
        dispatch(setLoader(false))
        toast.error("No images found");
      }

    } catch (e: any) {
      dispatch(setLoader(false))  
      toast.error(e.message);
    }
  }


  async function deleteImage(id: string, url: string) {

    Swal.fire({
      title: "Are You Sure You Want To Add?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "hsl(220, 24%, 12%)",
      cancelButtonColor: "hsl(0, 0%, 37%)",
      confirmButtonText: "OK",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(setLoader(true))
        const formData = {
          imageUrl: url
        }
        try {
          const data = await axios.post(`${process.env.REACT_APP_NEXT_PUBLIC_API_BASE_URL}api/v1/admin/images/delete/${id}` , formData);
          toast.success(data.data.message); 
          getImages()
           
        } catch (e: any) {
          dispatch(setLoader(false))
          toast.error(e.message);
        }
      }
    });

  }

  useEffect(() => {

    (async () => {
      dispatch(setLoader(true))
      try {
        let allBrandss = await getAllBrandForDropdown()
        setallBrands(allBrandss.data);
        let allmotorcycles = await getAllMotorcyclesForDropdown(selectedBrand)
        setallmotorcycles(allmotorcycles.data)
        dispatch(setLoader(false))
      } catch (err) {
        console.log("Failed to get all Brand for dropdown");
        dispatch(setLoader(false))
      }
    })()
  }, [])


  return (
    <div className="page_container uploadImage_container">
      {!viewImage && <div className="right_container">
        <div className="file-upload">
          <button className="file-upload-btn" type="button" >Add Image</button>

          <div className="image-upload-wrap">
            <input className="file-upload-input" type='file' accept="image/*" multiple onChange={(e) => {
              setImages(e.target.files); console.log(e.target.files);
            }} />
            <div className="drag-text">
              {(!images || images.length == 0) && <h3>Drag and drop a file or select add Image</h3>}
              {
                Imagesrender()
              }
            </div>
          </div>
          <div className="file-upload-content">
            <img className="file-upload-image" src="#" alt="your image" />
            <div className="image-title-wrap">
              <button type="button" className="remove-image">Remove <span className="image-title">Uploaded Image</span></button>
            </div>
          </div>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="d-flex gap-2 flex-wrap filter_container mt-3">

              <select className="form-select" value={selectedBrand} onChange={(e) => brandChangeHandler(e.target.value)} required>
                <option value={""}>Select Brand</option>
                {
                  allBrands.length && allBrands.map((item: any, i) => (
                    <option value={item._id} key={i}>{item.brand_name}</option>
                  ))
                }
              </select>

              <select className="form-select" value={selectedMotorcycle} onChange={(e) => setselectedMotorcycle(e.target.value)} required>
                <option value={""}>Select Motorcycles</option>
                {
                  allmotorcycles.length && allmotorcycles.map((item: any, i) => (
                    <option value={item._id} key={i}>{item.motorcycle_name}</option>
                  ))
                }
              </select>

              <button type="submit" className="btn btn-dark" name="upload" >UPLOAD</button>
              <button type="submit" className="btn btn-dark" name="view">VIEW IMAGES</button>
            </div>
          </form>
        </div>


      </div>}

      {
        viewImage && <div className="right_container">
          <div className="d-flex align-items-center justify-content-between mb-4 ">
          <button className="btn btn-dark" onClick={() => setViewImage(false)}>Back</button>
          <span className="motorcycle_title">{fetchedImageData.motorcycle} Images..</span>
          </div>

          <div className="viewImages_container">
            {fetchedImageData.images.map((imageData) => {
              return (

                <div className="view_image_card">
                  <img src={imageBaseUrl + imageData} />
                  <button className="btn btn-dark" onClick={()=>deleteImage(fetchedImageData._id , imageData)}>Delete</button>
                </div>
              )
            })}
            { fetchedImageData.images.length == 0 && <h1>No images</h1>}
          </div>
        </div>
      }
      <ToastContainer />
    </div>
  )
}