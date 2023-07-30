import React from 'react';
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

const BrandForm = ({
                       handleSubmit,
                       loading,
                       label,
                       name,
                       setName,
                       logo,
                       setLogo,
                       description,
                       setDescription,
                       website,
                       setWebsite }) => {
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
        <MDBInput
          type="text"
          label="Logo"
          id='form2'
          className="form-control"
          disabled={loading}
          value={logo}
          onChange={(event) => setLogo(event.target.value)}
        />
      </div>
      <div className='col-12'>
        <MDBInput
          type="text"
          label="Description"
          id='form3'
          className="form-control"
          disabled={loading}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div className='col-12'>
        <MDBInput
          type="text"
          label="Website"
          id='form4'
          className="form-control"
          disabled={loading}
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <div className='col-12 mb-3'>
        <MDBBtn type='submit' disabled={!name || loading}>{loading ? 'Submitting' : 'Submit'}</MDBBtn>
      </div>
    </form>
  );
};

export default BrandForm;
