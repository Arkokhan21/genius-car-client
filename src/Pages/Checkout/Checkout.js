import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/Authprovider/Authprovider';

const Checkout = () => {
    const { title, price, _id } = useLoaderData()
    const { user } = useContext(AuthContext)

    const handlePlaceOrder = (event) => {
        event.preventDefault()
        const form = event.target
        const name = `${form.firstName.value} ${form.lastName.value}`
        const phone = form.phone.value
        const email = user?.email || 'unregistered'
        const message = form.message.value

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            phone,
            email,
            message
        }

        fetch('https://genius-car-server-kappa-navy.vercel.app/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify(order),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('Order Placed Successful')
                    form.reset()
                }
            })
            .catch(error => console.error(error))
    }

    return (
        <form onSubmit={handlePlaceOrder}>
            <h2 className='text-4xl font-bold'>{title}</h2>
            <h2 className='text-2xl font-bold my-3'>Price: ${price}</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2  gap-3'>
                <input name='firstName' type="text" placeholder="First Name" className="input input-bordered input-lg w-full" required />
                <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered input-lg w-full" required />
                <input name='phone' type="text" placeholder="Your Phone" className="input input-bordered input-lg w-full" required />
                <input name='email' type="email" placeholder="Your Email" defaultValue={user?.email} readOnly className="input input-bordered input-lg w-full" required />
            </div>
            <textarea name='message' className="textarea textarea-bordered h-32 w-full mt-5" placeholder="Your Message" required></textarea>
            <input className="btn btn-error text-white mt-5 mb-10" type="submit" value="Order Confirm" />
        </form>
    );
};

export default Checkout;