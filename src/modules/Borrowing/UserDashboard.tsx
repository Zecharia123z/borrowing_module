import React, { useState, useContext } from 'react'
import { FaCheck } from 'react-icons/fa'
import { colors } from '../../constants/colors'
import { useLiveQuery } from 'dexie-react-hooks';
import { Borrow_Transaction, Item, db, UserContextType } from '../../db/db';
import ConfirmBorrowModal from './ConfirmBorrowModal';
import { toast } from 'react-toastify';
import ReturnItemModal from './ReturnItemModal';
import { UserContext } from '../../context/UserContext';

function UserDashboard() {
    const [showAll, setShowAll] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const context = useContext(UserContext) as UserContextType;
    const userId = context.user?.id as number;
    const [selectedItem, setSelectedItem] = useState<Item>();
    const [selectedTransaction, setSelectedTransaction] = useState<Borrow_Transaction>();
    const allItems = useLiveQuery(() => db.item.where('status').equals('AVAILABLE').toArray()) ?? [];
    const myItems = useLiveQuery(() => db.borrow_transaction.where('student_id').equals(userId).and((x) => x.status !== 'DELETED').toArray()) ?? [];

    function handleItemClick(item: Item) {
        setShowModal(true);
        setSelectedItem(item);
    }

    function handleTranasctionClick(item: Borrow_Transaction) {
        console.log('item', item);
        setShowTransactionModal(true);
        setSelectedTransaction(item);
    }

    return (
        <div style={{flex: 1, backgroundColor: '#F5F5F5', width: "87.4vw", height: "92vh"}}>
            <div style={{paddingLeft: 50, paddingTop: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 40}}>
                <input placeholder="Search" style={{height: 40, borderRadius: 5, paddingLeft: 5, width: 300}} />
                <div style={{width: 400, height: 50, borderWidth: 1, borderColor: colors.brand, borderRadius: 15, borderStyle: 'solid', marginBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div onClick={() => setShowAll(true)} style={{flex: 0.5, borderTopLeftRadius: 15, backgroundColor: showAll ? colors.brand : 'white', borderBottomLeftRadius: 15}}>
                        <h3 style={{textAlign: 'center', margin: '11px', color: showAll ? colors.base : colors.brand }}>All Items</h3>
                    </div>
                    <div style={{height: '100%', width: 2, backgroundColor: colors.brand, margin: 0}} />
                    <div onClick={() => setShowAll(false)} style={{flex: 0.7, borderTopRightRadius: 15, borderBottomRightRadius: 15, backgroundColor: !showAll ? colors.brand : 'white'}}>
                        <h3 style={{textAlign: 'center', margin: '11px', color: !showAll ? colors.base : colors.brand }}>My borrowed items</h3>
                    </div>
                </div>
            </div>

            {showAll ? (
                <>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', paddingTop: 50, paddingBottom: 20, paddingLeft: 30, paddingRight: 30 }}>
                        <h4 style={{ width: '25%', textAlign: 'center' }}>Item Name</h4>
                        <h4 style={{ width: '30%', textAlign: 'center' }}>Item Description</h4>
                        <h4 style={{ width: '30%', textAlign: 'center' }}>Status</h4>
                        <h4 style={{ width: '15%', textAlign: 'center' }}>Request</h4>
                    </div>
                    <div style={{ backgroundColor: colors.brand, width: '100%', height: 1, marginTop: -20 }} /><div style={{ height: 600, overflowY: 'scroll', overflowX: 'hidden' }}>
                            {allItems.map((item, index) => (
                                    <div key={index.toString()} style={{ display: 'flex', alignItems: 'center', marginTop: 10, flexDirection: 'row', width: '100%', justifyContent: 'space-around', paddingRight: 50, backgroundColor: index % 2 === 0 ? colors.brand : colors.base, borderRadius: 5 }}>
                                        <h4 style={{ color: index % 2 === 0 ? colors.base : colors.brand, width: '25%', paddingLeft: 25 }}>{item.name}</h4>
                                        <p style={{ color: index % 2 === 0 ? colors.base : colors.brand, width: '30%' }}>{item.description}</p>
                                        <p style={{ color: index % 2 === 0 ? colors.base : colors.brand, width: '30%', paddingLeft: 50 }}>{item.status}</p>
                                        <button style={{marginRight: 25, backgroundColor: '#626f8a'}} onClick={() => handleItemClick(item)}>Borrow</button>
                                    </div>
                                )
                            )}
                    </div>
                </>
            ) : (
                <>
                    <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', paddingTop: 50, paddingBottom: 20, paddingLeft: 30, paddingRight: 30 }}>
                        <h4 style={{ width: '25%', textAlign: 'center' }}>Item Name</h4>
                        <h4 style={{ width: '25%', textAlign: 'center' }}>Item Description</h4>
                        <h4 style={{ width: '15%', textAlign: 'center' }}>Borrowed On</h4>
                        <h4 style={{ width: '15%', textAlign: 'center' }}>Return Date</h4>
                        <h4 style={{ width: '15%', textAlign: 'center' }}>Request</h4>
                    </div>
                    <div style={{ backgroundColor: colors.brand, width: '97%', height: 1, marginLeft: 25, marginRight: 25, marginTop: -20 }} /><div style={{ height: 600, overflowY: 'scroll', overflowX: 'hidden' }}>
                            {myItems.map((item, index) => (
                                        <div key={index.toString()} style={{ display: 'flex', alignItems: 'center', marginTop: 10, flexDirection: 'row', width: '100%', justifyContent: 'space-around', paddingRight: 50, backgroundColor: index % 2 === 0 ? colors.brand : colors.base, borderRadius: 5 }}>
                                            <h4 style={{ color: index % 2 === 0 ? colors.base : colors.brand, width: '25%' }}>{item.name}</h4>
                                            <p style={{ color: index % 2 === 0 ? colors.base : colors.brand, width: '25%' }}>{item.description}</p>
                                            <p style={{ color: index % 2 === 0 ? colors.base : colors.brand, width: '15%', paddingLeft: 50 }}>{item.updated_at}</p>
                                            <p style={{ color: index % 2 === 0 ? colors.base : colors.brand, width: '15%', paddingLeft: 50 }}>{item.status.includes('PENDING') ? item.status.replace(/_/g, ' ') : item.return_date}</p>
                                            <button disabled={item.status === 'REJECTED' || item.status === 'PENDING_BORROW' || item.status === 'PENDING_RETURNED' || item.status === 'RETURNED'} style={{marginRight: 25, backgroundColor: '#626f8a', width: '15%'}} onClick={() => handleTranasctionClick(item)}>{item.status === 'REJECTED' ? 'REJECTED' : item.status === 'RETURNED' ? 'RETURNED' : item.status.includes('PENDING') ? 'AWAITING APPROVAL' : 'RETURN'}</button>
                                        </div>
                                    )
                            )}
                    </div>
                </>
            )}
            <ConfirmBorrowModal  selectedItem={selectedItem} isOpen={showModal} onRequestClose={() => setShowModal(false)} />
            <ReturnItemModal selectedItem={selectedTransaction} isOpen={showTransactionModal} onRequestClose={() => setShowTransactionModal(false)} />
        </div>
  )
}

export default UserDashboard