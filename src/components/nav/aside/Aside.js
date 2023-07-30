import React, {useState, useEffect, createRef} from 'react';
import classes from './aside.module.css';
import {Icon} from '@iconify/react';
import {Link, useLocation} from 'react-router-dom';

const Aside = ({open}) => {
    const [expandedItem, setExpandedItem] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const location = useLocation();

    const navItems = [
        {
            id: 'dashboard',
            icon: 'bi:grid',
            title: 'Dashboard',
            href: '/',
        },
        {
            id: 'categories',
            icon: 'icon-park-outline:difference-set',
            title: 'Category',
            href: '/category',
        },
        {
            id: 'sub',
            icon: 'icon-park-outline:add-subset',
            title: 'Sub Categories',
            href: '/sub',
        },
        {
            id: 'coupon',
            icon: 'icon-park-outline:coupon',
            title: 'Coupon',
            href: '/coupon',
        },

        {
            id: 'orders',
            icon: 'eos-icons:product-classes-outlined',
            title: 'Orders',

            subItems: [
                {title: 'Orders', href: '/orders'},

            ],
        },
        {
            id: 'brand',
            icon: 'eos-icons:product-classes-outlined',
            title: 'Brands',
            href: '#',
            subItems: [
                {title: 'Add Brand', href: '/brand'},
                {title: 'All Brands', href: '/brands'},
               
            ],
        }, {
            id: 'products',
            icon: 'eos-icons:product-classes-outlined',
            title: 'Products',
            href: '#',
            subItems: [
                {title: 'Add Product', href: '/product'},
                {title: 'All Products', href: '/products'},
            ],
        },
        {
            id: 'users',
            icon: 'fluent-mdl2:account-management',
            title: 'User Management',
            subItems: [
                {title: 'Manage users', href: '/user-management'},
            ],
        },
        {
            id: 'roles',
            icon: 'fluent-mdl2:account-management',
            title: 'Roles',
            subItems: [
                {title: 'Manage roles', href: '/roles'},
            ],
        },
        {
            id: 'permissions',
            icon: 'fluent-mdl2:account-management',
            title: 'Permissions',
            subItems: [
                {title: 'Manage permissions', href: '/permissions'},
            ],
        },

    ];

    let toggleClasses = [];
    if (open) {
        toggleClasses = [classes.close];
    }
    if (!open) {
        toggleClasses = [classes.closeMobile];
    }

    const navItemRefs = navItems.map(() => createRef());

    const handleItemClick = (id) => {
        const submenuHeight = navItemRefs[id].current.scrollHeight;

        navItemRefs[id].current.style.maxHeight = `${submenuHeight}px`;

        setExpandedItem((expandedItem) => (expandedItem === id ? null : id));
        setActiveItem(id);
    };

    useEffect(() => {
        navItemRefs.forEach((ref) => {
            if (ref.current) {
                ref.current.style.maxHeight = null;
            }
        });
    }, [expandedItem, navItemRefs]);

    return (
        <aside className={`${classes.sidebar} ${toggleClasses.join(' ')}`}>
            <ul className={classes.sidebarNav}>
                <li className={classes.navHeading}>NAVIGATION</li>
                {navItems.map((navItem, index) => {
                    const isExpanded = expandedItem === index;
                    const isActiveLink =
                        navItem.href === location.pathname ||
                        (navItem.subItems && navItem.subItems.some((subItem) => subItem.href === location.pathname));

                    return (
                        <li className={`nav-item ${classes.navItem}`} key={navItem.id}>
                            {navItem.subItems ? (
                                <div
                                    className={`nav-link ${classes.navLink} ${
                                        classes.collapsed
                                    } ${isExpanded ? classes.collapsed : ''} ${
                                        activeItem === index ? classes.active : ''
                                    }`}
                                    onClick={() => handleItemClick(index)}
                                >
                                    <Icon
                                        icon={navItem.icon}
                                        className={`${classes.collapsedIcon}`}
                                    />
                                    <span>{navItem.title}</span>
                                    <Icon
                                        icon="bi:chevron-down"
                                        className={`${classes.collapsedIcon} ms-auto ${
                                            isExpanded ? classes.biChevronUp : ''
                                        }`}
                                    />
                                </div>
                            ) : (
                                <Link
                                    className={`nav-link ${classes.navLink} ${
                                        isActiveLink ? classes.active : ''
                                    }`}
                                    to={navItem.href}
                                >
                                    <Icon
                                        icon={navItem.icon}
                                        className={`${classes.collapsedIcon}`}
                                    />
                                    <span>{navItem.title}</span>
                                </Link>
                            )}

                            {navItem.subItems && (
                                <ul
                                    ref={navItemRefs[index]}
                                    className={`${classes.navContent} ${
                                        isExpanded ? classes.show : ''
                                    }`}
                                >
                                    {navItem.subItems.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <Link
                                                className={`${
                                                    subItem.href === location.pathname
                                                        ? classes.active
                                                        : ''
                                                }`}
                                                to={subItem.href}
                                            >
                                                <Icon
                                                    icon="bi:circle"
                                                    className={`${classes.navContentIcon}`}
                                                />
                                                <span>{subItem.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Aside;
