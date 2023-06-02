import React, { useState } from 'react'
import Modal from 'react-modal';

import CustomInput from '../../components/CustomInput';
import { Borrow_Transaction, Item, db } from '../../db/db';
import { getDateString } from '../../helpers/functions';
import { toast } from 'react-toastify';

type Props = {
    isOpen: boolean;
    onRequestClose: () => void;
    selectedItem?: Borrow_Transaction;
}

function ReturnItemModal({isOpen, onRequestClose, selectedItem}: Props) {
  console.log(selectedItem);
  async function returnItem() {
    await db.borrow_transaction.update(selectedItem?.id as number, {
      status: 'PENDING_RETURNED',
      updated_at: getDateString(),
    })
    await db.item.update(selectedItem?.item_id as number, {
      status: 'BORROW_PENDING',
      updated_at: getDateString(),
    })
    toast.success('Return item request successfully submitted!', {
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
        <div style={{display: 'flex',  alignItems: 'center', flexDirection: 'column', paddingLeft: 80, paddingRight: 80}}>
            <h2>Confirm Return Item</h2>
            <p style={{margin: 0}}>Item Name:</p>
            <h3 style={{padding: 0, margin: 0}}>{selectedItem?.name}</h3>
            <p style={{margin: 0, paddingTop: 30}}>Item description:</p>
            <h3 style={{padding: 0, margin: 0}}>{selectedItem?.description}</h3>
            <p style={{margin: 0, paddingTop: 30}}>Lab technician will have to inspect the item before confirming return</p>
            <div style={{display: 'flex', marginTop: 50}}>
                <button onClick={onRequestClose} type="button" style={{marginRight: 20, backgroundColor: '#626f8a'}}>Cancel</button>
                <button onClick={returnItem} style={{backgroundColor: '#626f8a'}} type="submit">Confirm</button>
            </div>
            </div>
      </Modal>
  )
}

export default ReturnItemModal

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