import React, { useEffect, useState } from "react";
import { getBrand, updateBrand } from "../../services/brand.service";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import BrandForm from "../../ui/forms/BrandForm";
import Auth from "../../components/wrappers/Auth";
import { errorHelper } from "../../common/Utility";

const BrandUpdate = () => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  let { slug } = useParams();

  useEffect(() => {
    getBrand(slug)
      .then((response) => {
        const brand = response.data;
        setName(brand.name);
        setLogo(brand.logo);
        setDescription(brand.description);
        setWebsite(brand.website);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [slug]);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const brandData = { name, logo, description, website };
    updateBrand(slug, brandData, user.token)
      .then((response) => {
        setLoading(false);
        setName("");
        setLogo("");
        setDescription("");
        setWebsite("");
        toast(`${response.data.name} is updated`, {
          type: "success",
        });
        navigate("/brands");
      })
      .catch((error) => {
        const err = errorHelper(error);
        toast(err.err, {
          type: "error",
        });
        setLoading(false);
      });
  }

  return (
    <Auth cardTitle="Brand update">
      <BrandForm
        name={name}
        label="Brand name"
        loading={loading}
        handleSubmit={handleSubmit}
        setName={setName}
        logo={logo}
        setLogo={setLogo}
        description={description}
        setDescription={setDescription}
        website={website}
        setWebsite={setWebsite}
      />
    </Auth>
  );
};

export default BrandUpdate;
