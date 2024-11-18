import axios from 'axios';

const url = "http://localhost:3001/apartment/"

export default {


    getAllApartments:async () => {
        const result =await axios.get(`${url}getAllApartments`)
        return result.data;
    },

    // addTask: (name) => {
    //     console.log('addTask', name)
    //     const result = axios.post(`${url}/${name}`)
    //     return {};
    // },

    // setCompleted: (id, isComplete) => {
    //     const result = axios.put(`${url}/${id}/{isComplete}?inputTodo=${isComplete}`)
    //     return {};
    // },

    // deleteTask: (id) => {
    //     const result = axios.delete(`${url}/${id}`)
    //     console.log('deleteTask', { id })
    // }
};
