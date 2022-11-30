import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../contexts/Authprovider/Authprovider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user, logOut } = useContext(AuthContext)

    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch(`https://genius-car-server-kappa-navy.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut()
                }
                return res.json()
            })
            .then(data => setOrders(data))
            .catch(error => console.error(error))
    }, [user?.email, logOut])


    const handleDelete = (id) => {
        const proceed = window.confirm('Are You Sure, You Want To Cancel This Order?')
        if (proceed) {
            fetch(`https://genius-car-server-kappa-navy.vercel.app/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('genius-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('Deleted Successfully')
                        const remaining = orders.filter(odr => odr._id !== id)
                        setOrders(remaining)
                    }
                })
                .catch(err => console.error(err))
        }
    }

    const handleStatusUpdate = (id) => {

        fetch(`https://genius-car-server-kappa-navy.vercel.app/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify({ status: 'Approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    const remaining = orders.filter(odr => odr._id !== id)
                    const approving = orders.find(odr => odr._id === id)

                    approving.status = 'Approved'
                    const newOrders = [approving, ...remaining]
                    setOrders(newOrders)
                }
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <h2 className='text-2xl font-bold my-3'>Total Orders: {orders.length}</h2>
            <div className="overflow-x-auto w-full mb-10">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>Customer</th>
                            <th>Service</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}
                                handleDelete={handleDelete}
                                handleStatusUpdate={handleStatusUpdate}
                            ></OrderRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Orders;