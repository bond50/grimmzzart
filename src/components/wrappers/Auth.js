// Auth.js
import React from 'react';
import CarWithoutFilters from "../card/CarWithoutFilters";
import RecentActivity from "../category/RecentActivity";

const Auth = ({children, cardTitle}) => {
    return (
        <>
            <section className="section min-vh-100 flex-column align-items-center justify-content-center pt-0 pb-3">
                <div className="row">
                    <div className="col-lg-8">
                        <CarWithoutFilters cardTitle={cardTitle}>
                            {children}
                        </CarWithoutFilters>
                    </div>
                    <div className="col-lg-4">
                        <RecentActivity/>
                    </div>
                </div>

            </section>
        </>
    );
};

export default Auth;
