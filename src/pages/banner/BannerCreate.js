import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Auth from '../../components/wrappers/Auth';
import {MDBBtn, MDBInput} from 'mdb-react-ui-kit';
import Select from 'react-select';
import {getCategories} from "../../services/categories.service";
import {getBrands} from "../../services/brand.service";
import {getSubs} from "../../services/sub.service";
import {getProducts} from "../../services/product.service";
import AsyncSelect from "react-select/async";
import FileUpload from "../../ui/forms/FileUpload";
import {getBrand} from "../../services/brand.service";
import {getCategory} from "../../services/categories.service";
import {getProduct} from "../../services/product.service";
import {getSub} from "../../services/sub.service";
import {createBanner} from "../../services/banner.service";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";

const DatePicker = React.lazy(() => import("react-datepicker"));

const BannerCreate = () => {
    const [formData, setFormData] = useState({
        contentType: '',
        ctaText: '',
        contentId: '',
        startDate: new Date(),
        endDate: new Date(),
        title: '',
        subtitle: '',
        price: '',
        images: []
    });

    const [width, setWidth] = useState(830); // Default width
    const [height, setHeight] = useState(550);
    const [contentIds, setContentIds] = useState([]);
    const [selectedAsyncValue, setSelectedAsyncValue] = useState(null);
    const [isSearchTermFound, setIsSearchTermFound] = useState(false);
    const [loading, setLoading] = useState(false)
    const [uploading, setupLoading] = useState(false)
    const [selectedContentDetails, setSelectedContentDetails] = useState(null); // New state variable
    const [page, setPage] = useState(1);
    const {user} = useSelector((state) => state.auth);
    const [isSmallBanner, setIsSmallBanner] = useState(false);
    const [isMainBanner, setIsMainBanner] = useState(false);


    const limit = 50

    useEffect(() => {
        const fetchData = async () => {
            if (formData.contentType) {
                await fetchDataForContentType(formData.contentType, 1, limit);
            }
        };
        fetchData();


    }, [formData.contentType]);


    useEffect(() => {

        if (isMainBanner) {
            setWidth(830);
            setHeight(550);
        } else {
            setWidth(405);
            setHeight(265);
        }
    }, [isMainBanner, isSmallBanner]);


    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleToggle = (e) => {
        const {name, checked} = e.target;

        if (name === "isSmallBanner") {
            setIsSmallBanner(checked);
            if (checked) {
                setIsMainBanner(false);
            }
        } else if (name === "isMainBanner") {
            setIsMainBanner(checked);
            if (checked) {
                setIsSmallBanner(false);
            }
        }
    };


    const fetchDataForContentType = async (contentType, page, limit, searchTerm = '') => {
        try {
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
                    label: `${item.name ? item.name : item.displayTitle}`,
                    value: item._id,
                    slug: item.slug
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
        // Reset states
        setContentIds([]);
        setSelectedAsyncValue(null);
        setPage(1);

        // Update formData and fetch data
        setFormData(prevState => ({...prevState, contentType: selectedOption.value, contentId: ''}));
        await fetchDataForContentType(selectedOption.value, 1, limit);
    };


    const handleContentIdChange = async (selectedOption) => {
        if (selectedOption) {
            let fetchedDetails;
            try {
                switch (formData.contentType) {
                    case 'Product':
                        const productResponse = await getProduct(selectedOption.slug);
                        fetchedDetails = productResponse.data;
                        break;
                    case 'Category':
                        const categoryResponse = await getCategory(selectedOption.slug);
                        fetchedDetails = categoryResponse.data;
                        break;
                    case 'Sub':
                        const subResponse = await getSub(selectedOption.slug);
                        fetchedDetails = subResponse.data.sub;
                        break;
                    case 'Brand':
                        const brandResponse = await getBrand(selectedOption.slug);
                        fetchedDetails = brandResponse.data.brand;
                        break;
                    default:
                        return;
                }
            } catch (error) {
                console.error(`Error fetching details for ${formData.contentType}:`, error);
                return;
            }

            // Update the state with the fetched details
            setSelectedContentDetails(fetchedDetails);

            // Update formData
            setFormData({...formData, contentId: selectedOption.value});
        } else {
            setFormData({...formData, contentId: ''});
            setSelectedContentDetails(null); // Reset to null
        }
    };


    const loadOptions = async (inputValue) => {
        let filteredOptions = [];

        // If the contentType is 'Product' and the user has typed less than 2 characters,
        // and if it's an API request (i.e., isSearchTermFound is false), then return.
        if (formData.contentType === 'Product' && inputValue.length < 2 && !isSearchTermFound) {
            return;
        }

        // Search in loaded options first
        filteredOptions = contentIds.filter(option =>
            option.label.toLowerCase().includes(inputValue.toLowerCase())
        );

        if (filteredOptions.length > 0) {
            setIsSearchTermFound(true);
            return filteredOptions;
        } else {
            setIsSearchTermFound(false);
        }

        // If contentType is Product and search term not found in loaded options, then make API request
        if (formData.contentType === 'Product' && !isSearchTermFound) {
            await fetchDataForContentType(formData.contentType, 1, limit, inputValue);
            return contentIds;
        }

        // For Category, Brand, and Sub, just return the filtered options (no API request)
        if (['Category', 'Brand', 'Sub'].includes(formData.contentType)) {
            return filteredOptions;
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const compatibleStartDate = formData.startDate.toISOString();
        const compatibleEndDate = formData.endDate.toISOString();

        const compatibleFormData = {
            ...formData,
            startDate: compatibleStartDate,
            endDate: compatibleEndDate,
            isSmallBanner,
            isMainBanner,
        };

        try {
            const newBanner = await createBanner(compatibleFormData, user.token);
            if (newBanner) {
                toast(`New banner "${newBanner.title}" is created successfully!`, {
                    type: 'success'
                });

                // Clear all fields after successful submission
                setFormData({
                    contentType: '',
                    ctaText: '',
                    contentId: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    title: '',
                    subtitle: '',
                    price: '',
                    images: []
                });
                setIsSmallBanner(false);
                setIsMainBanner(false);
                setSelectedAsyncValue(null);
            } else {
                toast("Banner creation was successful but the response is empty.", {
                    type: 'warning'
                });
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error creating banner:", error);
            const errorMessage = error.response?.data?.error || "An unknown error occurred";
            if (error.code === 11000) { // MongoDB duplicate key error code
                toast("Duplicate banner cannot be created.", {
                    type: 'error'
                });
            } else {
                toast(`Failed to create banner: ${errorMessage}`, {
                    type: 'error'
                });
            }
        }
    };


    const handleMenuScrollToBottom = () => {
        setPage(prevPage => prevPage + 1);
        fetchDataForContentType(formData.contentType, page + 1, limit);
    };

    const generateFolderPath = () => {
        if (!formData.contentType || !selectedContentDetails) return '';

        switch (formData.contentType) {
            case 'Product':
                return selectedContentDetails.category ? `Banners/Products/${selectedContentDetails.category.name}/${selectedContentDetails.title}` : '';
            case 'Category':
                return selectedContentDetails.category ? `Banners/Categories/${selectedContentDetails.category.name}` : '';
            case 'Sub':
                return selectedContentDetails.name ? `Banners/Subs/${selectedContentDetails.name}` : '';
            case 'Brand':
                return selectedContentDetails.name ? `Banners/Brands/${selectedContentDetails.name}` : '';
            default:
                return '';
        }
    };
    const isButtonDisabled = () => {
        // Check if loading or uploading
        if (loading || uploading) {
            return true;
        }
        if (!isSmallBanner && !isMainBanner) {
            return true;
        }
        // Check if any field in formData is not provided or if images array is empty
        for (const key in formData) {
            if (formData[key] === '' || (key === 'images' && formData[key].length === 0)) {
                return true;
            }
        }

        return false;
    };
    const isUploadButtonDisabled = () => {
        return !(isSmallBanner || isMainBanner);
    };

    return (
        <Auth cardTitle="Create Banner">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Display Options</label>
                    <div>
                        <input
                            type="checkbox"
                            name="isSmallBanner"
                            checked={isSmallBanner}
                            onChange={handleToggle}
                        />
                        <label className='mx-2'>Small Banner</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            name="isMainBanner"
                            checked={isMainBanner}
                            onChange={handleToggle}
                        />
                        <label className='mx-2'>Main Banner</label>
                    </div>
                </div>

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
                    <FileUpload
                        values={formData}
                        setValues={setFormData}
                        setLoading={setupLoading}
                        loading={uploading}
                        width={width}
                        height={height}
                        uploadDisabled={isUploadButtonDisabled() || !generateFolderPath()}
                        folder={generateFolderPath()}
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


                <MDBBtn type="submit"
                        disabled={isButtonDisabled()}
                        className="btn btn-primary">{loading ? 'Creating' : 'Create Banner'}</MDBBtn>

            </form>
        </Auth>
    );
};

export default BannerCreate;
