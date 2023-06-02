
import React, { useState, useContext } from 'react'
import Modal from 'react-modal';

import CustomInput from '../../components/CustomInput';
import { Item, db, UserContextType } from '../../db/db';
import { getDateString, getWeekFromNowDate } from '../../helpers/functions';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
type Props = {
    isOpen: boolean;
    onRequestClose: () => void;
    selectedItem?: Item;
}

function ConfirmBorrowModal({isOpen, onRequestClose, selectedItem}: Props) {
  const context = useContext(UserContext) as UserContextType;
  console.log(context.user?.id)
  async function addItem(e: any) {
    e.preventDefault();
    if (selectedItem) {
        await db.borrow_transaction.add({
            status: 'PENDING_BORROW',
            borrow_date: getDateString(),
            return_date: getWeekFromNowDate(),
            created_at: getDateString(),
            updated_at: getDateString(),
            item_id: selectedItem.id as number,
            name: selectedItem.name,
            first_name: context.user?.first_name as string,
            last_name: context.user?.last_name as string,
            description: selectedItem.description,
            student_id: context.user?.id as number,
        })
        
        await db.item.update(selectedItem.id as number, {
            status: 'BORROW_PENDING',
        })
        toast.success('Borrow item request successfully submitted!', {
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
                <h2>Confirm Borrow Item</h2>
                <p style={{margin: 0}}>Item name:</p>
                <h3 style={{padding: 0, margin: 0}}>{selectedItem?.name}</h3>
                <p style={{margin: 0, paddingTop: 30}}>Item description:</p>
                <h3 style={{padding: 0, margin: 0}}>{selectedItem?.description}</h3>
                <p style={{margin: 0, paddingTop: 30}}>Item should be returned on: </p>
                <h3 style={{margin: 0}}>{getWeekFromNowDate()}</h3>
                <div style={{display: 'flex', marginTop: 50}}>
                    <button onClick={onRequestClose} type="button" style={{marginRight: 20, backgroundColor: '#626f8a'}}>Cancel</button>
                    <button onClick={addItem} style={{backgroundColor: '#626f8a'}} type="submit">Confirm</button>
                </div>
            </div>
        </form>
      </Modal>
  )
}

export default ConfirmBorrowModal

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