import React from 'react';

const CarWithoutFilters = ({children,cardTitle}) => {
    return (
        <div className="card overflow-auto">
            <div className="card-body">
                <h5 className="card-title">{cardTitle}</h5>
                {children}
            </div>
        </div>
    );
};

export default CarWithoutFilters;