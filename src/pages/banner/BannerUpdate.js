import React, {useState, useEffect} from 'react';
import axios from 'axios';

const BannerUpdate = ({match}) => {
    const [formData, setFormData] = useState({
        contentType: '',
        contentId: '',
        src: '',
        title: '',
        subtitle: '',
        price: '',
    });

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get(`/api/banner/${match.params.slug}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching banner:', error);
            }
        };
        fetchBanner();
    }, [match.params.slug]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/banner/${match.params.slug}`, formData);
            console.log('Banner Updated:', response);
        } catch (error) {
            console.error('Error updating banner:', error);
        }
    };

    return (
        <div>
            <h1>Update Banner</h1>
            <form onSubmit={handleSubmit}>
                {/* Add form fields here */}
                {/* Example: */}
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                />
                {/* Add other form fields */}
                <button type="submit">Update Banner</button>
            </form>
        </div>
    );
};

export default BannerUpdate;
