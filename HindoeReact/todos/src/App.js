// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// // http://localhost:3001/apartment/getAllApartments
// const API_URL = 'http://localhost:3001/apartment'; // נניח שהשרת האפליקציה פועל על פורט 3001

import Main from "./comp/Main";
import AddApartment from "./comp/addapartment";
import { ApartmentsList } from "./comp/apartmentsList";

// function App() {
//   const [apartments, setApartments] = useState([]);
//   const [newApartment, setNewApartment] = useState({
//     name: '',
//     desc: '',
//     categoryCode: '',
//     cityCode: '',
//     address: '',
//     numOfBeds: 0,
//     additives: '',
//     price: 0,
//     advertiserCode: ''
//   });

//   useEffect(() => {
//     // הבאת כל הדירות מהשרת
//     axios.get(`${API_URL}/getAllApartments`)
//       .then(response => {
//         setApartments(response.data.apartment);
//       })
//       .catch(error => {
//         console.error('Error fetching apartments:', error);
//       });
//   }, []);

//   const addApartment = () => {
//     axios.post(`${API_URL}/apartments`, newApartment)
//       .then(response => {
//         alert(response.data.message);
//         setNewApartment({
//           name: '',
//           desc: '',
//           categoryCode: '',
//           cityCode: '',
//           address: '',
//           numOfBeds: 0,
//           additives: '',
//           price: 0,
//           advertiserCode: ''
//         });
//         // אפשר לבצע רענון של רשימת הדירות
//       })
//       .catch(error => {
//         console.error('Error adding apartment:', error);
//       });
//   };

//   return (
//     <div>
//       <h1>Apartments</h1>
//       <ul>
//         {apartments.map(apartment => (
//           <li key={apartment._id}>
//             <p>Name: {apartment.name}</p>
//             <p>Description: {apartment.desc}</p>
//             <p>Category: {apartment.categoryCode}</p>
//             <p>City: {apartment.cityCode}</p>
//             <p>Address: {apartment.address}</p>
//             <p>Number of Beds: {apartment.numOfBeds}</p>
//             <p>Additives: {apartment.additives}</p>
//             <p>Price: {apartment.price}</p>
//             <p>Advertiser: {apartment.advertiserCode}</p>
//           </li>
//         ))}
//       </ul>
//       <h2>Add New Apartment</h2>
//       <input type="text" placeholder="Name" value={newApartment.name} onChange={e => setNewApartment({ ...newApartment, name: e.target.value })} />
//       <input type="text" placeholder="Description" value={newApartment.desc} onChange={e => setNewApartment({ ...newApartment, desc: e.target.value })} />
//       <input type="text" placeholder="Category Code" value={newApartment.categoryCode} onChange={e => setNewApartment({ ...newApartment, categoryCode: e.target.value })} />
//       <input type="text" placeholder="City Code" value={newApartment.cityCode} onChange={e => setNewApartment({ ...newApartment, cityCode: e.target.value })} />
//       <input type="text" placeholder="Address" value={newApartment.address} onChange={e => setNewApartment({ ...newApartment, address: e.target.value })} />
//       <input type="number" placeholder="Number of Beds" value={newApartment.numOfBeds} onChange={e => setNewApartment({ ...newApartment, numOfBeds: e.target.value })} />
//       <input type="text" placeholder="Additives" value={newApartment.additives} onChange={e => setNewApartment({ ...newApartment, additives: e.target.value })} />
//       <input type="number" placeholder="Price" value={newApartment.price} onChange={e => setNewApartment({ ...newApartment, price: e.target.value })} />
//       <input type="text" placeholder="Advertiser Code" value={newApartment.advertiserCode} onChange={e => setNewApartment({ ...newApartment, advertiserCode: e.target.value })} />
//       <button onClick={addApartment}>Add Apartment</button>
//     </div>
//   );
// }

// export default App;
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// function App () {
//   return (
//     <Router>
//       <div className="container">
//         <Switch>
//           <Route exact path="/" component={ApartmentsList} />
//           <Route exact path="/add" component={AddApartment} />
//         </Switch>
//       </div>
//     </Router>
//   );
// };
// const formDataObj = new FormData();
// //שיוך ערך למכיל
// formDataObj.append('name', name);
// formDataObj.append('description', desc);
// formDataObj.append('image', image);
// formDataObj.append('categoryCode', categoryCode);
// formDataObj.append('cityCode', cityCode);
// formDataObj.append('address', address);
// formDataObj.append('numOfBeds', numOfBeds);
// formDataObj.append('additives', additives);
// formDataObj.append('price', price);
// formDataObj.append('advertiserCode', localStorage.getItem('currnertUser'));

function App() {


  return (
    <div>
      <Main></Main>
    </div>
  );
}

export default App;
