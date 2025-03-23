import React, { useState, useEffect, useLayoutEffect } from 'react'
import style from './CalendarStyle.module.css'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, addDays, isSaturday, isSunday, addMonths, subMonths } from "date-fns";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { IoIosArrowDroprightCircle, IoMdSquareOutline, IoMdCheckbox, IoMdCreate, IoMdClose } from "react-icons/io";


const RenderDay = ({ currDate }) => {

    const startCurrMonth = startOfMonth(currDate);
    const endCurrMonth = endOfMonth(currDate);
    const startOfFirstWeek = startOfWeek(startCurrMonth, { weekStartsOn: 1 });
    const endOfLastWeek = endOfWeek(endCurrMonth, { weekStartsOn: 1 });

    var startDay = startOfFirstWeek;
    var endDay = endOfLastWeek;

    var daysInMonth = [];
    var daysInWeek = [];

    while (startDay <= endDay) {
        for (let i = 0; i < 8; i++) {
                                // const dayStatus = day ? getTodoStatus(year, month, day) : "";

            daysInWeek.push(
                <div className={style.item} style={{
                    color: format(currDate, "M") !== format(startDay, "M")
                        ? "#ddd"
                        : isSunday(startDay)
                            ? "red"
                            : isSaturday(startDay)
                                ? "blue"
                                : "#000",
                }} key={i}>
                    {i !== 0 ? format(startDay, 'dd') : ''}

                </div>
            )
            if (i !== 0) startDay = addDays(startDay, 1);
        }

        daysInMonth.push(daysInWeek);
        // console.log("### daysInWeek: " + daysInWeek.toString());
        daysInWeek = [];
    }

    return (
        <div className={style.calendar_day}>
            {daysInMonth}
        </div>
    )
}

function Calendar() {
    const [currDate, setCurrDate] = useState(new Date());
    const week = ["*", "월", "화", "수", "목", "금", "토", "일"];

    const handleClickDate = (day) => {
        // if (day !== null) {
        //     const newDate = new Date(year, month, day);
        //     setCurrDate(newDate);
        // }
    };

    const handlePrevMonth = () => {
        setCurrDate(subMonths(currDate, 1));
    };

    const handleNextMonth = () => {
        setCurrDate(addMonths(currDate, 1));
    };

    const [todoList, setTodoList] = useState([]);


    return (
        <div className={style.calendar}>

            <div className={style.calendar_section_t1}>
                <div className={style.calendar_header}>
                    <FaCaretLeft size={35} onClick={handlePrevMonth} />
                    {format(currDate, "yyyy")}년 {format(currDate, "M")}월
                    <FaCaretRight size={35} onClick={handleNextMonth} />
                </div>

                <div className={style.calendar_week}>
                    {
                        week.map((w, i) => (
                            <div className={style.item} key={w}>
                                {w}
                            </div>
                        ))
                    }
                </div>

                <RenderDay
                    currDate={currDate}
                    onClick={handleClickDate}
                />

            </div>
            <div className={style.calendar_section_t2}>
                <div className={style.title}>
                    {format(currDate, "yyyy")}. {format(currDate, "M")}. {format(currDate, "dd")}
                </div>
                <div className={style.todo}>
                    <div className={style.todo_title}>TodoList</div>
                    <div className={style.list}></div>

                    <div className={style.create}>
                    <input className={style.create_input}></input>                                    
                    <IoIosArrowDroprightCircle className={style.create_btn} onClick={""}></IoIosArrowDroprightCircle>
                    </div>

                </div>
                <div className={style.memo}>
                    <div className={style.memo_title}>Memo</div>
                </div>
            </div>
        </div>
    )
};

export default Calendar