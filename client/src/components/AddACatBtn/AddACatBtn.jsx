import { useState, useEffect } from 'react';
import { useUserContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import './AddACatBtn.css';
export default function AddACatBtn() {
    const [isForm, setIsForm] = useState(false);
    const [formDatas, setFormDatas] = useState({});
    const [catDB, setCatDB] = useState(null);
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
                console.log(data);
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
            } catch (err) {
                console.log(err);
            }
        };
        if (formDatas.name) addCat();
    }, [formDatas]);
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
                <label htmlFor='name'>Name:</label>
                <input type='text' id='name' name='name' />

                <label htmlFor='birth'>Birth:</label>
                <input type='date' id='birth' name='birth' />

                <label htmlFor='breed'>Breed:</label>
                <input type='text' id='breed' name='breed' />

                <label htmlFor='color'>Color:</label>
                <input type='text' id='color' name='color' />

                <label htmlFor='fav_toy'>Favorite Toy:</label>
                <input type='text' id='fav_toy' name='fav_toy' />

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
