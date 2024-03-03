import axios from "axios";


const getAllBrandForDropdown = async()=>{
    console.log("hit");
try{
  let allBrands = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_BASE_URL}api/v1/admin/brand/get-all-brand-dropdown`)
  return allBrands.data
}catch(err){
  Promise.resolve()
}

}


const getAllMotorcyclesForDropdown = async( brand : string)=>{
  console.log("hit");
try{
let allMotorcycles = await axios.get(`${process.env.REACT_APP_NEXT_PUBLIC_API_BASE_URL}api/v1/admin/motorcycle/get-all-motorcycle-dropdown?brandId=${brand}`)
return allMotorcycles.data
}catch(err){
Promise.resolve()
}

}


export {
    getAllBrandForDropdown,
    getAllMotorcyclesForDropdown  
}