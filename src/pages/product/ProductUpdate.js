import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import ProductUpdateForm from "../../ui/forms/ProductUpdateForm";
import FileUpload from "../../ui/forms/FileUpload";
import {toast} from "react-toastify";
import {getProduct, updateProduct} from "../../services/product.service";
import {getCategories, getCategorySubs} from "../../services/categories.service";
import Auth from "../../components/wrappers/Auth";
import {getBrands} from "../../services/brand.service";

const initialState = {
    title: "",
    brand: "",
    category: "",
    shipping: "Yes",
    subs: [],
    images: [],
    specifications: [],
    price: "",
    quantity: "",
    color: "",
    status: "",
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
        length: "",
        width: "",
        height: "",
        weight: "",
    },
    warranty: {
        duration: "",
        details: "",
    },
}


const ProductUpdate = () => {
    const {user} = useSelector((state) => state.auth)
    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState([])
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [arrayOfSubs, setArrayOfSubs] = useState([])
    const [loading, setLoading] = useState('')
    const [description, setDescription] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('')
    const [error, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);


    let navigate = useNavigate()

    let {slug} = useParams();


    const loadProduct = useCallback(() => {
        getProduct(slug)
            .then(r => {
                setValues((values => ({...values, ...r.data})))
                setSelectedBrand(r.data.brand);
                getCategorySubs(r.data.category._id)
                    .then((res) => {
                        setSubOptions(res.data)
                    }).catch(e => {
                    console.log(e)
                })

                let myArray = []
                r.data.subs.map(sub => (
                    myArray.push(sub)
                ))
                setArrayOfSubs((prevState => myArray))
                setDescription(r.data.description)

            })
            .catch(e => {
                console.log(e)
            })
    }, [slug])


    const loadCategories = useCallback(() => {
        getCategories()
            .then(r => {
                setCategories(r.data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])
    const loadBrands = useCallback(() => {
        getBrands()
            .then(r => {
                setBrands(r.data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])


    useEffect(() => {
        loadCategories()
        loadProduct()
        loadBrands()

    }, [loadBrands, loadCategories, loadProduct])

    let subs = arrayOfSubs.map(sub => sub._id);

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setSubmitted(false)

        let subs = arrayOfSubs.map(sub => sub._id);

        const updatedValues = {...values, subs, description};
        updateProduct(slug, updatedValues, user.token)
            .then(r => {
                setLoading(false)
                setSubmitted(true)
                toast(`${r.data.title} is updated`, {
                    type: 'success'
                })

                loadProduct()
                navigate("/products");

            }).catch(e => {
            setLoading(false)
            setSubmitted(false)
            toast(e.response.data.error, {
                type: 'error'
            })


        })

    }

    // function handleChange(event) {
    //     setValues({...values, [event.target.name]: event.target.value})
    // }


    const handleChange = (event) => {
        setError({});
        const {name, value} = event.target;

        const keys = name.split('.');

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

    function handleCategoryChange(event) {
        event.preventDefault()
        setSelectedCategory(event.target.value)
        getCategorySubs(event.target.value).then(r => {
            setSubOptions(r.data)
        })
        if (values.category._id === event.target.value) {
            loadProduct()
        }
        setArrayOfSubs([])


    }

    const handleBrandChange = (opt) => {
        setError({});
        setValues({...values, brand: opt._id});
        setSelectedBrand(opt);
    };
    const handleAddSpecification = (e) => {
        e.preventDefault()
        // Check for empty specifications before adding a new one
        const hasEmptySpec = values.specifications.some(
            spec => !spec.name.trim() || !spec.value.trim()
        );

        if (hasEmptySpec || error.duplicateSpecifications) {
            return
        }

        setValues(values => ({
            ...values,
            specifications: [...values.specifications, {name: "", value: ""}]
        }))
    }

    const handleSpecificationChange = (e, index) => {
        setError({})
        const {name, value} = e.target;
        let specificationsCopy = [...values.specifications];
        specificationsCopy[index][name] = value;
        setValues({...values, specifications: specificationsCopy});

        const isDuplicateKey = specificationsCopy.some(
            (spec, idx) => spec.name.toLowerCase() === value.toLowerCase() && idx !== index
        );

        if (isDuplicateKey) {
            setError({
                ...error,
                duplicateSpecifications: 'Duplicate key not allowed',
            });
        } else if (specificationsCopy[index].name && specificationsCopy[index].value) {
            setError({});
        }
    }

    const handleRemoveSpecification = (e, index) => {
        e.preventDefault(); // prevent form submission or any default behavior
        setError({})
        const specs = [...values.specifications];
        specs.splice(index, 1);
        setValues({...values, specifications: specs});
    };
    const handleDescriptionChange = (value) => {
        setError({});
        setDescription(value)
    };

    return (
        <Auth cardTitle={values.title}>

            <div>
                <label className='label-title'>Images of your product*</label>
                <FileUpload
                    submitted={submitted}
                    values={values}
                    setError={setError}
                    folder='Products'
                    loading={loading}
                    setLoading={setLoading}
                    setValues={setValues}/>
                {error.images && <p className="text-danger">{error.images}</p>}

            </div>
            <ProductUpdateForm
                values={values}
                setValues={setValues}
                handleSpecificationChange={handleSpecificationChange}
                handleAddSpecification={handleAddSpecification}
                handleRemoveSpecification={handleRemoveSpecification}
                loading={loading}
                description={description}
                handleChange={handleChange}
                error={error}
                handleSubmit={handleSubmit}
                categories={categories}
                subOptions={subOptions}
                arrayOfSubs={arrayOfSubs}
                setArrayOfSubs={setArrayOfSubs}
                handleCategoryChange={handleCategoryChange}
                selectedCategory={selectedCategory}
                handleBrandChange={handleBrandChange}
                brands={brands}
                selectedBrand={selectedBrand}
                handleDescriptionChange={handleDescriptionChange}

            />

        </Auth>

    );
};

export default ProductUpdate;