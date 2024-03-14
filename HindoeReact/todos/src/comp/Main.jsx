import { Routing } from "./Routing"
import AddApartment from "./addapartment";
import ApartmentsList from "./apartmentsList"
import { BrowserRouter } from "react-router-dom";
export const Main = () => {

    return <>
        <BrowserRouter>
        {/* <AddApartment></AddApartment> */}
            {/* <ApartmentsList></ApartmentsList> */}
            <Routing></Routing>
        </BrowserRouter>
    </>
}
export default Main;
