import React from 'react';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import {QuillFormats, QuillModules} from "../../helpers/quill";
import {MDBInput} from "mdb-react-ui-kit";

const ProductCreateForm = ({
                               handleSubmit,
                               handleChange,
                               handleCategoryChange,
                               values,
                               loading,
                               subOptions,
                               showSub,
                               selectedSub,
                               description,
                               setDescription,
                               handleBrandChange,
                               setSelectedSub,
                               categoryOptions,
                               brandOptions,
                           }) => {
    const {
        title,
        color,
        video,
        brand,
        price,
        category,
        quantity,
        powerRequirements,
        specifications,
        dimensions,
        warranty,
    } = values;

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div className="mb-3">
                <label>Title*</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={handleChange}
                    placeholder="Enter the title"
                    required
                />
            </div>
            <div className="mb-3">
                <label>Price*</label>
                <input
                    type="text"
                    name="price"
                    className="form-control mb-3"
                    value={price}
                    onChange={handleChange}
                    placeholder="Enter the price of the product"
                />
            </div>

            <div className="mb-3">
                <label>Quantity*</label>
                <input
                    type="text"
                    name="quantity"
                    className="form-control mb-3"
                    value={quantity}
                    onChange={handleChange}
                    placeholder="Enter the quantity available"
                />
            </div>
            <div className="mb-3">
                <label>Color</label>
                <input
                    type="text"
                    name="color"
                    className="form-control mb-3"
                    value={color}
                    onChange={handleChange}
                    placeholder="Enter the color of the product"
                />
            </div>

            <div className="mb-3">
                <label>Video link</label>
                <input
                    type="text"
                    name="video"
                    className="form-control mb-3"
                    value={video}
                    onChange={handleChange}
                    placeholder="Enter the video link"
                />
            </div>
            <div className="mb-3">
                <label>Description*</label>
                <ReactQuill
                    modules={QuillModules}
                    formats={QuillFormats}
                    value={description}
                    placeholder="Enter a detailed description of the product"
                    onChange={setDescription}
                />
            </div>
            <div className="mb-3">
                <label>Brand*</label>
                <Select
                    options={brandOptions}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option._id}
                    value={brand}
                    onChange={(opt) => handleBrandChange(opt)}
                    placeholder="Select a brand"
                    required
                />
            </div>
            <div className="mb-3">
                <label>Category*</label>
                <Select
                    options={categoryOptions}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option._id}
                    value={category}
                    onChange={(opt) => handleCategoryChange(opt)}
                    placeholder="Select a category"
                    required
                />
            </div>
            {showSub && (
                <div className="mb-3">
                    <label>Sub Categories</label>
                    <Select
                        isMulti
                        name="subs"
                        value={selectedSub}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option._id}
                        options={subOptions.length && subOptions}
                        onChange={(opt) => setSelectedSub(opt)}
                        placeholder="Select sub categories (optional)"
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>
            )}

            <div className="mb-3">
                <label>Power Requirements</label>

                <div className="row">
                    <div className="col-3">
                        <input
                            type="text"
                            name="powerRequirements.voltage"
                            className="form-control mb-3"
                            value={powerRequirements.voltage}
                            onChange={handleChange}
                            placeholder="voltage (e.g. 120V)"
                        />
                    </div>
                    <div className="col-3">
                        <MDBInput
                            type="text"
                            label='amperage'
                            name="powerRequirements.amperage"
                            className="form-control mb-3"
                            value={powerRequirements.amperage}
                            onChange={handleChange}
                            placeholder="e.g (15A)"
                        />
                    </div>
                    <div className="col-3">
                        <input
                            type="text"
                            name="powerRequirements.frequency"
                            className="form-control mb-3"
                            value={powerRequirements.frequency}
                            onChange={handleChange}
                            placeholder="Enter the frequency (e.g., 60Hz)"
                        />
                    </div>
                    <div className="col-3">
                        <input
                            type="text"
                            name="powerRequirements.power"
                            className="form-control mb-3"
                            value={powerRequirements.power}
                            onChange={handleChange}
                            placeholder="Enter the power (e.g., 1000W)"
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="col-3"><input
                        type="text"
                        name="powerRequirements.batteryRequirements"
                        className="form-control mb-3"
                        value={powerRequirements.batteryRequirements}
                        onChange={handleChange}
                        placeholder="Enter the battery requirements (e.g., 2 x AA)"
                    /></div>
                    <div className="col-3"><input
                        type="text"
                        name="powerRequirements.powerManagementFeatures"
                        className="form-control mb-3"
                        value={powerRequirements.powerManagementFeatures}
                        onChange={handleChange}
                        placeholder="Enter any power management features (e.g., Auto-off)"
                    />
                    </div>
                    <div className="col-3">
                        <input
                            type="text"
                            name="powerRequirements.powerSupplyType"
                            className="form-control mb-3"
                            value={powerRequirements.powerSupplyType}
                            onChange={handleChange}
                            placeholder="Enter the power supply type (e.g., AC)"
                        />
                    </div>
                    <div className="col-3">
                        <input
                            type="text"
                            name="powerRequirements.plugType"
                            className="form-control mb-3"
                            value={powerRequirements.plugType}
                            onChange={handleChange}
                            placeholder="Enter the plug type (e.g., Type A)"
                        />
                    </div>
                </div>

            </div>


            <div className="mb-3">
                <label>Dimensions</label>
                <div className="row">
                    <div className="col-6">
                        <input
                            type="number"
                            name="dimensions.length"
                            className="form-control mb-3"
                            value={dimensions.length}
                            onChange={handleChange}
                            placeholder="Enter the length in cm"
                        />
                    </div>
                    <div className="col-6">
                        <input
                            type="number"
                            name="dimensions.width"
                            className="form-control mb-3"
                            value={dimensions.width}
                            onChange={handleChange}
                            placeholder="Enter the width in cm"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <input
                            type="number"
                            name="dimensions.height"
                            className="form-control mb-3"
                            value={dimensions.height}
                            onChange={handleChange}
                            placeholder="Enter the height in cm"
                        />
                    </div>
                    <div className="col-6">
                        <input
                            type="number"
                            name="dimensions.weight"
                            className="form-control mb-3"
                            value={dimensions.weight}
                            onChange={handleChange}
                            placeholder="Enter the weight in kg"
                        />
                    </div>
                </div>
            </div>


            <div className="mb3">

                <label>Specifications</label>
                <div className="mb-3">
                    <label>Processor*</label>
                    <input
                        type="text"
                        name="specifications.processor"
                        className="form-control"
                        value={specifications.processor}
                        onChange={handleChange}
                        placeholder="Enter the processor details"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Model*</label>
                    <input
                        type="text"
                        name="specifications.model"
                        className="form-control"
                        value={specifications.model}
                        onChange={handleChange}
                        placeholder="Enter the model of the product"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>RAM*</label>
                    <div className="row">
                        <div className="col-6">
                            <input
                                type="number"
                                name="specifications.ram.size"
                                className="form-control"
                                value={specifications.ram.size}
                                onChange={handleChange}
                                placeholder="Enter RAM size"
                                required
                            />
                        </div>
                        <div className="col-6">
                            <select
                                name="specifications.ram.unit"
                                className="form-control"
                                value={specifications.ram.unit}
                                onChange={handleChange}
                                required
                            >
                                <option value="MB">MB</option>
                                <option value="GB">GB</option>
                                <option value="TB">TB</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label>Storage Type</label>
                    <select
                        name="specifications.storage.type"
                        value={specifications.storage.type}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="SSD">SSD</option>
                        <option value="HDD">HDD</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Storage Size</label>
                    <input
                        type="number"
                        name="specifications.storage.size"
                        value={specifications.storage.size}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter the storage size"
                    />
                </div>

                <div className="mb-3">
                    <label>Storage Unit</label>
                    <select
                        name="specifications.storage.unit"
                        value={specifications.storage.unit}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="MB">MB</option>
                        <option value="GB">GB</option>
                        <option value="TB">TB</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Display Size</label>
                    <input
                        type="number"
                        name="specifications.display.size"
                        value={specifications.display.size}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter the display size"
                    />
                </div>

                <div className="mb-3">
                    <label>Display Unit</label>
                    <input
                        type="text"
                        name="specifications.display.unit"
                        value={specifications.display.unit}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter the display unit"
                    />
                </div>

                <div className="mb-3">
                    <label>Display Resolution</label>
                    <input
                        type="text"
                        name="specifications.display.resolution"
                        value={specifications.display.resolution}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter the display resolution"
                    />
                </div>

                <div className="mb-3">
                    <label>Camera</label>
                    <input
                        type="text"
                        name="specifications.camera"
                        value={specifications.camera}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter the camera specification"
                    />
                </div>

                <div className="mb-3">
                    <label>Battery Capacity</label>
                    <input
                        type="number"
                        name="specifications.battery.capacity"
                        value={specifications.battery.capacity}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter the battery capacity"
                    />
                </div>

                <div className="mb-3">
                    <label>Battery Unit</label>
                    <select
                        name="specifications.battery.unit"
                        value={specifications.battery.unit}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="mAh">mAh</option>
                        <option value="Wh">Wh</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>OS</label>
                    <input
                        type="text"
                        name="specifications.os"
                        value={specifications.os}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter the OS"
                    />
                </div>

                <div className="mb-3">
                    <label>SIM</label>
                    <select
                        name="specifications.sim"
                        value={specifications.sim}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="Single">Single</option>
                        <option value="Dual">Dual</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label>Connectivity</label>
                    <input
                        type="text"
                        name="specifications.connectivity"
                        value={specifications.connectivity}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter the connectivity specification"
                    />
                </div>

                <div className="mb-3">
                    <label>Audio Features</label>
                    <input
                        type="text"
                        name="specifications.audioFeatures"
                        value={specifications.audioFeatures}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter the audio features"
                    />
                </div>

            </div>

            <div className="mb-3">
                <label>Duration in months</label>
                <input
                    type="number"
                    name="warranty.duration"
                    className="form-control mb-3"
                    value={warranty.duration}
                    onChange={handleChange}
                    placeholder="Enter the warranty duration in months"
                />
            </div>

            <div className="mb-3">
                <label>Warranty Details</label>
                <input
                    type="text"
                    name="warranty.details"
                    className="form-control mb-3"
                    value={warranty.details}
                    onChange={handleChange}
                    placeholder="Enter details about the warranty"
                />

            </div>


            <div className="mb-3 mt-5">
                <button type="submit" className="btn btn-primary">
                    {loading ? (
                        <div className="spinner-border small" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        'Save'
                    )}
                </button>
            </div>
        </form>
    );
};

export default ProductCreateForm;
