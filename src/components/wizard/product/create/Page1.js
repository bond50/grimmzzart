import React from 'react';
import Select from "react-select";
import FileUpload from "../../../../ui/forms/FileUpload";

const Page1 = ({
                   values,
                   currentStep,
                   submitted,
                   showSub,
                   setSelectedSub,
                   selectedSub,
                   setLoading,
                   setValues,
                   setError,
                   loading,
                   subOptions,
                   brandOptions,
                   brand,
                   handleBrandChange,
                   categoryOptions,
                   category,
                   error,
                   handleCategoryChange
               }) => {


    return (
        <>

            <div className="mb-3">
                <Select
                    options={categoryOptions}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option._id}
                    value={category}
                    onChange={(opt) => handleCategoryChange(opt)}
                    placeholder="Select a category*"
                    required
                    styles={error.category ? {control: base => ({...base, borderColor: 'red'})} : {}}
                />
                <div className='mt-3'>
                    {error.category && <p className="text-danger">{error.category}</p>}
                </div>

            </div>
            {showSub && (
                <div className="mb-3">
                    <Select
                        isMulti
                        name="subs"
                        value={selectedSub}
                        getOptionLabel={(option) => option.name}
                        getOptionValue={(option) => option._id}
                        options={subOptions.length && subOptions}
                        onChange={(opt) => setSelectedSub(opt)}
                        placeholder="Select sub(s)"
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>
            )}
            <div className="mb-3">
                <Select
                    options={brandOptions}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option._id}
                    value={brand}
                    onChange={(opt) => handleBrandChange(opt)}
                    placeholder="Select a brand*"
                    required
                    styles={error.brand ? {control: base => ({...base, borderColor: 'red'})} : {}}
                />
                <div className='mt-3'>
                    {error.brand && <p className="text-danger">{error.brand}</p>}
                </div>
            </div>
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

        </>
    );
};

export default Page1;
