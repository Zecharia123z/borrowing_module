import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { colors } from '../../constants/colors';
import { User, UserContextType } from '../../db/db';
import { useEffect, useState, useContext } from 'react'
import { db } from '../../db/db'
import Login from '../Login';
import { UserContext } from '../../context/UserContext'
import LandingPage from './LandingPage';

function Borrowing() {
  const location = useLocation();
  const context = useContext(UserContext) as UserContextType;

  const isActive = (path: string) => {
    const currpath = "/borrowing/" + path;
    console.log(currpath, location.pathname);
    return location.pathname === "/borrowing/" + path
  }

  if (context.user?.type === 'ADMIN') {
    return (
      <>
        <div style={{width: '100%', backgroundColor: '#f2f2f2', paddingLeft: 50, height: 70, display: 'flex', alignItems: 'center', borderBottomColor: colors.brand, borderBottomWidth: 1, borderBottomStyle: 'solid'}}>
          <Link to="dashboard"><h4 style={{color: isActive('dashboard') ? colors.brand : colors.text}}>Dashboard</h4></Link>
          <Link to="pending-requests"><h4 style={{color: isActive('pending-requests') ? colors.brand : colors.text, paddingLeft: 50}}>Pending Requests </h4></Link>
        </div>
        {location.pathname === '/borrowing' ? <LandingPage/> : null}
        <Outlet />
      </>
    )
  }

  if (context.user?.type === "LAB_TECH") {
    return (
      <>
        <div style={{width: '100%', backgroundColor: '#f2f2f2', paddingLeft: 50, height: 70, display: 'flex', alignItems: 'center', borderBottomColor: colors.brand, borderBottomWidth: 1, borderBottomStyle: 'solid'}}>
          <Link to="labtech-dashboard"><h4 style={{color: isActive('dashboard') ? colors.brand : colors.text}}>Dashboard</h4></Link>
        </div>
        {location.pathname === '/borrowing' ? <LandingPage/> : null}
        <Outlet />
      </>
    )
  }

  if (context.user?.type === "STUDENT") {
    return (
      <>
        <div style={{width: '100%', backgroundColor: '#f2f2f2', paddingLeft: 50, height: 70, display: 'flex', alignItems: 'center', borderBottomColor: colors.brand, borderBottomWidth: 1, borderBottomStyle: 'solid'}}>
          <Link to="user-dashboard"><h4 style={{color: isActive('dashboard') ? colors.brand : colors.text}}>Dashboard</h4></Link>
        </div>
        {location.pathname === '/borrowing' ? <LandingPage/> : null}
        <Outlet />
      </>
    )
  }
  
  return(
    <>
      <div style={{width: '100%', backgroundColor: '#f2f2f2', paddingLeft: 50, height: 70, display: 'flex', alignItems: 'center', borderBottomColor: colors.brand, borderBottomWidth: 1, borderBottomStyle: 'solid'}}>
        <Link to="dashboard"><h4 style={{color: isActive('dashboard') ? colors.brand : colors.text}}>Dashboard</h4></Link>
        <Link to="pending-requests"><h4 style={{color: isActive('pending-requests') ? colors.brand : colors.text, paddingLeft: 50}}>Pending Requests </h4></Link>
      </div>
      {location.pathname === '/borrowing' ? <LandingPage/> : null}
      <Outlet/>
    </>
  )
}

export default Borrowing