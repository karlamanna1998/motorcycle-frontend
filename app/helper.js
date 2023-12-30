const { default: axios } = require("axios")

const getAllBrandForDropdown = async()=>{
try{
  let allBrands = await axios.get('http://localhost:5000/api/v1/admin/brand/get-all-brand-dropdown')
  return allBrands.data
}catch(err){
  Promise.resolve()
}

}


export {
    getAllBrandForDropdown  
}