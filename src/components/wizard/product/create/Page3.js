import React from 'react';
import ReactQuill from "react-quill";
import {QuillFormats, QuillModules} from "../../../../helpers/quill";

const Page3 = ({description,error,setError, handleDescriptionChange}) => {


    return (
        <div className="mb-3">
            <ReactQuill
                modules={QuillModules}
                formats={QuillFormats}
                value={description}
                placeholder="Write a very detailed and descriptive description about the product."
                onChange={handleDescriptionChange}
            />
             {error.description && <p className="text-danger">{error.description}</p>}
        </div>
    );
};

export default Page3;
