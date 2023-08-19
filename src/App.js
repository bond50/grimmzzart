import './App.css';
import React, {lazy, Suspense, useCallback, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {ToastContainer} from 'react-toastify';


import {AdminRoute} from "./hoc/withAuthCheck";
import Loader from "./common/Loader/Loader";

const UserCreate = lazy(() => import("./pages/userManagement/UserCreate"));

const Login = lazy(() => import("./pages/auth/Login"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const PasswordReset = lazy(() => import("./pages/auth/PasswordReset"));
const BrandCreate = lazy(() => import("./pages/brand/BrandCreate"));
const BrandList = lazy(() => import("./pages/brand/Allbrands"));
const BrandUpdate = lazy(() => import("./pages/brand/BrandUpdate"));
const ChangePassword = lazy(() => import("./pages/auth/ChangePassword"));
const OTPVerification = lazy(() => import("./pages/auth/OTPVerification"));
const Orders = lazy(() => import("./pages/order/Orders"));
const Order = lazy(() => import("./pages/order/Order"));

const LoadedRoutes = lazy(() => import( "./pages/route/RoutesPage"));
const PermissionPage = lazy(() => import( "./pages/role/PermissionPage"));
const Roles = lazy(() => import( "./pages/role/RolesPage"));
const UserEdit = lazy(() => import( "./pages/userManagement/UserEdit"));
const UserManagement = lazy(() => import( "./pages/userManagement"));
const Layout = lazy(() => import("./hoc/Layout"));
const ErrorPage = lazy(() => import("./pages/errorPage/404"));
const ErrorLayout = lazy(() => import("./hoc/Layout/ErrorLayout"));
const AuthLayout = lazy(() => import("./hoc/Layout/AuthLayout"));
const AdminDashboard = lazy(() => import( "./pages/AdminDashboard"));
const CategoryCreate = lazy(() => import( "./pages/category/CategoryCreate"));
const CategoryUpdate = lazy(() => import( "./pages/category/CategoryUpdate"));
const SubCreate = lazy(() => import( "./pages/sub/SubCreate"));
const SubUpdate = lazy(() => import( "./pages/sub/SubUpdate"));
const ProductCreate = lazy(() => import( "./pages/product/ProductCreate"));
const ProductCreate1 = lazy(() => import( "./pages/product/ProductCreate1"));
const ProductUpdate = lazy(() => import( "./pages/product/ProductUpdate"));
const AllProducts = lazy(() => import( "./pages/product/AllProducts"));
const CreateCouponPage = lazy(() => import( "./pages/coupon/CreateCouponPage"));
const CouponUpdate = lazy(() => import( "./pages/coupon/CouponUpdate"));
const Permissions = lazy(() => import( "./pages/permission/Permissions"));
const App = () => {

    return (
        <Suspense fallback={
            <Loader/>
        }>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
            />

            <Routes>
                <Route element={<Layout/>}>
                    <Route index element={
                        <AdminRoute>
                            <AdminDashboard/>
                        </AdminRoute>
                    }/>
                    <Route path="user-management"
                           element={
                               <AdminRoute>
                                   <UserManagement/>
                               </AdminRoute>
                           }
                    />


                    <Route path="category" element={
                        <AdminRoute>
                            <CategoryCreate/>
                        </AdminRoute>
                    }/>
                    <Route path="category/:slug" element={
                        <AdminRoute>
                            <CategoryUpdate/>
                        </AdminRoute>
                    }/>
                    <Route path="coupon/:id" element={
                        <AdminRoute>
                            <CouponUpdate/>
                        </AdminRoute>
                    }/>
                    <Route path="sub" element={
                        <AdminRoute>
                            <SubCreate/>
                        </AdminRoute>
                    }/>
                    <Route path="brand" element={
                        <AdminRoute>
                            <BrandCreate/>
                        </AdminRoute>
                    }/>

                    <Route path="brand/:slug" element={
                        <AdminRoute>
                            <BrandUpdate/>
                        </AdminRoute>
                    }/>
                    <Route path="brands" element={
                        <AdminRoute>
                            <BrandList/>
                        </AdminRoute>
                    }/>
                    <Route path="orders" element={
                        <AdminRoute>
                            <Orders/>
                        </AdminRoute>
                    }/>
                    <Route path="orders/:_id" element={
                        <AdminRoute>
                            <Order/>
                        </AdminRoute>
                    }/>
                    <Route path="coupon" element={
                        <AdminRoute>
                            <CreateCouponPage/>
                        </AdminRoute>
                    }/>
                    <Route path="sub/:slug" element={
                        <AdminRoute>
                            <SubUpdate/>
                        </AdminRoute>
                    }/>
                    <Route path="product" element={
                        <AdminRoute>
                            <ProductCreate1/>
                        </AdminRoute>
                    }/>
                    <Route path="products" element={
                        <AdminRoute>
                            <AllProducts/>
                        </AdminRoute>
                    }/>
                    <Route path="product/edit/:slug" element={
                        <AdminRoute>
                            <ProductUpdate/>
                        </AdminRoute>
                    }/>
                    <Route path="user-management/edit/:userId" element={
                        <AdminRoute>
                            <UserEdit/>
                        </AdminRoute>
                    }/>
                    <Route path="roles" element={
                        <AdminRoute>
                            <Roles/>
                        </AdminRoute>
                    }/>
                    <Route path="permissions" element={
                        <AdminRoute>
                            <Permissions/>
                        </AdminRoute>
                    }/>

                    <Route path="/roles/:roleId/permissions"
                           element={
                               <AdminRoute>
                                   <PermissionPage/>
                               </AdminRoute>
                           }

                    />

                    <Route path="user-management/create-user" element={
                        <AdminRoute>
                            <UserCreate/>
                        </AdminRoute>
                    }/>


                    <Route path="custom-routes" element={
                        <AdminRoute>
                            <LoadedRoutes/>
                        </AdminRoute>
                    }/>

                </Route>

                <Route element={<AuthLayout/>}>
                    <Route path="login" element={<Login/>}/>
                    <Route path="otp-verification" element={<OTPVerification/>}/>
                    <Route path="change-password" element={<ChangePassword/>}/>
                    <Route path="password/forgot" element={<ForgotPassword/>}/>
                    <Route path="password/reset/:token" element={<PasswordReset/>}/>
                </Route>


                <Route element={<ErrorLayout/>}>
                    <Route path='*' element={<ErrorPage noSideBar/>}/>
                </Route>

            </Routes>
        </Suspense>

    );

};

export default App;
