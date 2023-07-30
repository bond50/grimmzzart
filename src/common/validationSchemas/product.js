import * as Yup from 'yup';


export const handleValidationErrors = (error) => {
    let errors = {};
    const fieldsOrder = [
        'category',
        'brand',
        'images',
        'title',
        'displayTitle',
        'price',
        'quantity',
        'color',
        'warranty',
        '_error',
    ];

    if (error.inner.length === 0) {
        fieldsOrder.forEach((field) => {
            if (
                error.message ===
                `${field.charAt(0).toUpperCase() +
                field.slice(1)} is required!` ||
                (field === 'images' &&
                    (error.message ===
                        'Select images for your product' ||
                        error.message === 'Images must be unique' ||
                        error.message ===
                        'Select at least 2 images'))
            ) {
                errors[field] = error.message;
            }
        });

        if (!Object.keys(errors).length) {
            errors['_error'] = error.message;
        }
    } else {
        fieldsOrder.forEach((field) => {
            const err = error.inner.find((er) => er.path === field);
            if (err && !errors[field]) {
                errors[field] = err.message;
            }
        });
    }

    return errors;
};


const WarrantySchema = Yup.object().shape({
    duration: Yup.string().required('Warranty Duration is required'),
    details: Yup.string().required('Warranty Details are required'),
});

export const productCreateValidationSchema = [
    Yup.object().shape({
        brand: Yup.lazy((value) =>
            value === null
                ? Yup.mixed()
                    .nullable()
                    .required('Brand is required!')
                : Yup.object().shape({
                    _id: Yup.string().required('Brand is required!'),
                })
        ),
        category: Yup.lazy((value) =>
            value === null
                ? Yup.mixed()
                    .nullable()
                    .required('Category is required!')
                : Yup.object().shape({
                    _id: Yup.string().required('Category is required!'),
                })
        ),

        images: Yup.array()
            .of(
                Yup.object().shape({
                    public_id: Yup.string().required(),
                    url: Yup.string().required(),
                })
            )
            .test(
                'images',
                'Select images for your product',
                (values) => values && values.length > 0
            )
            .test('has-duplicate', 'Images must be unique', (values) => {
                if (!values) {
                    return true;
                }
                const idSet = new Set(
                    values.map((value) => value.public_id)
                );
                return idSet.size === values.length;
            })
            .test('length', 'Select at least 2 images', (values) =>
                values ? values.length >= 2 : false
            ),
    }),

    Yup.object().shape({
        price: Yup.number()
            .required('Price is required!')
            .positive('Price must be positive')
            .integer('Price must be an integer'),
        quantity: Yup.number()
            .required('Quantity is required!')
            .positive('Quantity must be positive')
            .integer('Quantity must be an integer'),
        color: Yup.string()
            .required('Color is required!')
            .min(2, 'Color must be at least 2 characters')
            .max(20, "Color can't exceed 20 characters"),
        displayTitle: Yup.string()
            .required('Display Title is required!')
            .min(10, 'Title must be at least 10 characters'),
        title: Yup.string()
            .required('Title is required!')
            .min(3, 'Title must be at least 3 characters')
            .max(50, "Title can't exceed 50 characters"),
    }),
    Yup.object().shape({
        description: Yup.string()
            .transform((value) => {
                const div = document.createElement('div');
                div.innerHTML = value;
                return div.textContent || div.innerText || '';
            })
            .required('Description is required!'),
    }),
    Yup.object().shape({
        powerRequirements: Yup.object().notRequired(),
    }),
    Yup.object().shape({
        dimensions: Yup.object().notRequired(),
    }),
    Yup.object().shape({
        specifications: Yup.array().notRequired(),
    }),
    Yup.object().shape({
        warranty: WarrantySchema,
    }),
];

export const validateSpecifications = (values, setError) => {
    let isValid = true;
    values.specifications.forEach(spec => {
        if (!spec.name || !spec.value) {
            isValid = false;
            setError(prevError => ({
                ...prevError,
                specifications: "Both name and value must be provided for all specifications"
            }));
        }
    });
    return isValid;
};
