import React, { useState, useEffect, useLayoutEffect } from 'react'
import style from './CalendarStyle.module.css'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, addDays, isSaturday, isSunday, addMonths, subMonths } from "date-fns";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { IoIosArrowDroprightCircle, IoMdSquareOutline, IoMdCheckbox, IoMdCreate, IoMdClose } from "react-icons/io";

// 달력 일자 표기
const RenderDay = ({ currDate, handleClickDate }) => {

    const startCurrMonth = startOfMonth(currDate);
    const endCurrMonth = endOfMonth(currDate);
    const startOfFirstWeek = startOfWeek(startCurrMonth, { weekStartsOn: 1 });
    const endOfLastWeek = endOfWeek(endCurrMonth, { weekStartsOn: 1 });

    var startDay = startOfFirstWeek;
    var endDay = endOfLastWeek;

    var daysInMonth = [];
    var daysInWeek = [];

    // 날짜에 메모가 있는지 체크
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
            daysInWeek.push(
                <div className={style.item} style={{
                    backgroundColor: i !== 0 && format(startDay, 'yyyy-MM-dd') === format(currDate, 'yyyy-MM-dd') && "moccasin"
                }} key={date} onClick={() => i !== 0 && handleClickDate(date)}>
                    <div style={{
                        color: format(currDate, "M") !== format(startDay, "M")
                            ? "#ddd"
                            : isSunday(startDay)
                                ? "red"
                                : isSaturday(startDay)
                                    ? "blue"
                                    : "#000"
                    }}>{i !== 0 ? format(startDay, 'dd') : ''}</div>
                    <div>{i !== 0 && isDayMemo(date) ? 'Memo' : ''}</div>
                </div>
            )
            if (i !== 0) startDay = addDays(startDay, 1);
        }
        daysInMonth.push(daysInWeek);
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

    // 기준 날짜 변경
    const handleClickDate = (day) => {
        if (format(currDate, "M") !== format(day, "M")) return;
        setCurrDate(day);
    };

    // 이전 달로 변경
    const handlePrevMonth = () => {
        setCurrDate(subMonths(currDate, 1));
    };

    // 이후 달로 변경
    const handleNextMonth = () => {
        setCurrDate(addMonths(currDate, 1));
    };

    const TODO_KEY = "TODO_" + format(currDate, 'yyyy-MM-dd');
    const [currTodoList, setCurrTodoList] = useState([]);

    function getTodo() {
        let t = [];
        const localTodo = localStorage.getItem(TODO_KEY);
        if (localTodo) t = JSON.parse(localTodo);
        setCurrTodoList(t);
        console.log("#### getTodo TODO_KEY: " + TODO_KEY + " / t: " + t + " / localTodo: " + localTodo);
    }
    const handleCreateTodo = () => {
        // console.log("### handleCreateTodo currTodoValue: " + currTodoValue);

        if (currTodoValue === undefined || currTodoValue === null || currTodoValue === 0 || currTodoValue === '' || !currTodoValue.replace(/\s/g, '').length) {
            console.log("### handleCreateTodo null");
            return;
        }
        const newTodo = {
            index: currTodoList.length,
            text: currTodoValue,
            completed: false,
        };

        setCurrTodoList([...currTodoList, newTodo]);
        setCurrTodoValue('');
        // localStorage.setItem(TODO_KEY, JSON.stringify(currTodoList));

        // console.log("### currTodoList: " + JSON.stringify(currTodoList));


    }
    function handleDeleteTodo() {
    }
    function handleEditTodo() {
    }

    const [currTodoValue, setCurrTodoValue] = useState('');
    const handleEditTodoValue = (e) => {
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

    // function handleEditMemo(e) {
    //     var m = e.target.value;
    //     // if (currMemo !== m) {
    //     //     // if (m === undefined || m === null || m === 0 || m === '' || !m.replace(/\s/g, '').length) localStorage.removeItem(MEMO_KEY);
    //     //     // else localStorage.setItem(MEMO_KEY, m);

    //     //     if (m === undefined || m === null || m === 0 || m === '' || !m.replace(/\s/g, '').length) setCurrMemo('');
    //     //     else setCurrMemo(m);
    //     // }
    //     setCurrMemo(m);
    //     console.log("#### handleEditMemo MEMO_KEY: " + MEMO_KEY + " / m: " + m + " / currMemo: " + currMemo);
    // }

    function handleEditMemo(e) {
        var m = e.target.value;
        if (currMemo !== m) {
            if (m === undefined || m === null || m === 0 || m === '' || !m.replace(/\s/g, '').length) localStorage.removeItem(MEMO_KEY);
            else localStorage.setItem(MEMO_KEY, m);
        }
        setCurrMemo(m);
        console.log("#### handleEditMemo MEMO_KEY: " + MEMO_KEY + " / m: " + m + " / currMemo: " + currMemo);
    }

    useEffect(() => {
        // console.log("#### useEffect currDate: " + currDate);
        getMemo();
        getTodo();
    }, [currDate]);

    // useEffect(() => {
    //     if (currMemo === undefined || currMemo === null || currMemo === 0 || currMemo === '' || !currMemo.replace(/\s/g, '').length) localStorage.removeItem(MEMO_KEY);
    //     else localStorage.setItem(MEMO_KEY, currMemo);
    // }, [currMemo]);

    useEffect(() => {
        console.log("#### useEffect 1 currTodoList: " + JSON.stringify(currTodoList));
        // console.log("#### useEffect 2 currTodoList: " + currTodoList);
    }, [currTodoList]);

    // useEffect(() => {
    //     console.log("#### useEffect currTodoValue: " + currTodoValue);
    // }, [currTodoValue]);

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
                    {currTodoList.length}
                    {
                        currTodoList.map((t, i) => (
                            <div>
                                {t.index}
                                {t.text}
                                {t.completed}
                            </div>
                        ))
                    }
                    </div>
                    <div className={style.create}>
                        <input className={style.create_input} placeholder="투두 리스트 항목을 작성할 수 있습니다." value={currTodoValue} onChange={handleEditTodoValue}></input>                                                
                        <IoIosArrowDroprightCircle className={style.create_btn} onClick={handleCreateTodo}></IoIosArrowDroprightCircle>
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