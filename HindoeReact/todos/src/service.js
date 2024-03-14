import axios from 'axios';

const apiUrl = "http://localhost:3001"

export default {


  getTasks: async () => {
    const result = await axios.get(`${apiUrl}`)
    return result.data;
  },

  addTask: async (name) => {
    console.log('addTask', name)
    const result = await axios.post(`${apiUrl}/${name}`)
    return {};
  },

  setCompleted: async (id, isComplete) => {
   const result = await axios.put(`${apiUrl}/${id}/{isComplete}?inputTodo=${isComplete}`)
    return {};
  },

  deleteTask: async (id) => {
    const result = await axios.delete(`${apiUrl}/${id}`)
    console.log('deleteTask', { id })
  }
};
