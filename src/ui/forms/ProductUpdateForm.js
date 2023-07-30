import React, {useState} from 'react';
import Select from 'react-select'
import {MDBBtn, MDBInput} from "mdb-react-ui-kit";
import ReactQuill from "react-quill";
import {QuillFormats, QuillModules} from "../../helpers/quill";
import {logDOM} from "@testing-library/react";

const ProductUpdateForm = ({
                               handleSubmit,
                               setValues,
                               handleChange,
                               values,
                               error,
                               loading,
                               categories,
                               brands,
                               subOptions,
                               handleCategoryChange,
                               arrayOfSubs,
                               setArrayOfSubs,
                               selectedCategory,
                               selectedBrand,
                               handleBrandChange,
                               handleAddSpecification,
                               handleSpecificationChange,
                               handleDescriptionChange,
                               description,
                               handleRemoveSpecification


                           }) => {
    const {
        title,
        price,
        shipping,
        category,
        quantity,
        specifications,
        status,
        powerRequirements,
        dimensions,
        warranty,
        color,
        brand
    } = values

    console.log(subOptions)

    return (
        <form onSubmit={handleSubmit} className='product-form'>
            <div className="mb-3">
                <label>Title</label>
                <input
                    type="text"
                    name='title'
                    className="form-control"
                    value={title}
                    onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label>Description</label>
                <div className="mb-3">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
            </div>
            <div className="mb-3">
                <label>Price</label>
                <input
                    type="number"
                    name='price'
                    className="form-control"
                    value={price}
                    onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label>Shipping</label>
                <select className="form-select " name='shipping' value={shipping === 'Yes' ? 'Yes' : 'No'}
                        onChange={handleChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>

            <div className="mb-3">
                <label>Specifications</label>
                {specifications.map((spec, index) => (
                    <div key={index} className="row mb-3">
                        <div className="col-4">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={spec.name}
                                disabled={spec.name === 'SKU'}
                                onChange={(e) => handleSpecificationChange(e, index)}
                            />
                        </div>
                        <div className="col-4">
                            <input
                                type="text"
                                name="value"
                                className="form-control"
                                value={spec.value}
                                disabled={spec.name === 'SKU'}
                                onChange={(e) => handleSpecificationChange(e, index)}
                            />
                        </div>
                        <div className="col-4">
                            <MDBBtn
                                type="button"
                                className='btn btn-danger'
                                disabled={spec.name === 'SKU'}
                                onClick={(e) => handleRemoveSpecification(e, index)}>Remove
                            </MDBBtn>
                        </div>
                    </div>
                ))}
                {error && error.duplicateSpecifications && (
                    <p className="text-danger">{error.duplicateSpecifications}</p>
                )}
                {!error.duplicateSpecifications &&
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAddSpecification}
                    >
                        Add Specification
                    </button>
                }
            </div>

            <div className="mb-3">
                <label>Color</label>
                <input
                    type="text"
                    name='color'
                    className="form-control"
                    value={color}
                    onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label>Quantity</label>
                <input
                    type="number"
                    name='quantity'
                    className="form-control"
                    value={quantity}
                    onChange={handleChange}/>
            </div>


            <div className="mb-3">
                <label>Categories</label>
                <select
                    className="form-select mb-3 mt-3"
                    name='category'
                    value={selectedCategory ? selectedCategory : category._id}
                    onChange={handleCategoryChange}>

                    {categories.length > 0 && categories.map(category => {
                        return <option
                            value={category._id}
                            key={category._id}>{category.name}</option>
                    })}
                </select>
            </div>

            <div className="mb-3">
                <Select
                    options={brands}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option._id}
                    value={selectedBrand}
                    onChange={(opt) => handleBrandChange(opt)}
                    placeholder="Select a brand*"
                    required
                    styles={error.brand ? {control: base => ({...base, borderColor: 'red'})} : {}}
                />

                <div className='mt-3'>
                    {error.brand && <p className="text-danger">{error.brand}</p>}
                </div>
            </div>


            <div className="mb-3">
                <label>Sub Categories</label>
                <Select
                    isMulti
                    name="subs"
                    value={arrayOfSubs}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option._id}
                    options={subOptions}
                    onChange={(options) => setArrayOfSubs(options)}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />

            </div>


            <div className="mb-3">
                <label>Power Requirements</label>

                <div className='mb-3'>
                    <span className='text-muted small fst-italic'>Voltage</span>
                    <input
                        type="text"
                        name="powerRequirements.voltage"
                        className="form-control"
                        value={powerRequirements.voltage}
                        onChange={handleChange}

                    />
                </div>
                <div className='mb-3'>
                    <span className='text-muted small fst-italic'>Amperage</span>
                    <input
                        type="text"
                        name="powerRequirements.amperage"
                        className="form-control"
                        value={powerRequirements.amperage}
                        onChange={handleChange}

                    />
                </div>
                <div className='mb-3'>
                    <span className='text-muted small fst-italic'>Frequency</span>
                    <input
                        type="text"
                        name="powerRequirements.frequency"
                        className="form-control"
                        value={powerRequirements.frequency}
                        onChange={handleChange}

                    />
                </div>
                <div className='mb-3'>
                    <span className='text-muted small fst-italic'>Power</span>
                    <input
                        type="text"
                        name="powerRequirements.power"
                        className="form-control"
                        value={powerRequirements.power}
                        onChange={handleChange}

                    />
                </div>
                <div className='mb-3'>
                    <span className='text-muted small fst-italic'>Power Supply Type</span>
                    <input
                        type="text"
                        name="powerRequirements.powerSupplyType"
                        className="form-control"
                        value={powerRequirements.powerSupplyType}
                        onChange={handleChange}

                    />
                </div>
                <div className='mb-3'>
                    <span className='text-muted small fst-italic'>Plug Type</span>
                    <input
                        type="text"
                        name="powerRequirements.plugType"
                        className="form-control"
                        value={powerRequirements.plugType}
                        onChange={handleChange}

                    />

                </div>
                <div className='mb-3'>
                    <span className='text-muted small fst-italic'>Battery requirements</span>
                    <input
                        type="text"
                        name="powerRequirements.batteryRequirements"
                        className="form-control"
                        value={powerRequirements.batteryRequirements}
                        onChange={handleChange}

                    />
                </div>
                <div className='mb-3'>
                    <span className='text-muted small fst-italic'>Power Management Features</span>
                    <input
                        type="text"
                        name="powerRequirements.powerManagementFeatures"
                        className="form-control "
                        value={powerRequirements.powerManagementFeatures}
                        onChange={handleChange}

                    />
                </div>

            </div>

            <div className="mb-3">
                <label>Dimensions</label>
                <div className="row">

                    <div className="col-6">
                        <span className='text-muted small fst-italic'>Length(cm)</span>
                        <input
                            type="number"
                            name="dimensions.length"
                            className="form-control"
                            value={dimensions.length}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-6">
                        <span className='text-muted small fst-italic'>Width(cm)</span>
                        <input
                            type="number"
                            name="dimensions.width"
                            className="form-control"
                            value={dimensions.width}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <span className='text-muted small fst-italic'>Height(cm)</span>
                        <input
                            type="number"
                            name="dimensions.height"
                            className="form-control"
                            value={dimensions.height}
                            onChange={handleChange}

                        />
                    </div>
                    <div className="col-6">
                        <span className='text-muted small fst-italic'>Weight(kg)</span>
                        <input
                            type="number"
                            name="dimensions.weight"
                            className="form-control"
                            value={dimensions.weight}
                            onChange={handleChange}

                        />
                    </div>
                </div>
            </div>


            <div className="mb3">
                <label>Warranty</label>
                <div className="mb-3">
                    <span className='text-muted small fst-italic'>Duration in months</span>
                    <input
                        type="number"
                        name="warranty.duration"
                        className="form-control mb-3"
                        value={warranty.duration}
                        onChange={handleChange}

                    />
                </div>
                <div className="mb-3">
                    <span className='text-muted small fst-italic'>Warranty Details</span>
                    <input
                        type="text"
                        name="warranty.details"
                        className="form-control mb-3"
                        value={warranty.details}
                        onChange={handleChange}
                    />

                </div>
            </div>


            <div className="mb-3">
                <button
                    type="submit"
                    className="btn btn-outline-info" disabled={loading}>{loading ?
                    <div className="spinner-border small" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> : 'Save'}
                </button>
            </div>

        </form>
    );
};

export default ProductUpdateForm;