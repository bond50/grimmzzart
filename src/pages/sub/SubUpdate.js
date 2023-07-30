import React, {useEffect, useCallback, useState} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import CategoryForm from "../../ui/forms/CategoryForm";
import {getSub, updateSub} from "../../services/sub.service";
import {getCategories} from "../../services/categories.service";
import Auth from "../../components/wrappers/Auth";


const SubUpdate = () => {
    const [name, setName] = useState('')
    const [parent, setParent] = useState('')
    const [loading, setLoading] = useState('')
    const {user} = useSelector((state) => state.auth);
    const [categories, setCategories] = useState([])
    const [values, setValues] = useState({images: []})
    const [submitted, setSubmitted] = useState(false);
    const [uploading, setUploading] = useState('')
    const [error, setError] = useState({});
    let {slug} = useParams();
    const navigate = useNavigate();


    const loadSub = useCallback(() => {
        getSub(slug)
            .then(r => {
                setName(r.data.sub.name)
                setParent(r.data.parent)
                 setValues(r.data.sub)
            })
            .catch(e => {
                console.log(e)
            })
    }, [slug])


    const loadCategories = useCallback(() => {
            getCategories()
                .then(r => {
                    setCategories(r.data)

                })
                .catch(e => {
                    console.log(e)
                })
        }
        , [])

    useEffect(() => {
        loadSub()
        loadCategories()
    }, [loadSub, loadCategories])


    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        updateSub(slug, {name, images: values.images, parent}, user.token)
            .then(r => {
                setLoading(false)
                setName('')
                setParent('')
                toast.success(`${r.data.name} is updated`)
                navigate("/sub");


            })
            .catch((e) => {
                if (e.response.status === 400) {
                    toast.error(e.response.data)
                }
                setLoading(false)

            })


    }

    function selectCats() {
        return <select
            className="form-select mb-3 mt-3"
            name='select'
            value={parent ? parent._id : ''}
            onChange={e => (setParent(e.target.value))}>
            {categories.length > 0 && categories.map(category => {
                return <option
                    value={category._id} key={category._id}
                >{category.name}
                </option>
            })}
        </select>

    }

    return (
        <Auth cardTitle={`Update ${name}`}>
            <h5>Parent Category</h5>
            {selectCats()}
            <CategoryForm
                name={name}
                label='Category name'
                loading={loading}
                handleSubmit={handleSubmit}
                setName={setName}
                setValues={setValues}
                submitted={submitted}
                values={values}
                uploading={uploading}
                setUploading={setUploading}
                folder={`Subs/${name}`}
                error={error}
                setError={setError}/>
        </Auth>

    )
};

export default SubUpdate;