import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrand } from '../../services/brand.service';
import { toast } from 'react-toastify';
import Auth from '../../components/wrappers/Auth';

const BrandCreateForm = () => {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const brandData = {
      name,
      logo,
      description,
      website
    };

    createBrand(brandData, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        setLogo('');
        setDescription('');
        setWebsite('');
        dispatch({ type: 'ADD_BRAND', payload: res.data });
        toast.success(`${res.data.name} is created`);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
        toast.error('Failed to create brand');
      });
  };

  return (
    <Auth cardTitle="Brand Create">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Brand Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
        </div>
        <div className="mb-3">
          <label>Logo</label>
          <input
            type="text"
            name="logo"
            className="form-control"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Website</label>
          <input
            type="text"
            name="website"
            className="form-control"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create Brand'}
        </button>
      </form>
    </Auth>
  );
};

export default BrandCreateForm;
