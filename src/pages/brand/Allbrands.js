import React, { useEffect, useState } from "react";
import { getBrands, removeBrand } from "../../services/brand.service";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import LocalSearch from "../../ui/forms/LocalSearch";
import Auth from "../../components/wrappers/Auth";
import Swal from "sweetalert2";

const BrandList = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [brands, setBrands] = useState([]);
  const [keyword, setKeyword] = useState("");


  console.log(brands)
  useEffect(() => {
    loadBrands();
  }, []);

  function loadBrands() {
    getBrands()
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleRemove(slug) {
    Swal.fire({
      titleText: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return removeBrand(slug, user.token)
          .then((response) => {
            if (response.status !== 200) {
              throw new Error(response.statusText);
            }
            return response;
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          timer: 2000,
          confirmButtonColor: "#3085d6",
          text: `${result.value.data.name} Removed`,
        }).then((r) => {
          setLoading(false);
          loadBrands();
        });
      } else if (result.isDismissed) {
        Swal.fire({
          text: "Changes are not saved",
          icon: "info",
          timer: 1500,
        }).then((r) => {
          setLoading(false);
        });
      }
    });
  }

  function showBrands() {
    function searched(keyword) {
      return function (b) {
        return b.name.toLowerCase().includes(keyword);
      };
    }

    return brands
      .filter(searched(keyword))
      .map((brand) => (
        <div
          key={brand._id}
          className="alert alert-secondary py-2 d-flex align-items-center mt-2"
        >
          <div className="fs-6">{brand.name}</div>
          <div className="ms-auto d-flex align-items-center">
            <Link to={`/brand/${brand.slug}`}>
              <span className="btn btn-info btn-sm float-end" style={{ marginRight: "20px" }}>
                <Icon icon="ant-design:edit-outlined" className="text-white" fontSize={16} />
              </span>
            </Link>

            <span className="btn btn-sm btn-danger" onClick={() => handleRemove(brand.slug)}>
              <Icon icon="ant-design:delete-outlined" fontSize={16} />
            </span>
          </div>
        </div>
      ));
  }

  return (
    <Auth cardTitle="Brand list">
      <LocalSearch setKeyword={setKeyword} keyword={keyword} />
      {showBrands()}
    </Auth>
  );
};

export default BrandList;
