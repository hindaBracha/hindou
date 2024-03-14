import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export const Sall = () => {
    let param = useParams()
    let id = param.id
    const [apartment, setApartment] = useState({})
    const [bool, setbool] = useState(false)

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
    let nav = useNavigate()

    const updata = (id) => {
        nav(`/AddApartment/${id}`)
      }

    useEffect(() => {
        console.log("response.data")

        axios.get(`http://localhost:3001/apartment/getById/${id}`)
            .then(response => {
                console.log(response.data)
                setApartment(response.data);
                setbool(true)
                console.log('kj');
            })
            .catch(error => {
                console.log('Error fetching categories', error);
            });

    }, []);
    return <>

        <div className='sall'>
            <p>hgvbhvdhs</p>
        </div>
        {bool&&   <div className='sall' id='dtls'>
            <p className='title'>{apartment.name}</p>
            <p><strong>Description:</strong>{apartment.description}</p>
            <p><strong>Category: </strong>{apartment.categoryCode.name}</p>
            <p><strong>City: </strong>{apartment.cityCode.name}</p>
            <p><strong>Address:</strong> {apartment.address}</p>
            <p><strong>Number of Beds:</strong> {apartment.numOfBeds}</p>
            <p><strong>Additives: </strong>{apartment.additives.join(', ')}</p>
            <p><strong>Additives: </strong>{apartment.additives.map(a => <p> 👉🏽 {a} </p>)}</p>
            <p><strong>Price:</strong> {apartment.price}$</p>
            <p><strong>Advertiser Email: </strong><a href={`mailto:${apartment.advertiserCode.email}`}>{apartment.advertiserCode.email}</a></p>
            {localStorage.getItem('token') && <button onClick={() => deleteApar(apartment._id)}>delete apartment</button>}
            {localStorage.getItem('token') && <button onClick={() => updata(apartment._id)}>update apartment</button>}
        </div>}

    </>
}