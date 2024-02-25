import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllBrandForDropdown, getAllMotorcyclesForDropdown } from "../../helper";
import './variants.css'
import Swal from 'sweetalert2';
import { setLoader } from "../../slices/loader";
import Paginate from "../../components/paginate/paginate";
import { useAppDispatch } from "../../hooks";
export default function Variants() {
    const [variants, setVariants] = useState([])
    const [allBrands, setallBrands] = useState([]);
    const [allmotorcycles, setallmotorcycles] = useState([]);
    const [selectedBrand, setselectedBrand] = useState("")
    const [selectedMotorcycle, setselectedMotorcycle] = useState("")
    const [currPage, setCurrPage] = useState(1);
    const [totalDocs, setTotalDocs] = useState();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const getAllVAriants = async (brand: string, motorcycle: string, page: number) => {
        dispatch(setLoader(true))
        try {
            const variants = await axios.get(`http://localhost:5000/api/v1/admin/variants/variant-list?page=${page}&pageSize=10&motorcycleId=${motorcycle}&brandId=${brand}`);
            setVariants(variants.data.data)
            setTotalDocs(variants.data.total_docs)
            setCurrPage(page);
            console.log(variants.data);
            dispatch(setLoader(false))
        } catch (err) {
            dispatch(setLoader(false))
            console.log(err);

        }
    }

    const brandChangeHandler = async (brand: string) => {
        try {
            setselectedBrand(brand);
            let allmotorcycles = await getAllMotorcyclesForDropdown(brand)
            setallmotorcycles(allmotorcycles.data)
            setselectedMotorcycle("")
            await getAllVAriants(brand, "", 1)
        } catch (err) {
            console.log(err);
        }
    }

    const mototorcycleChangeHandler = async (motorcycle: string) => {
        try {
            setselectedMotorcycle(motorcycle);
            await getAllVAriants(selectedBrand, motorcycle, 1)
        } catch (err) {
            console.log(err);
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
                deleteVariant(data._id)
            }
        });
    };

    const deleteVariant = async (variantId: string) => {
        dispatch(setLoader(true))
        try {
            await axios.delete(`http://localhost:5000/api/v1/admin/variants/variant-delete/${variantId}`)
            await getAllVAriants(selectedBrand, selectedMotorcycle, 1)
        } catch (err) {
            console.log(err);
        }
    }

    const pageCHange = (pageNumber: number) => {
        getAllVAriants(selectedBrand, selectedMotorcycle, pageNumber)
    }



    useEffect(() => {

        (async () => {
            dispatch(setLoader(true))
            try {
                let allBrandss = await getAllBrandForDropdown()
                setallBrands(allBrandss.data);
                let allmotorcycles = await getAllMotorcyclesForDropdown(selectedBrand)
                setallmotorcycles(allmotorcycles.data)
                await getAllVAriants(selectedBrand, selectedMotorcycle, currPage)
            } catch (err) {
                console.log("Failed to get all Brand for dropdown");
            }
        })()
    }, [])


    return (
        <div className="page_container variants_container">
            <div className="title_bar"><span className="title">MOTORCYCLE VARIANT'S</span>

                <div className="d-flex gap-2 flex-wrap filter_container">
                    <select className="form-select" value={selectedBrand} onChange={(e) => brandChangeHandler(e.target.value)}>
                        <option value={""}>All Brand</option>
                        {
                            allBrands.length && allBrands.map((item: any, i) => (
                                <option value={item._id} key={i}>{item.brand_name}</option>
                            ))
                        }
                    </select>

                    <select className="form-select" value={selectedMotorcycle} onChange={(e) => mototorcycleChangeHandler(e.target.value)}>
                        <option value={""}>All Motorcycles</option>
                        {
                            allmotorcycles.length && allmotorcycles.map((item: any, i) => (
                                <option value={item._id} key={i}>{item.motorcycle_name}</option>
                            ))
                        }
                    </select>
                    <button type="button" className="btn btn-dark" onClick={() => navigate('/add-variant')}>ADD VARIANT</button>
                </div>



            </div>
            <div className="right_container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">SL.NO</th>
                            <th scope="col">Display Image</th>
                            <th scope="col">Variant Name</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Motorcycle Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            variants && variants.map((variant: any, i) => {
                                return (
                                    <tr key={variant._id}>
                                        <td>{i + 1}</td>
                                        <td><img className="logo_img" src={process.env.REACT_APP_NEXT_PUBLIC_MEDIA_BASE_URL + variant.display_image} /></td>
                                        <td>{variant.variant_name}</td>
                                        <td>{variant.brand_name}</td>
                                        <td>{variant.motorcycle_name}</td>
                                        <td>{variant.price}</td>
                                        <td>
                                            <img className="edit_icon" src="./edit.svg" onClick={() => navigate(`/add-variant/${variant._id}`)} />
                                            <img className="delete_icon" src="./delete.svg" onClick={() => handleDelete(variant)} />
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                {
                    variants.length == 0 && <h4 className="text-center">NO DATA AVAILABLE</h4>
                }
            </div>
            <Paginate totalDocsInPage={10} docLength={variants.length} currPage={currPage} totalDocs={totalDocs} pageCHange={pageCHange} />
            {/* <ToastContainer/> */}
        </div>
    )
}