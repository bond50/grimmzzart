
import React, {useState, useEffect, useCallback} from 'react';
import {getRoutes, createRoute, updateRoute, deleteRoute} from '../../services/route.service';
import RouteList from '../../components/routes/RouteList';
import RouteForm from '../../components/routes/RouteForm';
import {useSelector} from "react-redux";
import {getPermissions} from "../../services/permission.service";

const RoutesPage = () => {
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(false)
    const {token} = useSelector(state => state.auth.user)

    const loadRoutes = useCallback(() => {
        getRoutes(token).then(r => {
            setRoutes(r.data)
        }).catch((error) => {
            console.error('Error Fetching:', error);
        });
    }, [token])

    const loadPermissions = useCallback(() => {
        setLoading(true);
        getPermissions(token).then(r => {
            setPermissions(r.data);
            setLoading(false);
        }).catch((error) => {
            console.error('Error Fetching:', error);
            setLoading(false);
        });
    }, [token]);


    useEffect(() => {
        loadRoutes()
        loadPermissions()
    }, [loadPermissions, loadRoutes]);


    const handleCreateRoute = (routeData) => {
        createRoute(token, routeData)
            .then((response) => {
                setRoutes([...routes, response.data]);
            })
            .catch((error) => {
                console.error('Error creating route:', error);
                // Show the error message received from the backend
                alert(error.response.data.message);
            });
    };

    const handleUpdateRoute = (routeId, updatedRoute) => {
        updateRoute(routeId, updatedRoute)
            .then((response) => {
                setRoutes(routes.map((route) => (route._id === routeId ? updatedRoute : route)));
                setSelectedRoute(null);
            })
            .catch((error) => {
                console.error('Error updating route:', error);
            });
    };


    const handleDeleteRoute = (routeId) => {
        // Delete the route using the deleteRoute service and update the routes state
        deleteRoute(routeId)
            .then((response) => {
                setRoutes(routes.filter((route) => route._id !== routeId));
            })
            .catch((error) => {
                console.error('Error deleting route:', error);
            });
    };


    return (
        <div className="container mt-4">
            <h1 className="mb-4">Manage Routes</h1>
            <div className="row">
                <div className="col-md-6">
                    <h2>Add Route</h2>
                    <RouteForm
                        onSubmit={handleCreateRoute}
                        action="Add"
                        permissions={permissions}
                        loading={loading}/>
                </div>
                <div className="col-md-6">
                    <h2>Update Route</h2>
                    {selectedRoute && (
                        <RouteForm
                            onSubmit={(updatedRoute) => handleUpdateRoute(selectedRoute._id, updatedRoute)}
                            initialValues={selectedRoute}
                            action="Update"
                        />

                    )}
                </div>


            </div>
            <div className="row mt-4">
                <div className="col-12">
                    <h2>Routes</h2>
                    <RouteList routes={routes} onDelete={handleDeleteRoute} onSelect={setSelectedRoute}/>

                </div>
            </div>
        </div>
    );
};
export default RoutesPage
