import React, {useEffect, useState} from "react";
import {createSub, getSubs, removeSub} from "../../services/sub.service";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {Icon} from '@iconify/react';
import {Link} from "react-router-dom";
import CategoryForm from "../../ui/forms/CategoryForm";
import LocalSearch from "../../ui/forms/LocalSearch";
import {getCategories} from "../../services/categories.service";
import Auth from "../../components/wrappers/Auth";
import {errorHelper} from "../../common/Utility";

const SubCreate = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState('')
    const [uploading, setUploading] = useState('')
    const {user} = useSelector((state) => state.auth);
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [subs, setSubs] = useState([])
    const [keyword, setKeyword] = useState('')
    const [values, setValues] = useState({images: []})
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState({});


    useEffect(() => {
        loadCategories()
        loadSubs()
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

    function loadSubs() {
        getSubs()
            .then(r => {
                setSubs(r.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)


        createSub({name, images: values.images, parent: category}, user.token)
            .then(r => {
                setLoading(false)
                setSubmitted(true)
                setName('')
                toast.success(`${r.data.name} added`)
                loadSubs()


            })
            .catch((e) => {
                const err = errorHelper(e)
                toast.error(err.err)
                setLoading(false)

            })


    }


    async function handleRemove(slug) {

        if (window.confirm('Are you sure you want to delete this Sub category?')) {
            setLoading(true)
            removeSub(slug, user.token)
                .then(r => {
                    setLoading(false)
                    toast.success(`${r.data.name} deleted`)
                    loadSubs()

                })
                .catch(e => {
                    if (e.response.status === 400) {
                        toast.error(e.response.data)
                    }
                    setLoading(false)
                })

        }
    }

    function selectCats() {
        return <select className="form-select mb-3 mt-3" name='select' onChange={e => (setCategory(e.target.value))}>
            <option>Please select</option>
            {categories.length > 0 && categories.map(category => {
                return <option value={category._id} key={category._id}>{category.name}</option>
            })}
        </select>

    }

    function showSubs() {
        function searched(keyword) {
            return function (c) {
                return c.name.toLowerCase().includes(keyword);
            };
        }


        return subs.filter(searched(keyword)).map(sub => (
            <div key={sub._id} className='alert alert-secondary py-2 mt-3'>
                {sub.name}
                <span
                    className='btn bt-raised btn-sm btn-danger float-end ' onClick={() => handleRemove(sub.slug)}>
                    <Icon icon="ant-design:delete-outlined"/>
                </span>

                <Link to={`/sub/${sub.slug}`}>
                    <span className='btn bt-raised btn-sm float-end mx-4'>
                        <Icon icon="ant-design:edit-outlined"
                              className='text-warning'/>
                    </span>
                </Link>
            </div>
        ))
    }

    return (
        <Auth cardTitle='Manage Sub categories'>
            <h5>Parent Category</h5>
            {selectCats()}
            <CategoryForm
                name={name}
                values={values}
                setValues={setValues}
                uploading={uploading}
                setUploading={setUploading}
                error={error}
                setError={setError}
                submitted={submitted}
                folder={`Subs/${name}`}
                label={'Sub category name *'}
                loading={loading}
                handleSubmit={handleSubmit}
                setName={setName}/>
            <LocalSearch setKeyword={setKeyword} keyword={keyword}/>
            {showSubs()}
        </Auth>
    );
};

export default SubCreate;