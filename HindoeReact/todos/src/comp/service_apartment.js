import axios from 'axios';
import { useSelector } from 'react-redux';

// const apiUrl = "http://localhost:5290/todoitems"



export default {
  // const currentUser= useSelector(x => x.currentUser)

  addApartment: async (ap, f) => {
    try {
      debugger
      const formData = new FormData();
      // formData.append('file', f);
      formData.append('name', ap.name);
      formData.append('desc', ap.desc);
      formData.append('categoryCode', ap.categoryCode);
      formData.append('cityCode', ap.cityCode);
      formData.append('address', ap.address);
      formData.append('numOfBeds', ap.numOfBeds);
      formData.append('additives', ap.additives);
      formData.append('price', ap.price);
      formData.append('advertiserCode', ap.advertiserCode);
      if (f) {
        formData.append('img', f);
        // , f.name
      }
      // formData.append('ap', JSON.stringify(ap));
      console.log("formData", formData);
      const result = await axios.post(`http://localhost:3001/apartment`, formData, {
        headers: {
          'authorization': localStorage.getItem('token')
        }
      });
      return result.data;
    } catch (error) {
      console.error('Error adding apartment:', error);
      throw error; // יודעים לטפל בשגיאה או להעבירה הלאה
    }
  },

  getApartments: async () => {
    try {
      const result = await axios.get(`http://localhost:3001/apartment/getAllApartments`)
      return result.data;
    }

    catch {
      console.log("err in getAllApartments");
    }
  },

  getApartmentByID: async (id) => {
    try {
      const result = await axios.get(`http://localhost:3001/apartment/getById/${id}`)
      return result.data;
    }

    catch {
      console.log("err in getAllApartments");
    }
  },
  update: async (ap, f,id) => {
    try {
      debugger
      const formData = new FormData();
      // formData.append('file', f);
      formData.append('name', ap.name);
      formData.append('desc', ap.desc);
      formData.append('categoryCode', ap.categoryCode);
      formData.append('cityCode', ap.cityCode);
      formData.append('address', ap.address);
      formData.append('numOfBeds', ap.numOfBeds);
      formData.append('additives', ap.additives);
      formData.append('price', ap.price);
      formData.append('advertiserCode', ap.advertiserCode);
      if (f) {
        formData.append('img', f);
        // , f.name
      }
      // formData.append('ap', JSON.stringify(ap));
      console.log("formData", formData);
      const result = await axios.patch(`http://localhost:3001/apartment/update/${id}`, formData, {
        headers: {
          'authorization': localStorage.getItem('token')
        }
      });
      console.log("Success: Apartment update successfully", result.data);
      return result.data;
    } catch (error) {
      console.error('error: Apartment update to faild:', error);
      throw error; 
    }
  }
}