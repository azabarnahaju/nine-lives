import { useState, useEffect } from 'react';
import { useUserContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import './AddACatBtn.css';
export default function AddACatBtn({ isNewCatAdded, setIsNewCatAdded }) {
    const [isForm, setIsForm] = useState(false);
    const [formDatas, setFormDatas] = useState({});
    const [catDB, setCatDB] = useState(null);
    const [catBreeds, setCatBreeds] = useState([]);
    const { currUser, setCurrUser } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        const addCat = async () => {
            try {
                const response = await fetch(
                    `http://localhost:4000/api/v1/cats`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formDatas),
                    }
                );
                const data = await response.json();
                if (data) {
                    await fetch(
                        `http://localhost:4000/api/v1/users/${currUser._id}`,
                        {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ cats: [data._id] }),
                        }
                    );
                }
                setIsNewCatAdded(!isNewCatAdded);
            } catch (err) {
                console.log(err);
            }
        };
        if (formDatas.name) addCat();
    }, [formDatas]);

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
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setFormDatas(Object.fromEntries(formData));
        setIsForm(!isForm);
        e.currentTarget.reset();
    };

    const handleEsc = () => {
        setIsForm(!isForm);
    };
    return !isForm ? (
        <button className='add-a-cat-btn' onClick={() => setIsForm(!isForm)}>
            +
        </button>
    ) : (
        <div className='add-a-cat-modal'>
            <button className='add-a-cat-modal-esc' onClick={handleEsc}>
                X
            </button>
            <form onSubmit={handleSubmit} className='add-a-cat-form'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' />

                <label htmlFor='birth'>Birth</label>
                <input
                    type='date'
                    id='birth'
                    name='birth'
                    style={{ textAlign: 'center' }}
                />

                <label htmlFor='breed'>Breed</label>
                <select name='breed' id='breed' className='breed-select'>
                    <option>Choose a breed</option>
                    {catBreeds.map((breed) => (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                    ))}
                </select>

                <label htmlFor='color'>Color</label>
                <input type='text' id='color' name='color' />

                <label htmlFor='fav_toy'>Favorite Toy</label>
                <input type='text' id='fav_toy' name='fav_toy' />

                <label htmlFor='image'>Image</label>
                <input type='text' id='image' name='image' />
                    
                <button
                    className='add-a-cat-submit-btn'
                    type='submit'
                    value='Submit'
                >
                    Add a cat
                </button>
            </form>
        </div>
    );
}
