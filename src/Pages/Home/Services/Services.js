import React, { useEffect, useRef, useState } from 'react';
import ServiceItem from './ServiceItem';

const Services = () => {

    const [Services, setServices] = useState([])

    const [isAsc, setIsAsc] = useState(true)

    const [search, setSearch] = useState('')

    const searchRef = useRef()

    const handleSearch = () => {
        setSearch(searchRef.current.value)
    }

    useEffect(() => {
        fetch(` https://genius-car-server-kappa-navy.vercel.app/services?search=${search}&order=${isAsc ? 'asc' : 'desc'}`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [isAsc, search])

    return (
        <div>
            <div className='text-center mb-10'>
                <p className='font-bold text-xl text-orange-600'>Service</p>
                <h2 className='font-bold text-5xl my-5'>Our Service Area</h2>
                <p>
                    The majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable.
                </p>

                {/* Implement Simple Search Method - */}
                <input ref={searchRef} className='input input-bordered input-sm mt-5 mr-5' type="search" placeholder='Search' />
                <button onClick={handleSearch} className='btn btn-error btn-sm'>Search</button>
                <br />

                {/* dynamic ascending / descending sort - */}
                <button className='btn btn-outline btn-error mt-5' onClick={() => setIsAsc(!isAsc)}>{isAsc ? 'descending' : 'ascending'}</button>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10'>
                {
                    Services.map(service => <ServiceItem
                        key={service._id}
                        service={service}
                    ></ServiceItem>)
                }
            </div>
            <div className='text-center mb-32'>
                <button className="btn btn-outline btn-error">More Services</button>
            </div>
        </div>
    );
};

export default Services;