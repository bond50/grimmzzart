import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './Breadcrumb.module.css'

const Breadcrumb = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [pageTitle, setPageTitle] = useState('');

    const breadcrumbData = useMemo(() => {
        const linkPath = location.pathname.split('/').filter(p => p);

        if(linkPath.length === 0) {
            linkPath.push('dashboard');
        }

        return linkPath.map((segment, index) => {
            const path = `/${linkPath.slice(0, index + 1).join('/')}`;
            const breadcrumbLabel = decodeURIComponent(segment.replace(/-/g, ' '));

            return {path, breadcrumbLabel};
        });
    }, [location]);

    useEffect(() => {
        setBreadcrumbs(breadcrumbData);
        if (breadcrumbData.length > 0) {
            setPageTitle(breadcrumbData[breadcrumbData.length - 1].breadcrumbLabel);
        }
    }, [breadcrumbData]);

    return (
        <div className="pagetitle">
            <h1>{pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1)}</h1>
            <nav>
                <ol className={`${styles.breadcrumb} breadcrumb`}>
                    <li className={`${styles.breadcrumbItem} breadcrumb-item`}>
                        <Link to="/">Home</Link>
                    </li>
                    {breadcrumbs.map(({breadcrumbLabel, path}, index) => (
                        <li key={path}
                            className={`${styles.breadcrumbItem} breadcrumb-item ${index === breadcrumbs.length - 1 ? styles.active : ''}`}>
                            {breadcrumbLabel === 'dashboard' && path === '/dashboard'
                                ? <span>{breadcrumbLabel.charAt(0).toUpperCase() + breadcrumbLabel.slice(1)}</span>
                                : <Link to={path}>{breadcrumbLabel.charAt(0).toUpperCase() + breadcrumbLabel.slice(1)}</Link>
                            }
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
