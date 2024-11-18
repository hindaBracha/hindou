import { useDispatch, useSelector } from "react-redux";
// import { addLelel } from "./Set";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import service_catgory from "./service_catgory";
import service_city from "./service_city";
import service_apartment from "./service_apartment";


export const Aadlevel = () => {
    // const [selectedFile, setselectedFile] = useState()
    const CarrentUser = useSelector(x => x.currentUser);
    const codeuser = CarrentUser.id
    const [Categories, setCategories] = useState([]);
    const [Cities, setCities] = useState([]);
    const [categor, setCatego] = useState()
    const [city, setCity] = useState()
    const [description, setDescription] = useState()
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [additions, setAdditions] = useState([]);
    const [image, setImage] = useState(null);
    const [name, setName] = useState(null);
    const [beds, setBeds] = useState(null);
    const [price, setPrice] = useState(null);
    const [address, setAddress] = useState(null);
    const dispatch = useDispatch();
    const nav = useNavigate()
    const [file, setFile] = useState(null);

    let param = useParams()
    let id = param.id

    const fetchDataAndSetState = async () => {
        try {
            if(id!=1){
                const result = await service_apartment.getApartmentByID(id);
                setCity(result.data.cityCode);
                setAdditions(result.data.additives);
                setBeds(result.data.numOfBeds);
                setPrice(result.data.price);
                setCatego(result.data.categoryCode);
                setImage(result.data.image);
                setAddress(result.data.address);
                setDescription(result.data.description);
                setName(result.data.name);
            }
            const resultCategories = await service_catgory.getCategory();
            setCategories(resultCategories);

            const resultCities = await service_city.getCity();
            setCities(resultCities);
            console.log(resultCities);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    useEffect(() => {
        fetchDataAndSetState();
    }, []);

    if (!Categories) {
        debugger
        return <div>Loading Categories...</div>;
    }
    if (!Cities) {
        return <div>Loading Cities...</div>;
    }

    // const handleOptionChange = (option) => {
    //     if (selectedOptions.includes(option)) {
    //         setSelectedOptions(selectedOptions.filter((item) => item !== option));
    //     } else {
    //         setSelectedOptions([...selectedOptions, option]);
    //     }
    // }
    /////Change---------------------------------------------------------------
    const Change = () => {
        if (!categor || !additions || !description || !city || !name || !address || !price || !beds || !image) {
            return false;
        }
        return true
    }


    /////send---------------------------------------------------------------
    const send = async (event) => {
        debugger
        event.preventDefault()

        if (Change()) {
            // await handleUpload();
            const apartment = {
                name: name,
                desc: description,
                categoryCode: categor,
                cityCode: city,
                address: address,
                numOfBeds: beds,
                additives: additions,
                price: price,
                advertiserCode: codeuser
            }
            console.log("dd", apartment);
            if (id == 1) {///אם הגיע לקומפוננטה כדי להוסיף דירה אז יהיה שווה אחד ה
                const result = await service_apartment.addApartment(apartment, image).then(() => {
                    swal("המתכון", "נוסף בהצלחה י'שף", "success")
                    console.log("secc");
                }).catch((r) => {
                    console.log(r);
                })
            }
            else{
                const result = await service_apartment.update(apartment, image,id).then(() => {
                    swal("המתכון", "נוסף בהצלחה י'שף", "success")
                    console.log("secc");
                }).catch((r) => {
                    console.log(r);
                })
            }
        }
        else alert("הלו מלא את כל השדות טמבל")
    }
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch('YOUR_SERVER_ENDPOINT', {
                method: 'POST',
                body: formData,
            });
            // טופל כאן את התגובה מהשרת אם נדרש
            const result = await response.json();
            console.log('Server response:', result);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };



    // const  onFileChange = event => {
    //     // Update the state
    //     this.setState({ selectedFile: event.target.files[0] });
    //   };

    //   // On file upload (click the upload button)
    // const  onFileUpload = () => {
    //     // Create an object of formData
    //     const formData = new FormData();
    //     // Update the formData object
    //     formData.append(
    //       "myFile",
    //       this.state.selectedFile,
    //       this.state.selectedFile.name
    //     );
    //     console.log(this.state.selectedFile);
    //     // Request made to the backend api
    //     // Send formData object
    //     // axios.post(`${g_api}/upload/`, formData)
    //     // .then(res =>{
    //     //    console.log(res);
    //     // })
    //     // .catch(err=>{
    //     //    console.log(err);
    //     // });
    //   };

    return <>
        <form className='login apartment' onSubmit={(e) => send(e)}>
            <div className="c1">
                {/* ----name------------------------------ */}
                <label htmlFor={'name'}>recip name:</label><br />
                <input id={'name'}  placeholder={'input name recip'} value={name} onChange={(e) => setName(e.target.value)}></input><br />
                {/* ----description------------------------------ */}
                <label htmlFor={'description'}>description:</label><br />
                <input id={'name'} placeholder={'input description'} value={description} onChange={(e) => setDescription(e.target.value)}></input><br />
                {/* ----address------------------------------ */}
                <label htmlFor={'address'}>address:</label><br />
                <input id={'name'} placeholder={'input address'} value={address} onChange={(e) => setAddress(e.target.value)}></input><br />
                {/* ---pic---------------------------------------- */}
                {/* <input type="file" accept="/image" /> */}
                {/* <input type="file" onChange={handleFileChange} /> */}
                <Container className="App" value={image}>
                    <Form>
                        <Form.Group controlId="formImage">
                            <Form.Label>בחר תמונה</Form.Label><br />
                            <Form.Control type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                        </Form.Group>
                    </Form>
                    <div className="image-preview">

                        {image && <img src={URL.createObjectURL(image)} alt="תמונה" width={250} />}
                    </div>
                </Container>
                {/* ----category------------------------------ */}
                <label htmlFor="Category">select Category:</label>
                <br />
                <select id="selcetCategory" value={categor} onChange={(e) => setCatego(e.target.value)}>
                    <option value="" disabled selected hidden>בחר אפשרות</option>
                    {Categories && Categories.map((c, index) => <option key={index} value={c._id}>{c.name}</option>)}
                </select>
            </div>
            <div className="c2">
                {/* ----price------------------------------ */}
                <label htmlFor={'price'}>price:</label><br />
                <input type="number" id={'name'} value={price} placeholder={'input price'} onChange={(e) => setPrice(e.target.value)}></input><br />
                {/* ----numOfBeds------------------------------ */}
                <label htmlFor={'numOfBeds'}>numOfBeds:</label><br />
                <input type="number" id={'name'} value={beds} placeholder={'input num of beds'} onChange={(e) => setBeds(e.target.value)}></input><br />
                {/* ---additives---------------------------------------- */}
                <label htmlFor="additives"> instrac:</label><br />
                <p>Separate additions with commas</p>
                <br />
                <textarea rows="4" cols="43" className="instrac" id="instrac" value={additions} onBlur={(e) => {
                    // let additions = e.target.value.split(',')
                    setAdditions(e.target.value)
                }} /><br />
                {/* ----city------------------------------ */}
                <label htmlFor="selcetCategor">select city:</label>
                <br />
                <select id="selcetCategor" value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="" disabled selected hidden>בחר אפשרות</option>
                    {Cities && Cities.map((c, index) => <option key={index} value={c._id}>{c.name}</option>)}
                </select>
                <br></br>
            </div>
            <input type={'submit'} value={'send'} className="btns" style={{ width: '900px' }}></input>

        </form>
    </>
}