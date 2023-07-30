// import AdminNav from "../../../components/nav/AdminNav";
import React, {useEffect, useState} from "react";
import {createCategory, getCategories, removeCategory} from "../../services/categories.service";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {Icon} from '@iconify/react';
import {Link} from "react-router-dom";
import CategoryForm from "../../ui/forms/CategoryForm";
import LocalSearch from "../../ui/forms/LocalSearch";
import Auth from "../../components/wrappers/Auth";
import './Category.css'
import {errorHelper} from "../../common/Utility";
import Swal from 'sweetalert2'


const CategoryCreate = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const {user} = useSelector((state) => state.auth);
    const [categories, setCategories] = useState([])
    //search
    // step1
    const [keyword, setKeyword] = useState('')

    const [values, setValues] = useState({
        images: []
    })
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState({});


    useEffect(() => {
        loadCategories()
    }, [])

    function loadCategories() {
        getCategories()
            .then(r => {
                setCategories(r.data)

            })
            .catch(e => {
                console.log(e)
            })
    }


    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        createCategory({name, images: values.images}, user.token)
            .then(r => {
                setLoading(false)
                setName('')
                setSubmitted(true)
                loadCategories()
                toast(`${r.data.name} is created`, {
                    type: 'success'
                })

            })
            .catch((error) => {
                const err = errorHelper(error)
                toast(err.err, {
                    type: 'error'
                })
                setLoading(false)
            })
    }


    function handleRemove(slug) {

        Swal.fire({
            titleText: 'Are you sure? ',
            text: 'All sub categories associated with it will also be deleted!.You won\'t be able to revert this! ',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return removeCategory(slug, user.token)
                    .then(response => {
                        if (response.status !== 200) {
                            throw new Error(response.statusText)
                        }
                        return response
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    timer: 2000,
                    confirmButtonColor: '#3085d6',
                    text: `${result.value.data.name} Removed`,
                }).then(r => {
                    setLoading(false)
                    loadCategories()
                })
            } else if (result.isDismissed) {
                Swal.fire({text: 'Changes are not saved', icon: 'info', timer: 1500}).then(r => {
                    setLoading(false)
                })
            }
        })
    }

    function showCategories() {

//step4
        function searched(keyword) {
            return function (c) {
                return c.name.toLowerCase().includes(keyword);
            };
        }

        // step 5
        return categories.filter(searched(keyword)).map(category => (
            <div key={category._id} className='alert alert-secondary py-2  d-flex align-items-center mt-2 '>
                <div className='fs-6'>{category.name}</div>
                <div className='ms-auto d-flex  align-items-center'>
                    <Link to={`/category/${category.slug}`}>
                        <span className='btn btn-info btn-sm float-end ' style={{marginRight: '20px'}}>
                            <Icon icon="ant-design:edit-outlined" className='text-white' fontSize={16}/>
                        </span>
                    </Link>

                    <span className='btn  btn-sm btn-danger ' onClick={() => handleRemove(category.slug)}
                    >
                        <Icon icon="ant-design:delete-outlined" fontSize={16}/>
                    </span>


                </div>
            </div>
        ))
    }

    return (
        <Auth cardTitle='Category create'>
            <CategoryForm
                name={name}
                label='Enter category name'
                loading={loading}
                handleSubmit={handleSubmit}
                setName={setName}
                error={error}
                uploading={uploading}
                setUploading={setUploading}
                setError={setError}
                submitted={submitted}
                setValues={setValues}
                values={values}
                folder={`Categories/${name}`}/>
            <LocalSearch setKeyword={setKeyword} keyword={keyword}/>
            {showCategories()}

        </Auth>
    );
};

export default CategoryCreate;