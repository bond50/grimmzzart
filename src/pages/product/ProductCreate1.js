import React, {useCallback, useEffect, useState} from 'react';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import Auth from '../../components/wrappers/Auth';
import Page1 from '../../components/wizard/product/create/Page1';
import Page2 from '../../components/wizard/product/create/Page2';
import Page3 from '../../components/wizard/product/create/Page3';
import Page4 from '../../components/wizard/product/create/Page4';
import Page5 from '../../components/wizard/product/create/Page5';
import Page6 from '../../components/wizard/product/create/Page6';
import Page7 from '../../components/wizard/product/create/Page7';
import {useSelector} from 'react-redux';
import {
    getCategories,
    getCategorySubs,
} from '../../services/categories.service';
import {getBrands} from '../../services/brand.service';
import {createProduct} from '../../services/product.service';
import {toast} from 'react-toastify';
import {productCreateFormInitialValues} from "../../common/initialValues/productCreateForm";
import {
    handleValidationErrors,
    productCreateValidationSchema,
    validateSpecifications
} from "../../common/validationSchemas/product";
import {MDBBtn} from "mdb-react-ui-kit";

const ProductCreate = () => {
    const [values, setValues] = useState(productCreateFormInitialValues);
    const {user} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [subOptions, setSubOption] = useState([]);
    const [showSub, setShowSub] = useState(false);
    const [selectedSub, setSelectedSub] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const TOTAL_STEPS = 7;
    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState({});
    const {
        category,
        description,
        displayTitle,
        brand,
        title,
        price,
        quantity,
        color,
        powerRequirements,
        dimensions,
        warranty,
        specifications,
    } = values;

    const loadCategories = useCallback(() => {
        getCategories()
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const loadBrands = useCallback(() => {
        getBrands()
            .then((response) => {
                console.log(response.data);
                setBrands(response.data);
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

    const handleCategoryChange = (opt) => {
        setSelectedSub([]);
        setError({});
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
    const handleSelectChange = (event) => {
        const {name, value} = event.target;
        handleChange({target: {name, value}});
    };
    const handleDescriptionChange = (value) => {
        setError({});
        setValues({...values, description: value});
    };

    const handleBrandChange = (opt) => {
        setError({});
        setValues({...values, brand: opt});
    };

    const handleNext = async (event) => {
        if (currentStep !== TOTAL_STEPS) {
            event.preventDefault();
        }

        try {
            if (currentStep === 6) {
                // Validate specifications when trying to proceed from step 6
                if (!validateSpecifications(values, setError)) {
                    return;
                }
            }

            await productCreateValidationSchema[currentStep - 1].validate(values);
            setError({}); // clear previous errors
            setCurrentStep((prevStep) => prevStep + 1);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = handleValidationErrors(error);
                setError(errors);
            }
        }
    };

    const handleSubmit = async (event) => {
        if (currentStep === TOTAL_STEPS) {
            event.preventDefault();
            setLoading(true);
            setSubmitted(false)

            // Perform validation before submission
            try {
                if (!validateSpecifications(values, setError)) {
                    setLoading(false);  // Also, stop loading when validation fails
                    return;
                }

                await productCreateValidationSchema[currentStep - 1].validate(values);
                setError({}); // clear previous errors

                const submitValues = {
                    ...values,
                    brand: values.brand._id,
                    category: values.category._id,
                    description,
                };

                createProduct(submitValues, user.token)
                    .then((response) => {
                        setValues({...productCreateFormInitialValues});
                        setCurrentStep(1);
                        toast(`${response.data.title} is created`, {
                            type: 'success',
                        });
                        loadCategories();
                        setSelectedSub([]);
                        setSubmitted(true)
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.log(error.response);
                        toast(error.response.data.error, {
                            type: 'error',
                        });
                        setLoading(false);
                    });
            } catch (error) {
                if (error instanceof Yup.ValidationError) {
                    const errors = handleValidationErrors(error);
                    setError(errors);
                    setLoading(false);  // Also, stop loading when validation fails
                }
            }
        }
    };


    const handleBack = () => {
        currentStep > 1 && setCurrentStep((prevStep) => prevStep - 1);
        setError({});
    };


    const getPageTitle = () => {
        switch (currentStep) {
            case 1:
                return 'Category, Subcategories ,Brand and Images';
            case 2:
                return 'Product Information';
            case 3:
                return 'Product Description';
            case 4:
                return 'Power Requirements';
            case 5:
                return 'Dimensions';
            case 6:
                return 'Specifications';
            case 7:
                return 'Warranty';
            default:
                return '';
        }
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

    const removeSpecification = (e, index) => {
        e.preventDefault(); // prevent form submission or any default behavior
        setError({})
        const specs = [...values.specifications];
        specs.splice(index, 1);
        setValues({...values, specifications: specs});
    };


    return (
        <Auth cardTitle={getPageTitle()}>
            <form onSubmit={handleSubmit} className="product-form">
                {currentStep === 1 && (
                    <Page1
                        brand={brand}
                        currentStep={currentStep}
                        error={error}
                        submitted={submitted}
                        category={category}
                        brandOptions={brands}
                        categoryOptions={categories}
                        handleCategoryChange={handleCategoryChange}
                        handleBrandChange={handleBrandChange}
                        loading={loading}
                        setLoading={setLoading}
                        values={values}
                        setValues={setValues}
                        setError={setError}
                        selectedSub={selectedSub}
                        showSub={showSub}
                        subOptions={subOptions}
                        setSelectedSub={setSelectedSub}
                    />
                )}
                {currentStep === 2 && (
                    <Page2
                        title={title}
                        displayTitle={displayTitle}
                        price={price}
                        error={error}
                        quantity={quantity}
                        color={color}
                        handleChange={handleChange}
                    />
                )}
                {currentStep === 3 && (
                    <Page3
                        description={description}
                        error={error}
                        handleDescriptionChange={handleDescriptionChange}
                        setError={setError}
                    />
                )}
                {currentStep === 4 && (
                    <Page4
                        powerRequirements={powerRequirements}
                        handleChange={handleChange}
                    />
                )}
                {currentStep === 5 && (
                    <Page5
                        dimensions={dimensions}
                        handleChange={handleChange}
                    />
                )}
                {currentStep === 6 && (
                    <>
                        {values.specifications.map((specification, index) => (
                            <Page6
                                key={index}
                                specification={specification}
                                handleSpecificationChange={handleSpecificationChange}
                                removeSpecification={removeSpecification}
                                index={index}
                                error={error}
                            />
                        ))}
                        <MDBBtn disabled={!!(error.specifications || error.duplicateSpecifications)}
                                onClick={handleAddSpecification} className='btn btn-dark'>
                            Add Specification
                        </MDBBtn>


                    </>
                )}
                {currentStep === 7 && (
                    <Page7 warranty={warranty} handleChange={handleChange}/>
                )}
                <div className="mt-3">
                    {error && <p className="text-danger">{error._error}</p>}
                </div>
                {error.specifications && <div className='mt-3'>
                    <p className="text-danger">{error.specifications}</p>
                </div>}

                {error.duplicateSpecifications && <div className='mt-3'>
                    <p className="text-danger">{error.duplicateSpecifications}</p>
                </div>}

                <div className="d-flex justify-content-between mt-4">
                    {currentStep > 1 && (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleBack}
                        >
                            Previous
                        </button>
                    )}
                    {currentStep === TOTAL_STEPS ?

                        (
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={Object.keys(error).length > 0}
                            >
                                {loading ? 'Saving' : 'Save'}
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleNext}
                                disabled={Object.keys(error).length > 0 || loading}
                            >
                                Next
                            </button>
                        )}
                </div>
            </form>
        </Auth>
    );
};

export default ProductCreate;

// 192.168.1.1/32 /subnetting
// VLANS
// TCP/IP PROTOCOLS