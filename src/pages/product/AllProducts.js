import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {getAdminProductsByCount, removeProduct} from "../../services/product.service";
import Swal from 'sweetalert2'

import {Link} from "react-router-dom";
import {getCategories} from "../../services/categories.service";
import Auth from "../../components/wrappers/Auth";


const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const {user} = useSelector((state) => state.auth);
    //sorting pagination and search
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState('createdAt');
    const [categories, setCategories] = useState([])
    const [order, setOrder] = useState('desc');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [totalCount, setTotalCount] = useState(0);


    const loadAllProductsByCount = useCallback(
        () => {
            setLoading(true);
            const params = {
                sort,
                order,
                limit,
                page,
                search,
                category,
            };
            getAdminProductsByCount(params)
                .then((r) => {
                    setProducts(r.data.products);
                    setTotalCount(r.data.totalCount);
                    setLoading(false);
                })
                .catch((e) => {
                    setLoading(false);
                    console.log(e);
                });
        },
        [sort, order, limit, page, search, category]
    );


    const loadCategories = useCallback(() => {
        getCategories()
            .then(r => {
                setCategories(r.data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    useEffect(() => {
        loadAllProductsByCount();
        loadCategories();
    }, [loadAllProductsByCount, loadCategories]);


    const handleRemove = product => {
        Swal.fire({
            titleText:  `remove ${product.title}`,
            text: 'This operation cannot be undone',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Yes',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return removeProduct(product.slug, user.token)
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
                    text: `${result.value.data.title} Removed`,
                }).then(r => {
                    setLoading(false)
                    loadAllProductsByCount()
                })
            } else if (result.isDismissed) {
                Swal.fire({text: 'Cancelled', icon: 'info', timer: 1500}).then(r => {
                    setLoading(false)
                })
            }
        })

    };


    return (
        <Auth cardTitle='Admin Product List'>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && loadAllProductsByCount()}
                />
                <button className="btn btn-outline-secondary" type="button"
                        onClick={() => loadAllProductsByCount()}>
                    Search
                </button>
            </div>
            <div className="d-flex justify-content-between mb-3">
                <div>
                    <select
                        className="form-select me-2"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            loadAllProductsByCount();
                        }}
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                </div>
                <div>
                    <button className="btn btn-outline-secondary me-2" onClick={() => setSort('title')}>
                        Sort by Title
                    </button>
                    <button className="btn btn-outline-secondary me-2" onClick={() => setSort('price')}>
                        Sort by Price
                    </button>
                    <button className="btn btn-outline-secondary"
                            onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
                        Toggle Order
                    </button>
                </div>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => {
                    console.log(product.category)
                    return <tr key={product._id}>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.category.name}</td>

                        <td>
                            <Link to={`/product/edit/${product.slug}`}
                                  className="btn btn-sm btn-primary me-2">
                                Edit
                            </Link>
                            <button className="btn btn-sm btn-danger"
                                    onClick={() => handleRemove(product)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setPage(page - 1)}>
                            Previous
                        </button>
                    </li>
                    {/* Render the page numbers */}
                    {Array.from({length: Math.ceil(totalCount / limit)}, (_, i) => (
                        <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setPage(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li
                        className={`page-item ${
                            page === Math.ceil(products.length / limit) ? 'disabled' : ''
                        }`}
                    >
                        <button className="page-link" onClick={() => setPage(page + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

        </Auth>
    );
};

export default AllProducts;
