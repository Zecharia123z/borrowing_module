import React, { useContext } from 'react'
import USC from '../../assets/USC.png'
import DCISM from '../../assets/DCISM_LOGO.png'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { UserContextType } from '../../db/db'

function LandingPage() {
    const navigate = useNavigate();
    const context = useContext(UserContext) as UserContextType;
    console.log(context)
    
    function login(){
        let path;
        if(context.user?.type === 'STUDENT'){
            path = 'user-dashboard';
        }
        if(context.user?.type === 'LAB_TECH'){
            path = 'labtech-dashboard';
        }
        if(context.user?.type === 'ADMIN'){
            path = 'dashboard';
        }
        navigate('/borrowing/' + path)
        
    }

    return (
        <div style={{display: 'flex'}}>
            <div style={{margin: 'auto', flex: 1, width: '55vw', justifyContent: 'center', alignContent: 'center'}}>
                <center><img src={DCISM} style={{ height: 'auto', width: '320px'}}></img></center>
                <h4 style={{padding: '15px', paddingBottom: '5px',margin: '10px', textAlign: 'center'}}>Welcome to the DCISM Borrowing Module! </h4>
                <h6 style={{padding: '15px', paddingBottom: '30px',margin: '1px', textAlign: 'center'}}>Where you can easily track and manage the borrowing of resources within the university. This module has been designed to help students, faculty, and staff keep track of who borrows resources such as books, equipment, and other materials from the university library or various departments.</h6>
                <center><button type="button" style={{backgroundColor: '#626f8a', marginBottom: '100px'}} onClick={()=> login()}>Get Started</button></center>
            </div>
            
            <div>
            <center><img src={USC} style={{height: '100vh', width: '45vw', flex: 1}}></img></center>
            </div>
        </div>
  )
}

export default LandingPage