import React, { useState, useEffect } from 'react';
import axios from 'axios';
import gg from './gg.css';
import AddApartment from './addapartment';
import { Outlet, Router, useNavigate } from 'react-router-dom';
import serverAppartment from './server/serverAppartment';
import meat from '../Pic/6.jpg'
import RecipeCard from './RecipeCard';

// const token = localStorage.getItem('token'); // השגת הטוקן מהאחסון המקומי
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // הוספת הטוקן לכותרת בבקשות axios


export const ApartmentsList = () => {

  const [listapartment, setListapartment] = useState([])
  const [listCatgory, setListCatgory] = useState([])
  const [listCity, setListCity] = useState([])
  const [listAdvertiser, setListAdvertiser] = useState([])
  const [apartments, setApartments] = useState([]);
  const [Sort, setSort] = React.useState([])


  const City = e => {
    setListapartment(apartments);
    setSort(listapartment.filter(a => a.cityCode._id == e.target.value))
  }

  const Catigory = e => {
    setListapartment(apartments);
    setSort(listapartment.filter(a => a.categoryCode._id == e.target.value))
  }

  const Beds = e => {
    setListapartment(apartments);
    setSort(listapartment.filter(a => a.numOfBeds >= e.target.value))
  }

  const Price = e => {
    setListapartment(apartments);
    setSort(listapartment.filter(a => a.price >= e.target.value))
  }

  const Advertiser = e => {
    setListapartment(apartments);
    setSort(listapartment.filter(a => a.advertiserCode._id >= e.target.value))
  }

  const nav = useNavigate()

  const addApartment = () => {
    nav(`/AddApartment/1`)
  }

  const update = (id) => {
    nav(`/UpdateApartment/${id}`)
  }

  const config = {
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'authorization': localStorage.getItem('token')
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };

  const deleteApar = (id) => {
    alert(id + "you realy????")
    axios.delete(`http://localhost:3001/apartment/${id}`, { headers: { 'authorization': localStorage.getItem('token') } })
      .then(response => {
        console.log(`clone :${id}`, response);
      })
      .catch(error => {
        console.log('Error clone:', error,);
      });
  }

  // כשרוצים להביא הסירוויס
  // async function getallApartments() {
  //   const Srapartment = await serverAppartment.getAllApartments();
  //   setApartments(Srapartment);
  // }

  useEffect(() => {
    // getallApartments();
    axios.get('http://localhost:3001/apartment/getAllApartments')
      .then(response => {
        setApartments(response.data.apartment);
        setListapartment(response.data.apartment);

      })
      .catch(error => {
        console.error('Error fetching apartments:', error);
      });
    axios.get('http://localhost:3001/category/')
      .then(response => {
        setListCatgory(response.data.Category);
      })
      .catch(error => {
        console.log('Error fetching categories', error);
      });
    axios.get('http://localhost:3001/advertiser/getAlladvertiser')
      .then(response => {
        setListAdvertiser(response.data.advertiser);
      })
      .catch(error => {
        console.log('Error fetching categories', error);
      });
    axios.get('http://localhost:3001/city/')
      .then(response => {
        setListCity(response.data.city);
      })
      .catch(error => {
        console.log('Error fetching cities', error);
      });
  }, []);

  return (
    <div>
      <h2>Apartments List</h2>
      {localStorage.getItem('token') && <div className="Filter" >
        <button onClick={() => addApartment()}>add apartment</button>
        <select name='categoryCode' onChange={Advertiser} >
          <option value="" disabled hidden>Choose category</option>
          {listAdvertiser.map((c, index) => <option key={index} value={c._id}>{c.name}</option>)}
        </select>
        <select name='categoryCode' onChange={Catigory} >
          <option value="" disabled hidden>Choose category</option>
          {listCatgory.map((c, index) => <option key={index} value={c._id}>{c.name}</option>)}
        </select>
        <select name='cityCode' onChange={City} >
          <option value="" disabled hidden>Choose city</option>
          {listCity.map((c, index) => <option key={index} value={c._id}>{c.name}</option>)}
        </select>
        <input input type='number' placeholder='Input Min Number of Beds' onChange={Beds} />
        <input input type='number' placeholder='Input Min Number of Price' onChange={Price} />
      </div>}
      {apartments.map(i => <RecipeCard  dataAA={i._id} dataA={i.name} dataB={i.description} dataC={i.categoryCode.name} dataD={i.cityCode.name} dataE={i.address} dataF={i.numOfBeds} dataG={i.additives} dataH={i.price} dataI={i.advertiserCode.email}></RecipeCard>)}
      {Sort.length == 0 && apartments.map(apartment => (<div className="apartment" key={apartment._id}> 
       <h3>{apartment.name}</h3>  <img src={meat} alt={apartment.name} />  <p><strong>Description:</strong> {apartment.description}</p>  <p><strong>Category: </strong>{apartment.categoryCode.name}</p>  <p><strong>City: </strong>{apartment.cityCode.name}</p>  <p><strong>Address:</strong> {apartment.address}</p>  <p><strong>Number of Beds:</strong> {apartment.numOfBeds}</p>  {/* <p><strong>Additives: </strong>{apartment.additives.join(', ')}</p> */}  <p><strong>Additives: </strong>{apartment.additives.map(a => <p> 👉🏽 {a} </p>)}</p>  <p><strong>Price:</strong> {apartment.price}$</p>  <p><strong>Advertiser Email: </strong><a href={`mailto:${apartment.advertiserCode.email}`}>{apartment.advertiserCode.email}</a></p>  {localStorage.getItem('token') && <button onClick={() => deleteApar(apartment._id)}>delete apartment</button>}  {localStorage.getItem('token') && <button onClick={() => update(apartment._id)}>update apartment</button>}
       </div>))}
      {Sort.length > 0 && Sort.map(apartment => (<div className="apartment" key={apartment._id}>  <h3>{apartment.name}</h3>  <img src={meat} alt={apartment.name} />  <p><strong>Description:</strong> {apartment.description}</p>  <p><strong>Category: </strong>{apartment.categoryCode.name}</p>  <p><strong>City: </strong>{apartment.cityCode.name}</p>  <p><strong>Address:</strong> {apartment.address}</p>  <p><strong>Number of Beds:</strong> {apartment.numOfBeds}</p>  {/* <p><strong>Additives: </strong>{apartment.additives.join(', ')}</p> */}  <p><strong>Additives: </strong>{apartment.additives.map(a => <p> 👉🏽 {a} </p>)}</p>  <p><strong>Price:</strong> {apartment.price}$</p>  <p><strong>Advertiser Email: </strong><a href={`mailto:${apartment.advertiserCode.email}`}>{apartment.advertiserCode.email}</a></p>  {localStorage.getItem('token') && <button onClick={() => deleteApar(apartment._id)}>delete apartment</button>}  {localStorage.getItem('token') && <button onClick={() => update(apartment._id)}>update apartment</button>}</div>))}
    </div>
  );
}

export default ApartmentsList;