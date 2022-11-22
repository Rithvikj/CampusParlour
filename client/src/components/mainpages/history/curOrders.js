import React, {useContext, useEffect, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'
import check from './check.svg'

function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [checkOrder, setCheckOrder] = useState(true)
    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                
                if(isAdmin){
                    const res = await axios.get('/api/payment', {
                        headers: {Authorization: token}
                    })
                    
                    setHistory(res.data)
                    
                    
                }
            }
            
            getHistory()
        }
    },[token, isAdmin, setHistory, checkOrder])

    

    const updateStatus = async(id) => {
        try{
            history.forEach(element =>{
                if(element._id === id){
                    
    
                    const res =  axios.put('./api/updateOrder', {_id: id},  {
                        headers: {Authorization: token}
                    })
                    setCheckOrder(!checkOrder)
                    console.log(res)
                    alert(res.data.msg)
                    
                }
            })
        }catch(err){
            console.log(err.msg)
        }
        
    }

    
    return (
        <div className="history-page">
            <h2>CURRENT ORDERS</h2>

            

            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Date of Purchased</th>
                        <th>View order</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                             items.status===false &&
                            <tr key={items._id}>
                                <td>{items.paymentID}</td>
                                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                <td><Link to={`/history/${items._id}`}>View</Link></td>
                                <td onClick={() => {updateStatus(items._id)}}><img src={check} alt="check" width="30" /></td>
                            </tr>
                            
                            
                            
                            
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory
