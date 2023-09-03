import React, {useCallback, useEffect, useState} from "react";
import {createProduct} from "../../services/product.service";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import ProductCreateForm from "../../ui/forms/ProductCreateForm";
import {getCategories, getCategorySubs} from "../../services/categories.service";
import {getBrands} from "../../services/brand.service";
import FileUpload from "../../ui/forms/FileUpload";
import Auth from "../../components/wrappers/Auth";


const initialState = {
    title: "",
    color: "",
    video: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    subs: [],
    quantity: "",
    images: [],
    powerRequirements: {
        voltage: "",
        amperage: "",
        frequency: "",
        power: "",
        powerSupplyType: "",
        plugType: "",
        batteryRequirements: "",
        powerManagementFeatures: "",
    },
    dimensions: {
        length: 0,
        width: 0,
        height: 0,
        weight: 0,
    },
    specifications: {
        processor: "",
        model: "",
        ram: {
            size: 0,
            unit: "",
        },
        storage: {
            type: "",
            size: "",
            unit: "",
        },
        display: {
            size: '',
            unit: "inches",
            resolution: "",
        },
        camera: {
            mainCamera: {
                resolution: "",
                features: "",
                aperture: "",
                sensorSize: "",
                pixelSize: "",
                focalLength: "",
                opticalZoom: "",
                videoResolution: "",
                flash: "",
                lens: ""
            },
            frontCamera: {
                resolution: "",
                features: "",
                aperture: "",
                sensorSize: "",
                pixelSize: "",
                focalLength: "",
                videoResolution: "",
                flash: "",
                lens: ""
            },
            sensors: ""
        },

        battery: {
            capacity: '',
            unit: "",
        },
        os: "",
        sim: "",
        connectivity: "",
        audioFeatures: "",
    },
    warranty: {
        duration: '',
        details: "",
    },

};

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const {user} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [subOptions, setSubOption] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [selectedSub, setSelectedSub] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState('');

    const [currentStep, setCurrentStep] = useState(1);


    const loadCategories = useCallback(() => {
        getCategories()
            .then((response) => {
                setCategories(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const loadBrands = useCallback(() => {
        getBrands()
            .then((response) => {
                setBrands(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        loadCategories();
        loadBrands();
    }, [loadCategories, loadBrands]);

    useEffect(() => {
        let myArr = [];
        selectedSub.map(({_id}) => myArr.push(_id));
        setValues((values) => ({...values, subs: myArr}));
    }, [selectedSub]);

    // const handleChange = (event) => {
    //     setValues({...values, [event.currentTarget.name]: event.currentTarget.value});
    // };
    //

    const handleChange = (event) => {
        const {name, value} = event.target;

        const keys = name.split('.');

        console.log(keys)

        if (keys.length === 1) {
            setValues({...values, [name]: value});
        } else {
            // For nested objects, we need to update them immutably
            let updatedValues = {...values};
            let currentLevel = updatedValues;
            for (let i = 0; i < keys.length - 1; i++) {
                currentLevel[keys[i]] = {...currentLevel[keys[i]]};
                currentLevel = currentLevel[keys[i]];
            }
            currentLevel[keys[keys.length - 1]] = value;
            setValues(updatedValues);
        }
    };


    const handleCategoryChange = (opt) => {
        setSelectedSub([]);
        setValues({...values, category: opt});

        getCategorySubs(opt._id)
            .then((response) => {
                if (response.data.length > 0) {
                    setSubOption(response.data);
                    setShowSub(true);
                } else {
                    setShowSub(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleBrandChange = (opt) => {
        setValues({...values, brand: opt});
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        const submitValues = {
            ...values,
            brand: values.brand._id,
            category: values.category._id,
            description
        }


        console.log('SUBMIT', submitValues)
        createProduct(submitValues, user.token)
            .then((response) => {
                setValues(initialState);
                toast(`${response.data.title} is created`, {
                    type: "success"
                });
                loadCategories();
                setSelectedSub([]);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.response);
                toast(error.response.data.error, {
                    type: "error"
                });
                setLoading(false);
            });
    };

    return (
        <Auth cardTitle="Product create">

            <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
                loading={loading}
            />

            <ProductCreateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                values={values}
                loading={loading}
                brandOptions={brands}
                categoryOptions={categories}
                handleCategoryChange={handleCategoryChange}
                subOptions={subOptions}
                setSubOptions={setSubOption}
                handleBrandChange={handleBrandChange}
                showSub={showSub}
                setValues={setValues}
                selectedSub={selectedSub}
                setSelectedSub={setSelectedSub}
                description={description}
                setDescription={setDescription}


            />
        </Auth>
    );
};

export default ProductCreate;
