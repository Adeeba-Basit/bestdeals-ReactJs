import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useDispatch, useSelector } from 'react-redux'


import { deleteNewsletter, getNewsletter } from '../../../Store/ActionCreators/NewsletterActionCreators'
export default function AdminNewsletter() {
    var[data,setData] = useState([])
    var allStateData = useSelector(state=>state.NewsletterStateData)
    var dispatch = useDispatch()
    function deleteItem(id){
      if(window.confirm("Are You Sure to Delete that Item : ")){
        dispatch(deleteNewsletter({id:id}))
        getAPIData()
      }
    }
    function getAPIData(){
        dispatch(getNewsletter())
        if(allStateData.length)
        setData(allStateData.slice(1).reverse())
    }
    useEffect(()=>{
        getAPIData()
    },[allStateData.length])
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
                        <h5 className='bg-primary text-light text-center p-3 rounded'>Newsletter</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>Id</th>
                                        <th>Email</th>
                                        <th></th>
                                    </tr>
                                    {
                                        data.map((item,index)=>{
                                            return <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.email}</td>
                                                <td><button className='btn text-primary' onClick={()=>deleteItem(item.id)}><i className='fa fa-trash'></i></button></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
