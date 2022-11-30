import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ServiceItem = ({ service }) => {

    const { title, img, price, _id } = service

    return (
        <div className="card w-96 border-2 border-gray-200">
            <figure><img className='w-80 rounded-lg mt-5' src={img} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title text-2xl font-bold">{title}</h2>
                <div className='flex'>
                    <p className='text-xl font-semibold text-orange-600'>Price: ${price}</p>
                    <Link to={`/checkout/${_id}`}>
                        <FaArrowRight className='text-orange-600 text-xl'></FaArrowRight>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceItem;