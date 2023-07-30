import React from 'react';

const CardWithFilters = ({cardTitle, filterOptions, children}) => {
    return (
        <div className="card overflow-auto">
            <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start"><h6>Filter</h6></li>
                    {filterOptions.map((option, index) => (
                        <li key={index}>
                            <a className="dropdown-item" href="#">{option}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="card-body">
                <h5 className="card-title">{cardTitle}<span>| Today</span></h5>
                {children}
            </div>
        </div>
    )
};

export default CardWithFilters;
