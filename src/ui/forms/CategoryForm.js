import React from 'react';
import {MDBBtn, MDBInput} from "mdb-react-ui-kit";
import FileUpload from "./FileUpload";

const CategoryForm = ({
                          handleSubmit,
                          submitted,
                          values,
                          setUploading,
                          setValues,
                          setError,
                          error,
                          uploading,
                          imgWidth, imgHeight,
                          loading,
                          label,
                          folder,
                          name,
                          setName
                      }) => {
    return (
        <form onSubmit={handleSubmit} className='row gy-3'>

            <div className='col-12'>
                <MDBInput
                    type="text"
                    autoFocus
                    label={label}
                    required
                    id='form1'
                    className="form-control"
                    disabled={loading}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div className='col-12'>
                <label className='label-title'>Images of your product*</label>
                <FileUpload
                    submitted={submitted}
                    values={values}
                    setError={setError}
                    uploadDisabled={!name}
                    folder={folder}
                    loading={uploading}
                    setLoading={setUploading}
                    setValues={setValues}
                    width={110}
                    height={110}/>
                {error.images && <p className="text-danger">{error.images}</p>}
            </div>

            <div className='col-12 mb-3'>
                <MDBBtn type='submit' disabled={!name || loading}>{loading ? 'Submitting' : 'Submit'} </MDBBtn>
            </div>

        </form>
    );
};

export default CategoryForm;