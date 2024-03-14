
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import gg from './gg.css';
import { useNavigate, useParams } from 'react-router-dom';

export const AddApartment = () => {

  let param = useParams()
  let id = param.id

  const [listCatgory, setListCatgory] = useState([])
  const [addCatgory, setaddCatgory] = useState(false)
  const [listCity, setListCity] = useState([])
  const [addCity, setaddCity] = useState(false)

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
      'authorization': `${localStorage.getItem('token')}`
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/apartment/getById/${id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.log('Error fetching categories', error);
      });

    axios.get('http://localhost:3001/category/')
      .then(response => {
        setListCatgory(response.data.Category);
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

  const AddCity = (e) => {
    let er = {
      'name': e
    }
    axios.post(`http://localhost:3001/city?id=${localStorage.getItem('currnertUser')}`, er, config)
      .then(response => {
        alert("Success: " + e + "+" + response)
        console.log('City added successfully', response);
      })
      .catch(error => {
        console.log('Failed to add city', error);
      });
  }

  const AddCatgory = (e) => {
    let er = {
      'name': e
    }
    axios.post(`http://localhost:3001/category?id=${localStorage.getItem('currnertUser')}`, er, config)
      .then(response => {
        alert("Success: " + e + "+" + response)
        console.log('Category added successfully', response);
      })
      .catch(error => {
        console.log('Failed to add category', error);
      });
  }
  const { name, description, categoryCode, cityCode, address, numOfBeds, additives, price, advertiserCode, image } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onChangeImage = e => {
    // setFormData({ ...formData, image: <e className="target files"></e> });
    setFormData({ ...formData, image: e.target.files.name });
  };
  // const onChangeImage = e => {
  //   const imageFile = e.target.files[0];
  //   setFormData({ ...formData, image: imageFile });
  // };


  const nav = useNavigate()

  const onSubmit = async e => {
    e.preventDefault();

    try {
      let c = {
        'name': name,
        'description': description,
        'image': image,
        'categoryCode': categoryCode,
        'cityCode': cityCode,
        'address': address,
        'numOfBeds': numOfBeds,
        'additives': additives,
        'price': price,
        'advertiserCode': localStorage.getItem('currnertUser')
      }

      if (id == 1) {
        const res = await axios.post('http://localhost:3001/apartment/', c, config);
        console.log("Success: Apartment added successfully", res.data);
        console.log("נוסף בהצלחה");
      }
      else {
        const res = await axios.patch(`http://localhost:3001/apartment/update/${id}`, c, config);
        console.log("Success: Apartment update successfully", res.data);
        console.log("update - בהצלחה");

      }
    } catch (err) {
      console.error("Error adding apartment:", err.response.data);
      console.log("Failed to add apartment");
    }
   // nav(`/`);
  };

  return (
    <div className="apartment">
      <h1>Add Apartment</h1>
      <form onSubmit={onSubmit}>
        <strong>Name:</strong>
        <div>
          <input type='text' placeholder='Name' name='name' value={formData.name} onChange={onChange} required />
        </div>
        <strong>Description:</strong>
        <div>
          <textarea placeholder='Description' name='description' value={formData.description} onChange={onChange} required />
        </div>
        <strong>Category: </strong>
        <div>
          <select name='categoryCode' value={formData.categoryCode} onChange={onChange} required>
            <option value="" disabled hidden>Choose category</option>
            {listCatgory.map((c, index) => <option key={index} value={c._id}>{c.name}</option>)}
          </select>
          <button onClick={() => setaddCatgory(true)}>Add Category</button>
          {addCatgory && <input type='text' placeholder='Add Category' value={formData.categoryCode} onBlur={(e) => AddCatgory(e.target.value)} />}
        </div>
        <strong>City: </strong>
        <div>
          <select name='cityCode' value={formData.cityCode} onChange={onChange} required>
            <option value="" disabled hidden>Choose city</option>
            {listCity.map((c, index) => <option key={index} value={c._id}>{c.name}</option>)}
          </select>
          <button onClick={() => setaddCity(true)}>Add City</button>
          {addCity && <input type='text' placeholder='Add City' value={formData.cityCode} onBlur={(e) => AddCity(e.target.value)} />}
        </div>
        <strong>Address:</strong>
        <div>
          <input type='text' placeholder='Address' name='address' value={formData.address} onChange={onChange} required />
        </div>
        <strong>Number of Beds:</strong>
        <div>
          <input type='number' placeholder='Number of Beds' name='numOfBeds' value={formData.numOfBeds} onChange={onChange} required />
        </div>
        <strong>Additives: </strong>
        <div>
          <input type='text' placeholder='Additives' name='additives' value={formData.additives} onChange={onChange} />
        </div>
        <strong>Price:</strong>
        <div>
          <input type='number' placeholder='Price' name='price' value={formData.price} onChange={onChange} required />
        </div>
        <div>
          <input type='file' accept='image/*' onChange={onChangeImage} required />
        </div>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default AddApartment;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import gg from './gg.css';
// import { useNavigate } from 'react-router-dom';

// // const token = localStorage.getItem('token'); // השגת הטוקן מהאחסון המקומי
// // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // הוספת הטוקן לכותרת בבקשות axios


// export const AddApartment = () => {

//   const [listCatgory, setListCatgory] = useState([])
//   const [addCatgory, setaddCatgory] = useState(false)
//   const [listCity, setListCity] = useState([])
//   const [addCity, setaddCity] = useState(false)

//   const [formData, setFormData] = useState({
//     name: '',
//     desc: '',
//     categoryCode: '',
//     cityCode: '',
//     address: '',
//     numOfBeds: '',
//     additives: '',
//     price: '',
//     advertiserCode: '',
//     image: null
//   });


//   //אימות
//   //headers ב  jwt שליחה של ה
//   const config = {
//     headers: {
//       'authorization': `${localStorage.getItem('token')}`
//     }
//   };

//   useEffect(() => {
//     //קבלת כול הקטגוריות והערים

//     axios.get('http://localhost:3001/category/')
//       .then(response => {
//         setListCatgory(response.data.Category);
//       })
//       .catch(error => {
//         console.log(' 3 Error cant coming the catgory', error);
//       });
//     axios.get('http://localhost:3001/city/')
//       .then(response => {
//         setListCity(response.data.city);
//       })
//       .catch(error => {
//         console.log(' 5 Error cant coming the city', error);
//       });
//   }, []);

//   // הוספת עיר
//   const AddCity = (e) => {
//     let er = {
//       'name': e
//     }
//     axios.post(`http://localhost:3001/city?id=${localStorage.getItem('currnertUser')}`, er, { headers: { 'authorization': localStorage.getItem('token') } })
//       .then(response => {
//         alert("succc;" + e + "+" + response)
//         console.log('yes, create newcity', response);

//       })
//       .catch(error => {
//         console.log('no ): create newcity', error);
//       });
//   }

//   //הוספת קטגוריה
//   const AddCatgory = (e) => {

//     let er = {
//       'name': e
//     }
//     axios.post(`http://localhost:3001/category?id=${localStorage.getItem('currnertUser')}`, er, { headers: { 'authorization': localStorage.getItem('token') } })
//       .then(response => {
//         alert("succc;" + e + "+" + response)
//         console.log('yes, create newcategory', response);

//       })
//       .catch(error => {
//         console.log('no ): create newcategory', error);
//       });
//   }
//   const { name, desc, categoryCode, cityCode, address, numOfBeds, additives, price, advertiserCode, image } = formData;
//   //בעת שינוי
//   //יכניס את הערך לפי שם הערך
//   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onChangeImage = e => setFormData({ ...formData, image: e.target.files[0] });
//   const nav = useNavigate()

//   const onSubmit = async e => {
//     e.preventDefault();

//     try {
//       let c = {
//         'name': name,
//         'description': desc,
//         'image': image,
//         'categoryCode': '65ccb7ed8dc57f949d963f60',//categoryCode,
//         'cityCode':'65cc8d0b2c9e2494c951bd5f',// cityCode,
//         'address': address,
//         'numOfBeds': numOfBeds,
//         'additives': additives,
//         'price': price,
//         'advertiserCode': localStorage.getItem('currnertUser')
//       }
//       //יצירת אוביקט שיעבור בגוף הבקשה
//       const formDataObj = new FormData();
//       //שיוך ערך למכיל
//       formDataObj.append('name', name);
//       formDataObj.append('description', desc);
//       formDataObj.append('image', image);
//       formDataObj.append('categoryCode', categoryCode);
//       formDataObj.append('cityCode', cityCode);
//       formDataObj.append('address', address);
//       formDataObj.append('numOfBeds', numOfBeds);
//       formDataObj.append('additives', additives);
//       formDataObj.append('price', price);
//       formDataObj.append('advertiserCode', localStorage.getItem('currnertUser'));

//       const res = await axios.post('http://localhost:3001/apartment/', c, { headers: { 'authorization': localStorage.getItem('token') } });
//       console.log(res.data, formDataObj);
//       console.log(formDataObj.values());
//       console.log("נוסף בהצלחה");
//     } catch (err) {
//       console.error(err.response.data);
//       console.log(
//         " בהוספת דירה נחשל"
//       );
//       nav(`/`)

//     }
//   };

//   return (

//     <div className="apartment" >

//       <h1>Add Apartment</h1>
//       <form onSubmit={e => onSubmit(e)}>
//         <strong>Name:</strong>
//         <div>
//           <input type='text' placeholder='Name' name='name' value={name} onChange={e => onChange(e)} required />
//         </div>
//         <strong>Description:</strong>
//         <div>
//           <textarea placeholder='Description' name='desc' value={desc} onChange={e => onChange(e)} required />
//         </div>
//         <strong>Category: </strong>
//         <div>
//           <select name='categoryCode' onChange={e => onChange(e.target.value)} required>
//             <option value="" disabled selected hidden>בחר catgory</option>
//             {listCatgory.length > 0 && listCatgory.map((c, index) => <option key={index} value={c._id}  >{c.name}</option>)}
//           </select>
//           {/* רק כשלוחץ על הוספה input יציג את ה  */}
//           <button onClick={() => setaddCatgory(true)}>AddCatgory</button>
//           {addCatgory && <input type='text' placeholder='Add Category ' onBlur={(e) => AddCatgory(e.target.value)} className="btns"></input>}
//         </div>
//         <strong>City: </strong>
//         <div>
//           <select name='cityCode' onChange={e => onChange(e.target.value)} required>
//             <option value="" name='cityCode' disabled selected hidden>בחר city</option>
//             {listCity.length > 0 && listCity.map((c, index) => <option name='cityCode' key={index} value={c._id}  >{c.name}</option>)}
//           </select>
//           {/* רק כשלוחץ על הוספה input יציג את ה  */}
//           <button onClick={() => setaddCity(true)}>AddCity</button>
//           {addCity && <input type='text' placeholder='Add City ' onBlur={(e) => AddCity(e.target.value)} className="btns"></input>}
//         </div>
//         {/* <div>
//           <input type='text'  value={categoryCode} onChange={e => onChange(e)} required />
//         </div> */}

//         {/* <div>
//           <input type='text'  value={cityCode} onChange={e => onChange(e)} required />
//         </div> */}
//         <strong>Address:</strong>
//         <div>
//           <input type='text' placeholder='Address' name='address' value={address} onChange={e => onChange(e)} required />
//         </div>
//         <strong>Number of Beds:</strong>
//         <div>
//           <input type='number' placeholder='Number of Beds' name='numOfBeds' value={numOfBeds} onChange={e => onChange(e)} required />
//         </div>
//         <strong>Additives: </strong>
//         <div>
//           <input type='text' placeholder='Additives' name='additives' value={additives} onChange={e => onChange(e)} />
//         </div>
//         <strong>Price:</strong>
//         <div>
//           <input type='number' placeholder='Price' name='price' value={price} onChange={e => onChange(e)} required />
//         </div>

//         <div>
//           <input type='file' accept='image/*' onChange={e => onChangeImage(e)} required />
//         </div>
//         <input type='submit' value='Submit' />
//       </form>
//     </div>
//   );
// };
// export default AddApartment;