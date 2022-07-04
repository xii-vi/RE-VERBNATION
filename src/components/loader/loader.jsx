import Loader from "react-spinners/BeatLoader"

export const LoadSpin = ()=>{
    const color = "#5CDB94";
    return(
    <div className="flex center-flex">
        <div>
            <Loader size={30} margin={2} loading={true} color={color}/>
        </div>
    </div>
    )
}