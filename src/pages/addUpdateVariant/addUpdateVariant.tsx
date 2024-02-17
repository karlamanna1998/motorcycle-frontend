import { useState ,useEffect } from "react";
import { getAllBrandForDropdown, getAllMotorcyclesForDropdown } from "../../helper";
import axios from "axios";

export default function AddUpdateVariant() {
    const [features, setFeatures]= useState<any>()
    const [specification , setSpecification] = useState<any>()
    const [allBrands, setallBrands] = useState([]);
    const [allmotorcycles, setallmotorcycles] = useState([]);
    const [selectedBrand, setselectedBrand] = useState("")
    const [selectedMotorcycle, setselectedMotorcycle] = useState("")
    const [price, setPrice] = useState("");
    const [variantName , setVariantName]= useState("")

    const brandChangeHandler = async(brand : string)=>{
        try{
            setselectedBrand(brand);
            let allmotorcycles = await getAllMotorcyclesForDropdown(brand)
            setallmotorcycles(allmotorcycles.data)
            setselectedMotorcycle("")
        }catch (err) {
           console.log(err);
        }
    }

    const saveVariant = async(e :any)=>{
        e.preventDefault()

        try{
          const formdata = {
            variant_name : variantName,
            brand : selectedBrand,
            motorcycle : selectedMotorcycle,
            price : price,
            features : features,
            specifications : specification
          }

          await axios.post('http://localhost:5000/api/v1/admin/variants/add-variant', formdata)
        }catch(err){

        }

    }

    useEffect(() => {
        (async () => {
            try {
                let allBrandss = await getAllBrandForDropdown()
                setallBrands(allBrandss.data);
                // let allmotorcycles = await getAllMotorcyclesForDropdown(selectedBrand)
                // setallmotorcycles(allmotorcycles.data)
            } catch (err) {
                console.log("Failed to get all Brand for dropdown");
            }
        })()
    },[])
    return (
        <div className="page_container ">
            <div className="title_bar"><span className="title">ADD VARIANT</span>
            </div>
            <div className="right_container">
                <form onSubmit={(e)=>saveVariant(e)}>
                    <div className="row mb-3">
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="brand" className="form-label">Brand</label>
                            <select className="form-select form-select-lg" value={selectedBrand} onChange={(e) => brandChangeHandler(e.target.value)} required>
                            <option value={""}>Select Brand</option>
                            {
                                allBrands.length && allBrands.map((item: any, i) => (
                                    <option value={item._id} key={i}>{item.brand_name}</option>
                                ))
                            }
                        </select>
                        </div>

                        <div className="col-md-6  col-lg-3 mb-2">
                        <label  className="form-label">Motorcycle</label>
                        <select className="form-select form-select-lg" value={selectedMotorcycle} onChange={(e) => setselectedMotorcycle(e.target.value)} required={true}>
                            <option value={""}>Select Motorcycle</option>
                            {
                                allmotorcycles.length && allmotorcycles.map((item: any, i) => (
                                    <option value={item._id} key={i}>{item.motorcycle_name}</option>
                                ))
                            }
                        </select>
                        </div>

                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="variantName" className="form-label">Variant Name</label>
                            <input type="text" className="form-control form-control-lg" id="variantName" aria-describedby="emailHelp" placeholder="Enter Variant Name" required value={variantName} onChange={(e)=>setVariantName(e.target.value)} />
                        </div>

                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="price" className="form-label">Price</label>
                            <input type="number" className="form-control form-control-lg" id="price" aria-describedby="emailHelp" placeholder="Enter Price" value={price} onChange={(e)=>setPrice(e.target.value)} required/>
                        </div>
                    </div>


                    <h4>Features</h4>

                    <div className="row mb-3">
                        <div className="col-md-6   col-lg-3 mb-2">
                            <label htmlFor="touchScreenDisplay" className="form-label">Touch Screen Display</label>
                            <select id="touchScreenDisplay" className="form-select form-select-lg" value={features?.touchScreenDisplay ? features.touchScreenDisplay : "" } onChange={(e)=>setFeatures({...features , ['touchScreenDisplay'] : e.target.value})}>
                                <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="instrumentConsole" className="form-label">Instrument Console</label>
                            <select id="instrumentConsole" className="form-select form-select-lg" value={features?.instrumentConsole ? features.instrumentConsole : "" } onChange={(e)=>setFeatures({...features , ['instrumentConsole'] : e.target.value})}>
                                <option value={""}>Select</option>
                                <option value={"Analogue"}>Analogue</option>
                                <option value={"Digital"}>Digital</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="Odometer" className="form-label">Odometer</label>
                            <select id="Odometer" className="form-select form-select-lg" value={features?.odometer ? features.odometer : "" } onChange={(e)=>setFeatures({...features , ['odometer'] : e.target.value})}>
                                <option value={""}>Select</option>
                                <option value={"Analogue"}>Analogue</option>
                                <option value={"Digital"}>Digital</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="speedometer" className="form-label">Speedometer</label>
                            <select id="speedometer" className="form-select form-select-lg" value={features?.speedometer ? features.speedometer : "" } onChange={(e)=>setFeatures({...features , ['speedometer'] : e.target.value})}>
                                <option value={""}>Select</option>
                                <option value={"Analogue"}>Analogue</option>
                                <option value={"Digital"}>Digital</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="fuelGauge" className="form-label">Fuel Guage</label>
                            <select id="fuelGauge" className="form-select form-select-lg" value={features?.fuelGauge ? features.fuelGauge : "" } onChange={(e)=>setFeatures({...features , ['fuelGauge'] : e.target.value})}>
                                <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="digitalFuelGauge" className="form-label">Digital Fuel Guage</label>
                            <select id="digitalFuelGauge" className="form-select form-select-lg" value={features?.digitalFuelGauge ? features.digitalFuelGauge : "" } onChange={(e)=>setFeatures({...features , ['digitalFuelGauge'] : e.target.value})}>
                                <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="hazardWarningIndicator" className="form-label">Hazard Warning Indicator</label>
                            <select id="hazardWarningIndicator" className="form-select form-select-lg" value={features?.hazardWarningIndicator ? features.hazardWarningIndicator : "" } onChange={(e)=>setFeatures({...features , ['hazardWarningIndicator'] : e.target.value})}>
                                <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                    
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="averageSpeedIndicator" className="form-label">Average Speed Indicator</label>
                            <select id="averageSpeedIndicator" className="form-select form-select-lg" value={features?.averageSpeedIndicator ? features.averageSpeedIndicator : "" } onChange={(e)=>setFeatures({...features , ['averageSpeedIndicator'] : e.target.value})}>
                                <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="otaUpdates" className="form-label">Ota Updates</label>
                            <select id="otaUpdates" className="form-select form-select-lg" value={features?.otaUpdates ? features.otaUpdates : "" } onChange={(e)=>setFeatures({...features , ['otaUpdates'] : e.target.value})}>
                                <option value={""}>Select</option>
                                <option value={"Not Available"}>Not Available</option>
                                <option value={"Available"}>Available</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="callSMSAlerts" className="form-label">Call SMSAlerts</label>
                            <select id="callSMSAlerts" className="form-select form-select-lg" value={features?.callSMSAlerts ? features.callSMSAlerts : "" } onChange={(e)=>setFeatures({...features , ['callSMSAlerts'] : e.target.value})}>
                            <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="geoFencing" className="form-label">Geo Fencing</label>
                            <select id="geoFencing" className="form-select form-select-lg" value={features?.geoFencing ? features.geoFencing : "" } onChange={(e)=>setFeatures({...features , ['geoFencing'] : e.target.value})}>
                            <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="distanceToEmptyIndicator" className="form-label">Distance To Empty Indicator</label>
                            <select id="distanceToEmptyIndicator" className="form-select form-select-lg" value={features?.distanceToEmptyIndicator ? features.distanceToEmptyIndicator : "" } onChange={(e)=>setFeatures({...features , ['distanceToEmptyIndicator'] : e.target.value})}>
                            <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="tachometer" className="form-label">Tachometer</label>
                            <select id="tachometer" className="form-select form-select-lg" value={features?.tachometer ? features.tachometer : "" } onChange={(e)=>setFeatures({...features , ['tachometer'] : e.target.value})}>
                            <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="standAlarm" className="form-label">Stand Alarm</label>
                            <select id="standAlarm" className="form-select form-select-lg" value={features?.standAlarm ? features.standAlarm : "" } onChange={(e)=>setFeatures({...features , ['standAlarm'] : e.target.value})}>
                            <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="tripmeterType" className="form-label">Tripmeter Type</label>
                            <select id="tripmeterType" className="form-select form-select-lg" value={features?.tripmeterType ? features.tripmeterType : "" } onChange={(e)=>setFeatures({...features , ['tripmeterType'] : e.target.value})}>
                            <option value={""}>Select</option>
                                <option value={"Digital"}>Digital</option>
                                <option value={"Analogue"}>Analogue</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="numberOfTripmeters" className="form-label">Number Of Tripmeters</label>
                            <input type="text" className="form-control form-control-lg" id="numberOfTripmeters" aria-describedby="emailHelp" placeholder="Number Of Tripmeters" value={features?.numberOfTripmeters ? features?.numberOfTripmeters : ""} onChange={(e) => setFeatures({ ...features, numberOfTripmeters: e.target.value })}/>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="gearIndicator" className="form-label">Gear Indicator</label>
                            <select id="gearIndicator" className="form-select form-select-lg" value={features?.gearIndicator ? features.gearIndicator : "" } onChange={(e)=>setFeatures({...features , ['gearIndicator'] : e.target.value})}>
                            <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="lowFuelIndicator" className="form-label">Low Fuel Indicator</label>
                            <select id="lowFuelIndicator" className="form-select form-select-lg" value={features?.lowFuelIndicator ? features.lowFuelIndicator : "" } onChange={(e)=>setFeatures({...features , ['lowFuelIndicator'] : e.target.value})}>
                            <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="lowOilIndicator" className="form-label">Low Oil Indicator</label>
                            <select id="lowOilIndicator" className="form-select form-select-lg" value={features?.lowOilIndicator ? features.lowOilIndicator : "" } onChange={(e)=>setFeatures({...features , ['lowOilIndicator'] : e.target.value})}>
                            <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="lowBatteryIndicator" className="form-label">Low Battery Indicator</label>
                            <select id="lowBatteryIndicator" className="form-select form-select-lg" value={features?.lowBatteryIndicator ? features.lowBatteryIndicator : "" } onChange={(e)=>setFeatures({...features , ['lowBatteryIndicator'] : e.target.value})}>
                            <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="clock" className="form-label">Clock</label>
                            <select id="clock" className="form-select form-select-lg" value={features?.clock ? features.clock : "" } onChange={(e)=>setFeatures({...features , ['clock'] : e.target.value})}>
                            <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="serviceReminderIndicator" className="form-label">Service Reminder Indicator</label>
                            <select id="serviceReminderIndicator" className="form-select form-select-lg" value={features?.serviceReminderIndicator ? features.serviceReminderIndicator : "" } onChange={(e)=>setFeatures({...features , ['serviceReminderIndicator'] : e.target.value})}>
                            <option value={""}>Select</option>
                                <option value={"Yes"}>Yes</option>
                                <option value={"No"}>No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="frontStorageBox" className="form-label">Front Storage Box</label>
                            <select id="frontStorageBox" className="form-select form-select-lg" value={features?.frontStorageBox ? features?.frontStorageBox : ""} onChange={(e) => setFeatures({ ...features, frontStorageBox: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="underSeatStorage" className="form-label">Under Seat Storage</label>
                            <select id="underSeatStorage" className="form-select form-select-lg" value={features?.underSeatStorage ? features?.underSeatStorage : ""} onChange={(e) => setFeatures({ ...features, underSeatStorage: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="mobileAppConnectivity" className="form-label">Mobile App Connectivity</label>
                            <select id="mobileAppConnectivity" className="form-select form-select-lg" value={features?.mobileAppConnectivity ? features?.mobileAppConnectivity : ""} onChange={(e) => setFeatures({ ...features, mobileAppConnectivity: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="drls" className="form-label">Daytime Running Lights (DRLs)</label>
                            <select id="drls" className="form-select form-select-lg" value={features?.drls ? features?.drls : ""} onChange={(e) => setFeatures({ ...features, drls: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="aho" className="form-label">Automatic Headlights On (AHO)</label>
                            <select id="aho" className="form-select form-select-lg" value={features?.aho ? features?.aho : ""} onChange={(e) => setFeatures({ ...features, aho: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="shiftLight" className="form-label">Shift Light</label>
                            <select id="shiftLight" className="form-select form-select-lg" value={features?.shiftLight ? features?.shiftLight : ""} onChange={(e) => setFeatures({ ...features, shiftLight: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="brakeTailLight" className="form-label">Brake Tail Light</label>
                            <select id="brakeTailLight" className="form-select form-select-lg" value={features?.brakeTailLight ? features?.brakeTailLight : ""} onChange={(e) => setFeatures({ ...features, brakeTailLight: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Halogen Bulb">Halogen Bulb</option>
                                <option value="LED">LED</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="turnSignal" className="form-label">Turn Signal</label>
                            <select id="turnSignal" className="form-select form-select-lg" value={features?.turnSignal ? features?.turnSignal : ""} onChange={(e) => setFeatures({ ...features, turnSignal: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Halogen Bulb">Halogen Bulb</option>
                                <option value="LED">LED</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="passLight" className="form-label">Pass Light</label>
                            <select id="passLight" className="form-select form-select-lg" value={features?.passLight ? features?.passLight : ""} onChange={(e) => setFeatures({ ...features, passLight: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="gpsNavigation" className="form-label">GPS Navigation</label>
                            <select id="gpsNavigation" className="form-select form-select-lg" value={features?.gpsNavigation ? features?.gpsNavigation : ""} onChange={(e) => setFeatures({ ...features, gpsNavigation: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="ridingModesSwitch" className="form-label">Riding Modes Switch</label>
                            <select id="ridingModesSwitch" className="form-select form-select-lg" value={features?.ridingModesSwitch ? features?.ridingModesSwitch : ""} onChange={(e) => setFeatures({ ...features, ridingModesSwitch: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="tractionControl" className="form-label">Traction Control</label>
                            <select id="tractionControl" className="form-select form-select-lg" value={features?.tractionControl ? features?.tractionControl : ""} onChange={(e) => setFeatures({ ...features, tractionControl: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="cruiseControl" className="form-label">Cruise Control</label>
                            <select id="cruiseControl" className="form-select form-select-lg" value={features?.cruiseControl ? features?.cruiseControl : ""} onChange={(e) => setFeatures({ ...features, cruiseControl: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="hazardWarningSwitch" className="form-label">Hazard Warning Switch</label>
                            <select id="hazardWarningSwitch" className="form-select form-select-lg" value={features?.hazardWarningSwitch ? features?.hazardWarningSwitch : ""} onChange={(e) => setFeatures({ ...features, hazardWarningSwitch: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="startType" className="form-label">Start Type</label>
                            <select id="startType" className="form-select form-select-lg" value={features?.startType ? features?.startType : ""} onChange={(e) => setFeatures({ ...features, startType: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Kick Start">Kick Start</option>
                                <option value="Electric Start">Electric Start</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="killswitch" className="form-label">Killswitch</label>
                            <select id="killswitch" className="form-select form-select-lg" value={features?.killswitch ? features?.killswitch : ""} onChange={(e) => setFeatures({ ...features, killswitch: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="steppedSeat" className="form-label">Stepped Seat</label>
                            <select id="steppedSeat" className="form-select form-select-lg" value={features?.steppedSeat ? features?.steppedSeat : ""} onChange={(e) => setFeatures({ ...features, steppedSeat: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                        <label htmlFor="pillionBackrest" className="form-label">Pillion Backrest</label>
                            <select id="pillionBackrest" className="form-select form-select-lg" value={features?.pillionBackrest ? features?.pillionBackrest : ""} onChange={(e) => setFeatures({ ...features, pillionBackrest: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="pillionGrabrail" className="form-label">Pillion Grabrail</label>
                            <select id="pillionGrabrail" className="form-select form-select-lg" value={features?.pillionGrabrail ? features?.pillionGrabrail : ""} onChange={(e) => setFeatures({ ...features, pillionGrabrail: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="pillionSeat" className="form-label">Pillion Seat</label>
                            <select id="pillionSeat" className="form-select form-select-lg" value={features?.pillionSeat ? features?.pillionSeat : ""} onChange={(e) => setFeatures({ ...features, pillionSeat: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="pillionFootrest" className="form-label">Pillion Footrest</label>
                            <select id="pillionFootrest" className="form-select form-select-lg" value={features?.pillionFootrest ? features?.pillionFootrest : ""} onChange={(e) => setFeatures({ ...features, pillionFootrest: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="frontSuspensionPreloadAdjuster" className="form-label">Front Suspension Preload Adjuster</label>
                            <select id="frontSuspensionPreloadAdjuster" className="form-select form-select-lg" value={features?.frontSuspensionPreloadAdjuster ? features?.frontSuspensionPreloadAdjuster : ""} onChange={(e) => setFeatures({ ...features, frontSuspensionPreloadAdjuster: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="rearSuspensionPreloadAdjuster" className="form-label">Rear Suspension Preload Adjuster</label>
                            <select id="rearSuspensionPreloadAdjuster" className="form-select form-select-lg" value={features?.rearSuspensionPreloadAdjuster ? features?.rearSuspensionPreloadAdjuster : ""} onChange={(e) => setFeatures({ ...features, rearSuspensionPreloadAdjuster: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="usbChargingPort" className="form-label">Usb ChargingPort</label>
                            <select id="usbChargingPort" className="form-select form-select-lg" value={features?.usbChargingPort ? features?.usbChargingPort : ""} onChange={(e) => setFeatures({ ...features, usbChargingPort: e.target.value })}>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="battery" className="form-label">Battery</label>
                            <input type="text" className="form-control form-control-lg" id="battery" aria-describedby="emailHelp" placeholder="Battery Type" value={features?.battery ? features?.battery : ""} onChange={(e) => setFeatures({ ...features, battery: e.target.value })}/>
                        </div>
                        <div className="col-md-6  col-lg-3 mb-2">
                            <label htmlFor="additionalFeatures" className="form-label">Additional Features</label>
                            <input type="text" className="form-control form-control-lg" id="additionalFeatures" aria-describedby="emailHelp" placeholder="Aditional Features" value={features?.additionalFeatures ? features?.additionalFeatures : ""} onChange={(e) => setFeatures({ ...features, additionalFeatures: e.target.value })}/>
                        </div>
                    </div>


                    <h4>Specifications</h4>

                    <div className="row mb-3">
                        <div className="col-md-6  col-lg-3 mb-2">
                                <label htmlFor="displacement" className="form-label">Displacement</label>
                                <input type="text" className="form-control form-control-lg" id="displacement" aria-describedby="emailHelp" placeholder="Aditional Features" value={specification?.displacement ? specification?.displacement : ""} onChange={(e) => setSpecification({ ...specification, additionalFeatures: e.target.value })}/>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="maxPower" className="form-label">Max Power</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="maxPower" 
                                placeholder="Max Power" 
                                value={specification?.maxPower ? specification?.maxPower : ""} 
                                onChange={(e) => setSpecification({ ...specification, maxPower: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="maxTorque" className="form-label">Max Torque</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="maxTorque" 
                                placeholder="Max Torque" 
                                value={specification?.maxTorque ? specification?.maxTorque : ""} 
                                onChange={(e) => setSpecification({ ...specification, maxTorque: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="mileageOwnerReported" className="form-label">Mileage (Owner Reported)</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="mileageOwnerReported" 
                                placeholder="Mileage (Owner Reported)" 
                                value={specification?.mileageOwnerReported ? specification?.mileageOwnerReported : ""} 
                                onChange={(e) => setSpecification({ ...specification, mileageOwnerReported: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="ridingRange" className="form-label">Riding Range</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="ridingRange" 
                                placeholder="Riding Range" 
                                value={specification?.ridingRange ? specification?.ridingRange : ""} 
                                onChange={(e) => setSpecification({ ...specification, ridingRange: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="topSpeed" className="form-label">Top Speed</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="topSpeed" 
                                placeholder="Top Speed" 
                                value={specification?.topSpeed ? specification?.topSpeed : ""} 
                                onChange={(e) => setSpecification({ ...specification, topSpeed: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="ridingModes" className="form-label">Riding Modes</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="ridingModes" 
                                placeholder="Riding Modes" 
                                value={specification?.ridingModes ? specification?.ridingModes : ""} 
                                onChange={(e) => setSpecification({ ...specification, ridingModes: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="transmission" className="form-label">Transmission</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="transmission" 
                                placeholder="Transmission" 
                                value={specification?.transmission ? specification?.transmission : ""} 
                                onChange={(e) => setSpecification({ ...specification, transmission: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="transmissionType" className="form-label">Transmission Type</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="transmissionType" 
                                placeholder="Transmission Type" 
                                value={specification?.transmissionType ? specification?.transmissionType : ""} 
                                onChange={(e) => setSpecification({ ...specification, transmissionType: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="gearShiftingPattern" className="form-label">Gear Shifting Pattern</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="gearShiftingPattern" 
                                placeholder="Gear Shifting Pattern" 
                                value={specification?.gearShiftingPattern ? specification?.gearShiftingPattern : ""} 
                                onChange={(e) => setSpecification({ ...specification, gearShiftingPattern: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="cylinders" className="form-label">Cylinders</label>
                            <input 
                                type="number" 
                                className="form-control form-control-lg" 
                                id="cylinders" 
                                placeholder="Cylinders" 
                                value={specification?.cylinders ? specification?.cylinders : ""} 
                                onChange={(e) => setSpecification({ ...specification, cylinders: parseInt(e.target.value) || 0 })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="bore" className="form-label">Bore</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="bore" 
                                placeholder="Bore" 
                                value={specification?.bore ? specification?.bore : ""} 
                                onChange={(e) => setSpecification({ ...specification, bore: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="stroke" className="form-label">Stroke</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="stroke" 
                                placeholder="Stroke" 
                                value={specification?.stroke ? specification?.stroke : ""} 
                                onChange={(e) => setSpecification({ ...specification, stroke: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="valvesPerCylinder" className="form-label">Valves Per Cylinder</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="valvesPerCylinder" 
                                placeholder="Valves Per Cylinder" 
                                value={specification?.valvesPerCylinder ? specification?.valvesPerCylinder : ""} 
                                onChange={(e) => setSpecification({ ...specification, valvesPerCylinder: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="compressionRatio" className="form-label">Compression Ratio</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="compressionRatio" 
                                placeholder="Compression Ratio" 
                                value={specification?.compressionRatio ? specification?.compressionRatio : ""} 
                                onChange={(e) => setSpecification({ ...specification, compressionRatio: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="ignition" className="form-label">Ignition</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="ignition" 
                                placeholder="Ignition" 
                                value={specification?.ignition ? specification?.ignition : ""} 
                                onChange={(e) => setSpecification({ ...specification, ignition: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="sparkPlugs" className="form-label">Spark Plugs</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="sparkPlugs" 
                                placeholder="Spark Plugs" 
                                value={specification?.sparkPlugs ? specification?.sparkPlugs : ""} 
                                onChange={(e) => setSpecification({ ...specification, sparkPlugs: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="coolingSystem" className="form-label">Cooling System</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="coolingSystem" 
                                placeholder="Cooling System" 
                                value={specification?.coolingSystem ? specification?.coolingSystem : ""} 
                                onChange={(e) => setSpecification({ ...specification, coolingSystem: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="clutch" className="form-label">Clutch</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="clutch" 
                                placeholder="Clutch" 
                                value={specification?.clutch ? specification?.clutch : ""} 
                                onChange={(e) => setSpecification({ ...specification, clutch: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="fuelDeliverySystem" className="form-label">Fuel Delivery System</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="fuelDeliverySystem" 
                                placeholder="Fuel Delivery System" 
                                value={specification?.fuelDeliverySystem ? specification?.fuelDeliverySystem : ""} 
                                onChange={(e) => setSpecification({ ...specification, fuelDeliverySystem: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="fuelTankCapacity" className="form-label">Fuel Tank Capacity</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="fuelTankCapacity" 
                                placeholder="Fuel Tank Capacity" 
                                value={specification?.fuelTankCapacity ? specification?.fuelTankCapacity : ""} 
                                onChange={(e) => setSpecification({ ...specification, fuelTankCapacity: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="reserveFuelCapacity" className="form-label">Reserve Fuel Capacity</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="reserveFuelCapacity" 
                                placeholder="Reserve Fuel Capacity" 
                                value={specification?.reserveFuelCapacity ? specification?.reserveFuelCapacity : ""} 
                                onChange={(e) => setSpecification({ ...specification, reserveFuelCapacity: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="emissionStandard" className="form-label">Emission Standard</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="emissionStandard" 
                                placeholder="Emission Standard" 
                                value={specification?.emissionStandard ? specification?.emissionStandard : ""} 
                                onChange={(e) => setSpecification({ ...specification, emissionStandard: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="fuelType" className="form-label">Fuel Type</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="fuelType" 
                                placeholder="Fuel Type" 
                                value={specification?.fuelType ? specification?.fuelType : ""} 
                                onChange={(e) => setSpecification({ ...specification, fuelType: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="frontSuspension" className="form-label">Front Suspension</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="frontSuspension" 
                                placeholder="Front Suspension" 
                                value={specification?.frontSuspension ? specification?.frontSuspension : ""}
                                onChange={(e) => setSpecification({ ...specification, frontSuspension: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="rearSuspension" className="form-label">Rear Suspension</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="rearSuspension" 
                                placeholder="Rear Suspension" 
                                value={specification?.rearSuspension ? specification?.rearSuspension : ""}
                                onChange={(e) => setSpecification({ ...specification, rearSuspension: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="brakingSystem" className="form-label">Braking System</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="brakingSystem" 
                                placeholder="Braking System" 
                                value={specification?.brakingSystem ? specification?.brakingSystem : ""}
                                onChange={(e) => setSpecification({ ...specification, brakingSystem: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="frontBrakeType" className="form-label">Front Brake Type</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="frontBrakeType" 
                                placeholder="Front Brake Type" 
                                value={specification?.frontBrakeType ? specification?.frontBrakeType : ""}
                                onChange={(e) => setSpecification({ ...specification, frontBrakeType: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="frontBrakeSize" className="form-label">Front Brake Size</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="frontBrakeSize" 
                                placeholder="Front Brake Size" 
                                value={specification?.frontBrakeSize ? specification?.frontBrakeSize : ""}
                                onChange={(e) => setSpecification({ ...specification, frontBrakeSize: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="rearBrakeType" className="form-label">Rear Brake Type</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="rearBrakeType" 
                                placeholder="Rear Brake Type" 
                                value={specification?.rearBrakeType ? specification?.rearBrakeType : ""}
                                onChange={(e) => setSpecification({ ...specification, rearBrakeType: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="rearBrakeSize" className="form-label">Rear Brake Size</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="rearBrakeSize" 
                                placeholder="Rear Brake Size" 
                                value={specification?.rearBrakeSize ? specification?.rearBrakeSize : ""}
                                onChange={(e) => setSpecification({ ...specification, rearBrakeSize: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="calliperType" className="form-label">Calliper Type</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="calliperType" 
                                placeholder="Calliper Type" 
                                value={specification?.calliperType ? specification?.calliperType : ""}
                                onChange={(e) => setSpecification({ ...specification, calliperType: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="wheelType" className="form-label">Wheel Type</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="wheelType" 
                                placeholder="Wheel Type" 
                                value={specification?.wheelType ? specification?.wheelType : ""}
                                onChange={(e) => setSpecification({ ...specification, wheelType: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="frontWheelSize" className="form-label">Front Wheel Size</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="frontWheelSize" 
                                placeholder="Front Wheel Size" 
                                value={specification?.frontWheelSize ? specification?.frontWheelSize : ""}
                                onChange={(e) => setSpecification({ ...specification, frontWheelSize: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="rearWheelSize" className="form-label">Rear Wheel Size</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="rearWheelSize" 
                                placeholder="Rear Wheel Size" 
                                value={specification?.rearWheelSize ? specification?.rearWheelSize : ""}
                                onChange={(e) => setSpecification({ ...specification, rearWheelSize: e.target.value })}
                            />
                        </div>

                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="frontTyreSize" className="form-label">Front Tyre Size</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="frontTyreSize" 
                                placeholder="Front Tyre Size" 
                                value={specification?.frontTyreSize ? specification?.frontTyreSize : ""}
                                onChange={(e) => setSpecification({ ...specification, frontTyreSize: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="rearTyreSize" className="form-label">Rear Tyre Size</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="rearTyreSize" 
                                placeholder="Rear Tyre Size" 
                                value={specification?.rearTyreSize ? specification?.rearTyreSize : ""}
                                onChange={(e) => setSpecification({ ...specification, rearTyreSize: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="tyreType" className="form-label">Tyre Type</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="tyreType" 
                                placeholder="Tyre Type" 
                                value={specification?.tyreType ? specification?.tyreType : ""}
                                onChange={(e) => setSpecification({ ...specification, tyreType: e.target.value })}
                            />
                        </div>

                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="radialTyres" className="form-label">Radial Tyres</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="radialTyres" 
                                placeholder="Radial Tyres" 
                                value={specification?.frontTyrePressureRider ? specification?.radialTyres : ""}
                                onChange={(e) => setSpecification({ ...specification, radialTyres: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="frontTyrePressureRider" className="form-label">Front Tyre Pressure (Rider)</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="frontTyrePressureRider" 
                                placeholder="Front Tyre Pressure (Rider)" 
                                value={specification?.frontTyrePressureRider ? specification?.frontTyrePressureRider : ""}
                                onChange={(e) => setSpecification({ ...specification, frontTyrePressureRider: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="rearTyrePressureRider" className="form-label">Rear Tyre Pressure (Rider)</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="rearTyrePressureRider" 
                                placeholder="Rear Tyre Pressure (Rider)" 
                                value={specification?.rearTyrePressureRider ? specification?.rearTyrePressureRider : ""}
                                onChange={(e) => setSpecification({ ...specification, rearTyrePressureRider: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="frontTyrePressureRiderPillion" className="form-label">Front Tyre Pressure (Rider Pillion)</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="frontTyrePressureRiderPillion" 
                                placeholder="Front Tyre Pressure (Rider Pillion)" 
                                value={specification?.frontTyrePressureRiderPillion ? specification?.frontTyrePressureRiderPillion : ""}
                                onChange={(e) => setSpecification({ ...specification, frontTyrePressureRiderPillion: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="rearTyrePressureRiderPillion" className="form-label">Rear Tyre Pressure (Rider Pillion)</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="rearTyrePressureRiderPillion" 
                                placeholder="Rear Tyre Pressure (Rider Pillion)" 
                                value={specification?.rearTyrePressureRiderPillion ? specification?.rearTyrePressureRiderPillion : ""}
                                onChange={(e) => setSpecification({ ...specification, rearTyrePressureRiderPillion: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="kerbWeight" className="form-label">Kerb Weight</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="kerbWeight" 
                                placeholder="Kerb Weight" 
                                value={specification?.kerbWeight ? specification?.kerbWeight : ""}
                                onChange={(e) => setSpecification({ ...specification, kerbWeight: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="seatHeight" className="form-label">Seat Height</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="seatHeight" 
                                placeholder="Seat Height" 
                                value={specification?.seatHeight ? specification?.seatHeight : ""}
                                onChange={(e) => setSpecification({ ...specification, seatHeight: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="groundClearance" className="form-label">Ground Clearance</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="groundClearance" 
                                placeholder="Ground Clearance" 
                                value={specification?.groundClearance ? specification?.groundClearance : ""}
                                onChange={(e) => setSpecification({ ...specification, groundClearance: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="overallLength" className="form-label">Overall Length</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="overallLength" 
                                placeholder="Overall Length" 
                                value={specification?.overallLength ? specification?.overallLength : ""}
                                onChange={(e) => setSpecification({ ...specification, overallLength: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="overallWidth" className="form-label">Overall Width</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="overallWidth" 
                                placeholder="Overall Width" 
                                value={specification?.overallWidth ? specification?.overallWidth : ""}
                                onChange={(e) => setSpecification({ ...specification, overallWidth: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="overallHeight" className="form-label">Overall Height</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="overallHeight" 
                                placeholder="Overall Height" 
                                value={specification?.overallHeight ? specification?.overallHeight : ""}
                                onChange={(e) => setSpecification({ ...specification, overallHeight: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="wheelbase" className="form-label">Wheelbase</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="wheelbase" 
                                placeholder="Wheelbase" 
                                value={specification?.Wheelbase ? specification?.Wheelbase : ""}
                                onChange={(e) => setSpecification({ ...specification, Wheelbase: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6 col-lg-3 mb-2">
                            <label htmlFor="chassisType" className="form-label">Chassis Type</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                id="chassisType" 
                                placeholder="Chassis Type" 
                                value={specification?.chassisType ? specification?.chassisType : ""}
                                onChange={(e) => setSpecification({ ...specification, chassisType: e.target.value })}
                            />
                        </div>

                    </div>

                    <div className="d-flex justify-content-end">
                    <button  className="btn btn-dark" type="submit">SAVE</button>
                    </div>

                </form>

            </div>
           
        </div>
    )
}