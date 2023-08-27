import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllBanners = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('/api/banners');
        setBanners(response.data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };
    fetchBanners();
  }, []);

  return (
    <div>
      <h1>All Banners</h1>
      {banners.map((banner) => (
        <div key={banner._id}>
          <h2>{banner.title}</h2>
          {/* Display other banner details */}
        </div>
      ))}
    </div>
  );
};

export default AllBanners;
