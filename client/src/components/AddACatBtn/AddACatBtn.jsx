import { useState, useEffect } from 'react';
import { useUserContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import './AddACatBtn.css';

const updateUserCats = async (newCat, currentUser) => {
    fetch(`http://localhost:4000/api/v1/users/${currUser._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cats: [newCat._id] }),
    });
}
export default function AddACatBtn({ setUserCats }) {
    const [isForm, setIsForm] = useState(false);
    const [catBreeds, setCatBreeds] = useState([]);
    const { currUser, setCurrUser } = useUserContext();

    const formik = useFormik({
      initialValues: {},
      onSubmit: async (values, {resetForm}) => {
        const formData = new FormData();

        for (let value in values) {
          formData.append(value, values[value]);
        }

        try {
            const response = await fetch(
                "http://localhost:4000/api/v1/cats", 
                {
                    method: "POST",
                    body: formData,
                });
            
            if (!response.ok) {
                throw new Error("Error adding new cat");
            }

            const newCat = await response.json();
            try {
                const result = await fetch(`http://localhost:4000/api/v1/users/${currUser._id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ cats: [newCat._id] }),
                });

                if (!result.ok){
                    throw new Error("Error updating user profile")
                }
            } catch (error) {
                console.log("Error updating user profile:", error)
            }
            
            setUserCats((oldCats) => [...oldCats, newCat]);
            setIsForm(!isForm);

        } catch (error) {
            console.log("Error adding cat:", error);
        }
        
        resetForm();
      },
    });

    useEffect(() => {
        try {
            const fetchBreeds = async () => {
                const catApiResponse = await fetch(
                    'https://api.thecatapi.com/v1/breeds'
                );
                const catBreedsData = await catApiResponse.json();
                const catBreedsNames = catBreedsData.map((breed) => breed.name);
                setCatBreeds(catBreedsNames);
            };
            fetchBreeds();
        } catch (err) {
            console.log(err);
        }
    }, []);
    
    const handleEsc = () => {
      formik.resetForm();  
      setIsForm(!isForm);
    };

    return !isForm ? (
      <button className="add-a-cat-btn" onClick={() => setIsForm(!isForm)}>
        +
      </button>
    ) : (
      <div className="add-a-cat-modal">
        <button className="add-a-cat-modal-esc" onClick={handleEsc}>
          X
        </button>
        <form
          className="add-a-cat-form"
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />

          <label htmlFor="birth">Birth</label>
          <input
            type="date"
            id="birth"
            name="birth"
            style={{ textAlign: "center" }}
            onChange={formik.handleChange}
            value={formik.values.birth}
          />

          <label htmlFor="breed">Breed</label>
          <select
            name="breed"
            id="breed"
            className="breed-select"
            onChange={formik.handleChange}
            value={formik.values.breed}
          >
            <option>Choose a breed</option>
            {catBreeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>

          <label htmlFor="color">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            onChange={formik.handleChange}
            value={formik.values.color}
          />

          <label htmlFor="fav_toy">Favorite Toy</label>
          <input
            type="text"
            id="fav_toy"
            name="fav_toy"
            onChange={formik.handleChange}
            value={formik.values.fav_toy}
          />

          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(e) =>
              formik.setFieldValue("image", e.currentTarget.files[0])
            }
          />

          <button className="add-a-cat-submit-btn" type="submit" value="Submit">
            Add a cat
          </button>
        </form>
      </div>
    );
}
