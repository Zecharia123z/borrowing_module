import React, { useState } from 'react'
import { colors } from '../../constants/colors';
import { FaCheck } from "react-icons/fa";
import { useLiveQuery } from 'dexie-react-hooks';
import { Borrow_Transaction, db } from '../../db/db';
import { getDateString } from '../../helpers/functions';
import { toast } from 'react-toastify';
import LabTechModal from './LabTechModal';
import { Transaction } from 'dexie';

function LabTechDashboard() {
    const myItems = useLiveQuery(() => db.borrow_transaction.where('status').equals('PENDING_RETURNED').toArray()) ?? [];
    const [showModal, setShowModal] = useState(false);
    const [transaction, setTransaction] = useState<Borrow_Transaction>();

    async function handleApprove(item: Borrow_Transaction) {
        await db.borrow_transaction.update(item.id as number, {
            status: 'RETURNED',
            updated_at: getDateString(),
        })
        await db.item.update(item.item_id as number, {
            status: 'AVAILABLE',
            updated_at: getDateString(),
        })
        toast.success('Return request succesfully approved!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    async function handleReject(item: Borrow_Transaction) {
        setTransaction(item);
        setShowModal(true);
    }

    async function approveReturn(item: Borrow_Transaction) {
        db.item.update(item.item_id, {
            updated_at: getDateString(),
        });
        db.borrow_transaction.update(item.id as number, {
            status: 'RETURNED',
            updated_at: getDateString(),
        });
        toast.success('Successfully approved return request!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    return (
        <div style={{flex: 1, backgroundColor: '#F5F5F5', width: "87.4vw", height: "92vh"}}>
            <div style={{paddingLeft: 50, paddingTop: 30}}>
                <h2 style={{padding: 0, margin: 0, paddingBottom: 30}}>Return Requests</h2>
                <input placeholder="Search" style={{height: 30, borderRadius: 5, paddingLeft: 5, width: 300}} />
            </div>

            <div style={{display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#F5F5F5', paddingTop: 20, paddingBottom: 20, paddingLeft: 30, paddingRight: 30}}>
                <p>Item</p>
                <p>Borrower</p>
                <p>Approve</p>
                <p>Disapprove</p>
                <p>Updated</p>
            </div>

            <div style={{backgroundColor: colors.brand, width: '97%', height: 1, marginLeft: 25, marginRight: 25, marginTop: -20}} />


            <div style={{height: 600, overflowY: 'scroll'}}>
                {myItems.map((item, index) => (
                    <div key={index.toString()} style={{ display: 'flex', alignItems: 'center', marginTop: 10, flexDirection: 'row', width: '100%', justifyContent: 'space-around', paddingRight: 50, backgroundColor: index % 2 === 0 ? colors.brand : colors.base, borderRadius: 5 }}>
                        <div style={{width:  '20%', overflowX: 'hidden'}}>
                            <h4 style={{ color: index % 2 === 0 ? colors.base : colors.brand}}>{item.name}</h4>
                            <p style={{ color: index % 2 === 0 ? colors.base : colors.brand}}>{item.description}</p>
                        </div>
                        <p style={{ color: index % 2 === 0 ? colors.base : colors.brand, width: '15%', paddingLeft: 50 }}>{item.first_name} {item.last_name}</p>
                        <button  style={{marginRight: 25, backgroundColor: '#626f8a', width: '15%', padding: 0, margin: 0, height: 40}} onClick={() => handleApprove(item)}>APPROVE</button>
                        <button  style={{marginRight: 25, backgroundColor: '#626f8a', width: '15%', padding: 0, margin: 0, marginLeft: 20, height: 40}} onClick={() => handleReject(item)}>REJECT</button>
                        <h5 style={{ color: index % 2 === 0 ? colors.base : colors.brand, width: '15%'}}>{item.updated_at}</h5>
                    </div>
                ))}
            </div>
            <LabTechModal isOpen={showModal} onRequestClose={() => setShowModal(false)} transaction={transaction as any} />
        </div>
  )
}

export default LabTechDashboard