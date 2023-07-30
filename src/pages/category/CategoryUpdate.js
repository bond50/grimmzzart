import React, {useCallback, useEffect, useState} from "react";
import {getCategory, updateCategory} from "../../services/categories.service";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import CategoryForm from "../../ui/forms/CategoryForm";
import Auth from "../../components/wrappers/Auth";
import {errorHelper} from "../../common/Utility";

const CategoryUpdate = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState('')

    const [uploading, setUploading] = useState('')
    const [values, setValues] = useState({
        images: []
    })
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState({});


    console.log('Val',values)

    const {user} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    let {slug} = useParams();
    useEffect(() => {
        getCategory(slug)
            .then(r => {
                console.log('res',r)
                setValues(r.data.category)
                setName(r.data.category.name)

            })
            .catch(e => {
                console.log(e)
            })

    }, [slug])


    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        console.log(values)
        updateCategory(slug, {name, images: values.images}, user.token)
            .then(r => {
                
                setLoading(false)
                setName('')
                toast(`${r.data.name} is updated`, {
                    type: 'success'
                })

                navigate("/category");

            })
            .catch((e) => {
                const err = errorHelper(e)
                toast(err.err, {
                    type: 'error'
                })

                setLoading(false)

            })

    }


    return (
        <Auth cardTitle='Category update'>
            <CategoryForm
                name={name}
                label='Category name'
                loading={loading}
                handleSubmit={handleSubmit}
                setName={setName}
                uploading={uploading}
                setUploading={setUploading}
                submitted={submitted}
                values={values}
                setValues={setValues}
                setError={setError}
                error={error}
                folder={`Categories/${name}`}/>
        </Auth>


    );
};

export default CategoryUpdate;