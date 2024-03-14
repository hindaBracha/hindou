import React, { useState, useEffect } from 'react';
import axios from 'axios';
import gg from './gg.css';
import { useNavigate, useParams } from 'react-router-dom';

const token = localStorage.getItem('token'); // השגת הטוקן מהאחסון המקומי
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // הוספת הטוקן לכותרת בבקשות axios


export const UpdateApartment = () => {
  const params = useParams()

  const [apartment, setapartment] = useState(null)
  const [listCatgory, setListCatgory] = useState([])
  const [addCatgory, setaddCatgory] = useState(false)
  const [listCity, setListCity] = useState([])
  const [addCity, setaddCity] = useState(false)
  // const [ name, description, categoryCode, cityCode,
  //   address, numOfBeds, additives, price, advertiserCode, image ]=useState(null) 
  //  const [ setname, setdescription, setcategoryCode,setcityCode,
  //   setaddress, setnumOfBeds, setadditives, setprice, setadvertiserCode, setimage ]=useState(null)
  // setapartment=(response)=>{
  //     const { name, description, categoryCode, cityCode, address, numOfBeds, additives, price, advertiserCode, image }=response
  //         // =response.data
  // }
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryCode: '',
    cityCode: '',
    address: '',
    numOfBeds: '',
    additives: '',
    price: '',
    advertiserCode: '',
    image: null
  });

  const config = {

    headers: {
      // 'Content-Type': 'multipart/form-data',
      'authorization': `${localStorage.getItem('token')}`
      // 'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  };
  // const { name, description, categoryCode, cityCode, address, numOfBeds, additives, price, advertiserCode, image }=apartment;

  useEffect(() => {
    axios.get(`http://localhost:3001/apartment/getById/${params.id}`)
      .then(response => {
        setapartment(response.data)
        //   const [ name, description, categoryCode, cityCode,
        //      address, numOfBeds, additives, price, advertiserCode, image ]=response.data
        // // =response.data

      })
      .catch(error => {
        console.error('Error fetching apartments:', error);
      });
    axios.get('http://localhost:3001/category/'// , {headers:{ 'authorization': localStorage.getItem('token') }}
    )
      .then(response => {
        setListCatgory(response.data.Category);
      })
      .catch(error => {
        console.log(' 3 Error cant coming the catgory', error);
      });
    axios.get('http://localhost:3001/city/')
      .then(response => {
        setListCity(response.data.city);
      })
      .catch(error => {
        console.log(' 5 Error cant coming the city', error);
      });
  }, []);

  const AddCity = (e) => {
    axios.post('http://localhost:3001/city/', {
      e
      // headers: { 'authorization': localStorage.getItem('token') },
      // body: { 'name': name }
      //  ,config
    })
      .then(response => {
        alert("succc;" + e + "+" + response)
        console.log('yes, create newcity', response);

      })
      .catch(error => {
        console.log('no ): create newcity', error);
      });
  }
  const AddCatgory = (e) => {
    axios.post('http://localhost:3001/category/', {
      e
      // headers: { 'authorization': localStorage.getItem('token') },
      // body: { 'name': name }
      //  ,config
    })
      .then(response => {
        alert("succc;" + e + "+" + response)
        console.log('yes, create newcategory', response);

      })
      .catch(error => {
        console.log('no ): create newcategory', error);
      });
  }
  // const { name, description, categoryCode, cityCode, address, numOfBeds, additives, price, advertiserCode, image } = formData;



  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeImage = e => setFormData({ ...formData, image: e.target.files[0] });
  const nav = useNavigate()

  const onSubmit = async e => {
    e.preventDefault();

    try {
      // const formDataObj = new FormData();
      // formDataObj.append('name', name);
      // formDataObj.append('description', description);
      // formDataObj.append('categoryCode', categoryCode);
      // formDataObj.append('cityCode', cityCode);
      // formDataObj.append('address', address);
      // formDataObj.append('numOfBeds', numOfBeds);
      // formDataObj.append('additives', additives);
      // formDataObj.append('price', price);
      // formDataObj.append('advertiserCode', localStorage.getItem('currnertUser'));
      // formDataObj.append('image', image);

      // const res = await axios.patch(`http://localhost:3001/update/${params.id}`, formDataObj, config);
      // console.log(res.data);
      // console.log(formDataObj.values());
      console.log("נוסף בהתלחה");
    } catch (err) {
      console.error(err.response.data);
      console.log(
        " בהוספת דירה נחשל"
      );
      nav(`/`)

    }
  };

  return (
    <div>

      <h2>Update Apartment </h2>
      {/* <div className="apartment" key={apartment.id}> */}
      <form onSubmit={e => onSubmit(e)}>
        {/* <div >
          <input type='text' placeholder='Name' name='name' value={apartment.name} onChange={e => onChange(e)} required />
        </div>
        <div>
          <textarea placeholder='descriptionription' name='description' value={apartment.description} onChange={e => onChange(e)} required />
        </div>
        <div>
          <select name='categoryCode' onChange={e => onChange(e.target.value)} required>
            <option value="" name='categoryCode' disabled selected hidden>בחר catgory</option>
            {listCatgory.length > 0 && listCatgory.map((c, index) => <option name='categoryCode' key={index} value={c._id}  >{c.name}</option>)}
          </select>
          <button onClick={() => setaddCatgory(true)}>AddCatgory</button>
          {addCatgory && <input type='text' placeholder='Category Code' onBlur={(e) => AddCatgory(e.target.value)} className="btns"></input>}
        </div>
        <div>
          <select name='cityCode' onChange={e => onChange(e.target.value)} required>
            <option value="" name='cityCode' disabled selected hidden>בחר city</option>
            {listCity.length > 0 && listCity.map((c, index) => <option name='cityCode' key={index} value={c._id}  >{c.name}</option>)}
          </select>
          <button onClick={() => setaddCity(true)}>AddCity</button>
          {addCity && <input type='text' placeholder='City Code' onBlur={(e) => AddCity(e.target.value)} className="btns"></input>}
        </div>
        <div>
          <input type='text' placeholder='Address' name='address' value={apartment.address} onChange={e => onChange(e)} required />
        </div>
        <div>
          <input type='number' placeholder='Number of Beds' name='numOfBeds' value={apartment.numOfBeds} onChange={e => onChange(e)} required />
        </div>
        <div>
          <input type='text' placeholder='Additives' name='additives' value={apartment.additives} onChange={e => onChange(e)} />
        </div>
        <div>
          <input type='number' placeholder='Price' name='price' value={apartment.price} onChange={e => onChange(e)} required />
        </div> */}

        <div>
          {/* <input type='file' accept='image/*'   onChange={e => onChangeImage(e)} required /> */}

          <h3>{apartment.name}</h3>
          <p><strong>descriptionription:</strong> {apartment.descriptionription}</p>
          <p><strong>Category: </strong>{apartment.categoryCode.name}</p>
          <p><strong>City: </strong>{apartment.cityCode.name}</p>
          <p><strong>Address:</strong> {apartment.address}</p>
          <p><strong>Number of Beds:</strong> {apartment.numOfBeds}</p>
          <p><strong>Additives: </strong>{apartment.additives.join(', ')}</p>
          <p><strong>Additives: </strong>{apartment.additives.map(a => <p> 👉🏽 {a} </p>)}</p>
          <p><strong>Price:</strong> {apartment.price}$</p>
          <p><strong>Advertiser Email: </strong><a href={`mailto:${apartment.advertiserCode.email}`}>{apartment.advertiserCode.email}</a></p>

        </div>
        <input type='submit' value='Submit' />
      </form>
    </div>

    // </div >
  );
};
export default UpdateApartment;