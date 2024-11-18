import { Route, Routes } from 'react-router-dom'
import AddApartment from './addapartment'
import ApartmentsList from './apartmentsList'
import UpdateApartment from './updatapartment'
import { Sall } from './Sall'
import RecipeCard from './RecipeCard'


export const Routing = () => {
    return <>
        <Routes>
            {/* <Route path={'/'} element={<Home></Home>}></Route> */}
            <Route path={'/'} element={<ApartmentsList></ApartmentsList>}></Route>
            <Route path={'UpdateApartment/:id'} element={<UpdateApartment></UpdateApartment>}></Route>
            <Route path={'AddApartment/:id'} element={<AddApartment></AddApartment>}></Route>
            <Route path={'ApartmentsList'} element={<ApartmentsList></ApartmentsList>}></Route>
            <Route path={'Sall/:id'} element={<Sall></Sall>}></Route>
            <Route path={'RecipeCard/:id'} element={<RecipeCard></RecipeCard>}></Route>

        </Routes>
    </>
}