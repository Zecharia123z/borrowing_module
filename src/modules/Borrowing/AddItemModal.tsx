import React, { useState } from 'react'
import Modal from 'react-modal';

import CustomInput from '../../components/CustomInput';
import { db } from '../../db/db';
import { getDateString } from '../../helpers/functions';
import { toast } from 'react-toastify';

type Props = {
    isOpen: boolean;
    onRequestClose: () => void;
}

function AddItemModal({isOpen, onRequestClose}: Props) {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  async function addItem() {
    await db.item.add({
      name: itemName,
      description: itemDescription,
      status: 'AVAILABLE',
      created_at: getDateString(),
      updated_at: getDateString(),
    })
    toast.success('Item successfully added!', {
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
                <h2>Add Item</h2>
                <div>
                    <p style={{padding: 0, margin: 0}}>Name</p>
                    <input value={itemName} onChange={e => setItemName(e.target.value)} type="text" required style={{paddingLeft: 20, padding: 10, width: 300}} />
                </div>
                <div>
                    <p style={{padding: 0, margin: 0, marginTop: 30}}>Description</p>
                    <input value={itemDescription} onChange={e => setItemDescription(e.target.value)}  type="text" required style={{paddingLeft: 20, padding: 10, width: 300}} />
                </div>
                <div style={{display: 'flex', marginTop: 50}}>
                    <button onClick={onRequestClose} type="button" style={{marginRight: 20, backgroundColor: '#626f8a'}}>Cancel</button>
                    <button onClick={addItem} style={{backgroundColor: '#626f8a'}} type="submit">Confirm</button>
                </div>
            </div>
        </form>
      </Modal>
  )
}

export default AddItemModal

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