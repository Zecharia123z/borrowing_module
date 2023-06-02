import React, { useState } from 'react'
import Modal from 'react-modal';

import CustomInput from '../../components/CustomInput';
import { Borrow_Transaction, db } from '../../db/db';
import { getDateString } from '../../helpers/functions';
import { toast } from 'react-toastify';

type Props = {
    isOpen: boolean;
    onRequestClose: () => void;
    transaction: Borrow_Transaction;
}

function LabTechModal({isOpen, onRequestClose, transaction}: Props) {
  const [note, setNote] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  async function rejectReturn(e: any) {
    e.preventDefault();
    db.item.update(transaction.item_id, {
        status: 'UNAVAILABLE',
        note,
        updated_at: getDateString(),
    });
    db.borrow_transaction.update(transaction.id as number, {
        status: 'RETURN_REJECTED',
        updated_at: getDateString(),
    });
    toast.success('Successfully rejected return request!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    onRequestClose();
  }


  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form>
            <div style={{display: 'flex',  alignItems: 'center', flexDirection: 'column', paddingLeft: 80, paddingRight: 80}}>
                <h2>Confirm Reject Return Request</h2>
                <h3>Item name: {transaction?.name}</h3>
                <h3>Item description: {transaction?.description}</h3>
                <h3>Borrower ID: {transaction?.student_id}</h3>
                <div>
                    <p style={{padding: 0, margin: 0}}>Note</p>
                    <input value={note} onChange={e => setNote(e.target.value)} type="text" required style={{paddingLeft: 20, padding: 10, width: 300}} />
                </div>
                <p>Admin will be made aware of the rejection and the reason</p>
                <div style={{display: 'flex', marginTop: 50}}>
                    <button onClick={onRequestClose} type="button" style={{marginRight: 20, backgroundColor: '#626f8a'}}>Cancel</button>
                    <button onClick={rejectReturn} style={{backgroundColor: '#626f8a'}} type="submit">Confirm</button>
                </div>
            </div>
        </form>
      </Modal>
  )
}

export default LabTechModal

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};