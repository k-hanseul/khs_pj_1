import React from 'react'
import { NavLink } from "react-router-dom";
import style from './HeaderStyle.module.css'

function Header() {
  return (
    <div className={style.menu_bar}>
      <img className={style.menu_title} src={process.env.PUBLIC_URL + '/img/cat-6939_128.gif'} alt="logo" />
      {/* <a>test</a> */}
      {/* <img className={style.menu_title} src={'img/logo_cat.png'} alt="logo" /> */}
      {/* <NavLink to="/" className={style.menu_item}>Info</NavLink> */}
      <div className={style.menu_list}>
        <NavLink to="/" className={style.menu_item}>Info</NavLink>
        <NavLink to="/album" className={style.menu_item}>Album</NavLink>
        <NavLink to="/calendar" className={style.menu_item}>Calendar</NavLink>
        {/* <NavLink to="/calendar" className={style.menu_item}>Calendarrrrrrrrrrrrrrrr</NavLink> */}
      </div>
    </div>

  )
}

export default Header