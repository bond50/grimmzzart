import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Auth from '../../components/wrappers/Auth';
import {MDBInput} from 'mdb-react-ui-kit';
import Select from 'react-select';
import {getCategories} from "../../services/categories.service";
import {getBrands} from "../../services/brand.service";
import {getSubs} from "../../services/sub.service";
import {getProducts} from "../../services/product.service";
import AsyncSelect from "react-select/async";

const DatePicker = React.lazy(() => import("react-datepicker"));

const BannerCreate = () => {
    const [formData, setFormData] = useState({
        contentType: '',
        ctaText: '',
        contentId: '',
        startDate: new Date(),
        endDate: new Date(),
        src: '',
        title: '',
        subtitle: '',
        price: '',
    });

    const [contentIds, setContentIds] = useState([]);

    const [selectedAsyncValue, setSelectedAsyncValue] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    useEffect(() => {
        if (formData.contentType) {
            fetchDataForContentType(formData.contentType, 1, limit);
        }
    }, [formData.contentType, limit]);


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const fetchDataForContentType = async (contentType, page, limit, searchTerm = '') => {
        try {
            console.log("Search Term: ", searchTerm);  // Debug line
            let response;
            let sort = 'createdAt';  // Replace with actual sort field
            let order = 'desc';
            switch (contentType) {
                case 'Category':
                    response = await getCategories();
                    break;
                case 'Sub':
                    response = await getSubs();
                    break;
                case 'Brand':
                    response = await getBrands();
                    break;
                case 'Product':
                    response = await getProducts(sort, order, page, limit, searchTerm);
                    break;
                default:
                    return;
            }

            let dataToMap;
            if (contentType === 'Product') {
                dataToMap = response;  // If it's a Product, use response directly
            } else {
                dataToMap = response.data;  // For others, use response.data
            }

            if (dataToMap) {
                const options = dataToMap.map(item => ({
                    label: `${item.name ? item.name : item.title}`,
                    value: item._id
                }));
                setContentIds(options);
            } else {
                console.error("Data is undefined");
            }

        } catch (error) {
            console.error(`Error fetching ${contentType.toLowerCase()}s:`, error);
        }
    };

    const handleSelectChange = async (selectedOption) => {
        setContentIds([]);
        setSearchTerm('');  // Reset the search term
        setSelectedAsyncValue(null);  // Reset the selected value of AsyncSelect
        setPage(1); // Reset page number
        setFormData({...formData, contentType: selectedOption.value, contentId: ''});
        await fetchDataForContentType(selectedOption.value, 1, limit);
    };


    const handleContentIdChange = (selectedOption) => {
        setFormData({...formData, contentId: selectedOption.value});
    };


    const loadOptions = async (inputValue) => {
        if (inputValue.length < 2) return; // Only search if the user has typed at least 3 characters
        setContentIds([]); // Clear previous options
        await fetchDataForContentType(formData.contentType, 1, limit, inputValue);
        return contentIds;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // ... (existing code)
    };
    const handleMenuScrollToBottom = () => {
        setPage(prevPage => prevPage + 1);
        fetchDataForContentType(formData.contentType, page + 1, limit);
    };

    return (
        <Auth cardTitle="Create Banner">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Content Type</label>
                    <Select
                        onChange={handleSelectChange}
                        options={[
                            {label: 'Category', value: 'Category'},
                            {label: 'Sub Category', value: 'Sub'},
                            {label: 'Brand', value: 'Brand'},
                            {label: 'Product', value: 'Product'},
                        ]}
                    />
                </div>
                {formData.contentType && (
                    <div className="mb-3">
                        <label>{formData.contentType}</label>
                        <AsyncSelect
                            value={selectedAsyncValue}  // Add this line
                            onChange={value => {
                                setSelectedAsyncValue(value);  // Add this line
                                handleContentIdChange(value);
                            }}
                            cacheOptions
                            isClearable
                            defaultOptions={contentIds}
                            loadOptions={loadOptions}
                            onMenuScrollToBottom={handleMenuScrollToBottom}
                        />


                    </div>
                )}

                <div className="mb-3">
                    <MDBInput
                        type="text"
                        name="src"
                        label="Image Source URL"
                        value={formData.src}
                        onChange={handleChange}
                    />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className='form-label'>Start Date</label>
                        <br/>

                        <DatePicker
                            className='form-control'
                            selected={formData.startDate}
                            required
                            showTimeSelect
                            placeholderText="Select a start date and time"
                            dateFormat="Pp"
                            onChange={date => setFormData({...formData, startDate: date})}
                        />

                    </div>

                    <div className="col-md-6 mb-3">
                        <label className='form-label'>End Date</label>
                        <br/>
                        <DatePicker
                            className='form-control'
                            selected={formData.endDate}
                            required
                            showTimeSelect
                            placeholderText="Select an end date and time"
                            dateFormat="Pp"
                            onChange={date => setFormData({
                                ...formData,
                                endDate: date
                            })}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <MDBInput
                        type="text"
                        name="title"
                        label="Dispaly Title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <MDBInput
                        type="text"
                        name="subtitle"
                        label="Display Subtitle"
                        value={formData.subtitle}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <MDBInput
                        type="text"
                        name="price"
                        label="Display Price"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <MDBInput
                        type="text"
                        name="ctaText"
                        label="CTA Text"
                        value={formData.ctaText}
                        onChange={handleChange}
                    />
                </div>


                <button type="submit" className="btn btn-primary">Create Banner</button>
            </form>
        </Auth>
    );
};

export default BannerCreate;
