import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'

import { useDispatch, useSelector } from 'react-redux'
import { getCheckout, updateCheckout } from '../../../Store/ActionCreators/CheckoutActionCreators'
import {  useParams } from 'react-router-dom'

export default function AdminSingleCheckout() {
    var [data, setData] = useState({
        products: []
    })
    var [orderstatus,setOrderStatus] = useState("")
    var [paymentstatus,setPaymentStatus] = useState("")
    var allStateData = useSelector(state => state.CheckoutStateData)
    var dispatch = useDispatch()
    var { id } = useParams()
    
    
    function updateItem() {
        dispatch(updateCheckout({ ...data, orderstatus:orderstatus,paymentstatus:paymentstatus }))
        setData({ ...data, orderstatus:orderstatus,paymentstatus:paymentstatus })

    }
    function getAPIData() {
        dispatch(getCheckout())
        if (allStateData.length){
            let item = allStateData.slice(1).find((x) => x.id === Number(id))
            setData(item)
            setOrderStatus(item.orderstatus)
            setPaymentStatus(item.paymentstatus)
        }     
    }
    useEffect(() => {
        getAPIData()
    }, [allStateData.length])

    return (
        <>
            {/* <!-- breadcrumb-section --> */}
            <div className="breadcrumb-section breadcrumb-bg pb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>Admin Section</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- end breadcrumb section --> */}

            <div className="container-fluid my-2">
                <div className="row">
                    <div className="col-md-2">
                        <Sidebar />
                    </div>
                    <div className="col-md-10">
                        <div className="table-responsive">
                            <table className='table'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <td>{data.id}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>{data.paymentmode}</td>
                                    </tr>
                                    <tr>
                                        <th>Payment Status</th>
                                        <td>{data.paymentstatus}
                                            <br />
                                            {
                                                data.paymentmode === "COD" && data.paymentstatus === "pending" ?
                                                    <select name="paymentstatus" value={orderstatus} onChange={(e)=>setPaymentStatus(e.target.value)} className='form-control'>
                                                        <option value="pending">Pending</option>
                                                        <option value="Done">Done</option>
                                                    </select> : ""
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Order Status</th>
                                        <td>{data.orderstatus}
                                            <br />
                                            {
                                                data.orderstatus !== "Delivered" ?
                                                    <select name="orderstatus" value={orderstatus} onChange={(e)=>setOrderStatus(e.target.value)} className='form-control'>
                                                        <option value="Order Placed">Order Placed</option>
                                                        <option value="Order is Packed">Order is Packed</option>
                                                        <option value="Ready to Ship">Ready to Ship</option>
                                                        <option value="shipped">shipped</option>
                                                        <option value="On the Way">On the Way</option>
                                                        <option value="Out for Delivery">Out for Delivery</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select> : ""
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td>&#8377;{data.subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{data.shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{data.total}</td>
                                    </tr>
                                    {
                                        data.sppid ?
                                            <tr>
                                                <th>RPPID</th>
                                                <td>{data.rppid}</td>
                                            </tr> : ""
                                    }
                                    <tr>
                                        <th>Date</th>
                                        <td>{data.date}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}>
                                            {
                                                data.paymentstatus === "Pending" || data.orderstatus !== "Delivered" ?
                                                    <button className='btn btn-primary w-100' onClick={updateItem}>Update</button> : ""
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h5 className='text-center p-2'>Checkout Products</h5>
                        <table className="cart-table w-100">
                            <thead className="cart-table-head">
                                <tr className="table-head-row">
                                    <th className="text-left product-image"></th>
                                    <th className="text-left product-name">Name</th>
                                    <th className="text-left product-name">Brand/Color/Size</th>
                                    <th className="text-left product-name">Price</th>
                                    <th className="text-left product-name">Qty</th>
                                    <th className="text-left product-price">Total</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.products.map((item, index) => {
                                        return <tr key={index} className="table-body-row">
                                            <td className="product-image"><a href={`assets/images/${item.pic}`} rel="noreferrer" target='_blank'>
                                                <img src={`/assets/images/${item.pic}`} height="50px" width="50px" alt="" />
                                            </a></td>
                                            <td className="text-left product-name">{item.name}</td>
                                            <td className="text-left product-name">{item.brand}/{item.color}/{item.size}</td>
                                            <td className="text-left product-price">&#8377;{item.price}</td>
                                            <td className="text-left product-name">{item.qty}</td>
                                            <td className="text-left product-name">&#8377;{item.total}</td>
                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
