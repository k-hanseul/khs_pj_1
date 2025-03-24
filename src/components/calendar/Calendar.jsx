import React, { useState, useEffect, useLayoutEffect } from 'react'
import style from './CalendarStyle.module.css'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, addDays, isSaturday, isSunday, addMonths, subMonths } from "date-fns";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { IoIosArrowDroprightCircle, IoMdSquareOutline, IoMdCheckbox, IoMdCreate, IoMdClose } from "react-icons/io";


const RenderDay = ({ currDate, handleClickDate }) => {

    const startCurrMonth = startOfMonth(currDate);
    const endCurrMonth = endOfMonth(currDate);
    const startOfFirstWeek = startOfWeek(startCurrMonth, { weekStartsOn: 1 });
    const endOfLastWeek = endOfWeek(endCurrMonth, { weekStartsOn: 1 });

    var startDay = startOfFirstWeek;
    var endDay = endOfLastWeek;

    var daysInMonth = [];
    var daysInWeek = [];

    function isDayMemo(date) {
        let key = "MEMO_" + format(date, 'yyyy-MM-dd');
        const localMemo = localStorage.getItem(key);
        // console.log("#### getMemo key: " + key + " / localMemo: " + localMemo);
        return localMemo ? true : false;
    }

    while (startDay <= endDay) {
        for (let i = 0; i < 8; i++) {
            let date = '';
            if (i === 0) date = format(startDay, 'yyyy-MM') + "-w" + (daysInMonth.length + 1);
            else date = format(startDay, 'yyyy-MM-dd');
            // console.log("### " + format(startDay, 'yyyy-MM-dd') + " / " + format(currDate, 'yyyy-MM-dd'));
            daysInWeek.push(
                <div className={style.item} style={{
                    backgroundColor: i !== 0 && format(startDay, 'yyyy-MM-dd') === format(currDate, 'yyyy-MM-dd') && "moccasin"
                }} key={date} onClick={() => i !== 0 && handleClickDate(date)}>
                    {/* }} key={date} onClick={function() {
                    // if (format(currDate, "M") !== format(startDay, "M")) console.log("#### 1111");
                    // else console.log("#### 2222");
                    console.log("### " + format(date, "M") + " / " + format(currDate, "M"));
                    // console.log("### date: " + date);
                }}> */}
                    <div style={{
                        color: format(currDate, "M") !== format(startDay, "M")
                            ? "#ddd"
                            : isSunday(startDay)
                                ? "red"
                                : isSaturday(startDay)
                                    ? "blue"
                                    : "#000"
                    }}>{i !== 0 ? format(startDay, 'dd') : ''}</div>
                    <div>{i !== 0 && isDayMemo(date) ? 'Todo' : ''}</div>
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
        if (format(currDate, "M") !== format(day, "M")) return;
        setCurrDate(day);
    };

    const handlePrevMonth = () => {
        setCurrDate(subMonths(currDate, 1));
    };

    const handleNextMonth = () => {
        setCurrDate(addMonths(currDate, 1));
    };

    const TODO_KEY = "TODO_" + format(currDate, 'yyyy-MM-dd');
    const [currTodo, setCurrTodo] = useState(initTodo);
    function initTodo() {
        let todos = [];
        const localTodo = localStorage.getItem(TODO_KEY);
        if (localTodo) todos = JSON.parse(localTodo);
        return todos;
    }

    const MEMO_KEY = "MEMO_" + format(currDate, 'yyyy-MM-dd');
    const [currMemo, setCurrMemo] = useState('');
    function getMemo() {
        let m = '';
        const localMemo = localStorage.getItem(MEMO_KEY);
        if (localMemo) m = localMemo;
        setCurrMemo(m);
        // console.log("#### getMemo MEMO_KEY: " + MEMO_KEY + " / m: " + m + " / currMemo: " + currMemo);
    }

    function handleEditMemo(e) {
        var m = e.target.value;
        if (currMemo !== m) {
            if (m === undefined || m === null || m === 0 || m === '' || !m.replace(/\s/g, '').length) {
                // console.log("#### handleEditMemo 11");
                localStorage.removeItem(MEMO_KEY);
            }
            else {
                // console.log("#### handleEditMemo 22");
                localStorage.setItem(MEMO_KEY, m);
            }
        }
        setCurrMemo(m);
        // console.log("#### handleEditMemo MEMO_KEY: " + MEMO_KEY + " / m: " + m + " / currMemo: " + currMemo);
    }

    useEffect(() => {
        // console.log("#### useEffect currDate: " + currDate);
        getMemo();
    }, [currDate]);

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
                    handleClickDate={handleClickDate}
                />

            </div>
            <div className={style.calendar_section_t2}>
                <div className={style.title}>
                    {format(currDate, "yyyy")}. {format(currDate, "M")}. {format(currDate, "dd")}
                </div>
                <div className={style.todo}>
                    <div className={style.todo_title}>TodoList</div>
                    <div className={style.list}>

                    </div>
                    <div className={style.create}>
                        <input className={style.create_input}></input>
                        {/* <IoIosArrowDroprightCircle className={style.create_btn} onClick={""}></IoIosArrowDroprightCircle> */}
                    </div>

                </div>
                <div className={style.memo}>
                    <div className={style.memo_title}>Memo</div>
                    <textarea type='text' placeholder="클릭 후 메모를 작성할 수 있습니다." spellCheck={false} className={style.memo_edit} onChange={handleEditMemo} value={currMemo}></textarea>
                </div>
            </div>
        </div>
    )
};

export default Calendar