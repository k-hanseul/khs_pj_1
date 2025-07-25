import React, { useState, useEffect, useLayoutEffect } from 'react'
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, addDays, isSaturday, isSunday, addMonths, subMonths } from "date-fns";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { IoIosArrowDroprightCircle, IoMdSquareOutline, IoMdCheckbox, IoMdCreate, IoMdClose } from "react-icons/io";
import { PiListBold, PiListHeartBold, PiNoteBold } from "react-icons/pi";
import style from './CalendarStyle.module.css'

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

    // 날짜에 투두가 있는지 체크
    function isDayTodo(date) {
        let type = 0;
        let key = "TODO_" + format(date, 'yyyy-MM-dd');
        const localTodo = localStorage.getItem(key);
        // if (localTodo) {
        //     type = JSON.parse(localTodo).includes((t, i) => !t.isCompleted) ? 1 : 2;
        // }        
        // console.log("#### isDayTodo key: " + key + " / localTodo: " + localTodo + " / type: " + type);
        // return type;
        return localTodo ? true : false;
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
                    {/* <div>{i !== 0 && isDayMemo(date) ? 'Memo' : ''}</div> */}

                    {
                        i !== 0 && isDayMemo(date) && <PiNoteBold size={20} style={{ marginLeft: "auto" }} />
                    }
                    {
                        i !== 0 && isDayTodo(date) && <PiListBold size={20} style={{ marginLeft: "auto" }} />
                    }
                    {/* {
                        i !== 0 && isDayTodo(date) === 1 && <PiListBold size={20} style={{ marginLeft: "auto" }} />
                    }
                    {
                        i !== 0 && isDayTodo(date) === 2 && <PiListHeartBold size={20} style={{ marginLeft: "auto" }} />
                    } */}
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
    const week = ["*", "월", "화", "수", "목", "금", "토", "일"];

    const [currDate, setCurrDate] = useState(new Date());

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

    const [currTodoValue, setCurrTodoValue] = useState('');
    const handleEditTodoValue = (e) => {
        setCurrTodoValue(e.target.value);
    }

    const TODO_KEY = "TODO_" + format(currDate, 'yyyy-MM-dd');
    const [currTodoList, setCurrTodoList] = useState([]);

    function getTodo() {
        let t = [];
        const localTodo = localStorage.getItem(TODO_KEY);
        if (localTodo) t = JSON.parse(localTodo);
        setCurrTodoList(t);
        // console.log("#### getTodo TODO_KEY: " + TODO_KEY + " / t: " + t + " / localTodo: " + localTodo);
    }

    const handleCreateTodo = () => {
        // console.log("### handleCreateTodo currTodoValue: " + currTodoValue);
        if (currTodoValue === undefined || currTodoValue === null || currTodoValue === 0 || currTodoValue === '' || !currTodoValue.replace(/\s/g, '').length) {
            console.log("### handleCreateTodo null");
            return;
        }
        const newTodo = {
            text: currTodoValue,
            isCompleted: false,
        };

        let newList = [...currTodoList, newTodo];
        setCurrTodoList(newList);
        setCurrTodoValue('');

        localStorage.setItem(TODO_KEY, JSON.stringify(newList));
    }
    function handleCheckTodo(index) {
        let newList = currTodoList.map((c, i) => ({
            ...c,
            isCompleted: index === i ? !c.isCompleted : c.isCompleted,
        }));
        // console.log("### handleCheckTodo currTodoList: " + JSON.stringify(currTodoList) + " / newList: " + JSON.stringify(newList));
        setCurrTodoList(newList);
        localStorage.setItem(TODO_KEY, JSON.stringify(newList));
    }

    function handleDeleteTodo(index) {
        let newList = currTodoList.filter((c, i) => i !== index);
        // console.log("### handleDeleteTodo currTodoList: " + JSON.stringify(currTodoList) + " / newList: " + JSON.stringify(newList));
        setCurrTodoList(newList);
        if (newList.length > 0) localStorage.setItem(TODO_KEY, JSON.stringify(newList));
        else localStorage.removeItem(TODO_KEY);
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

    return (
        <div className={style.calendar}>

            <div className={style.calendar_section_t1}>
                <div className={style.calendar_header}>
                    <FaCaretLeft style={{ cursor: "pointer" }} size={35} onClick={handlePrevMonth} />
                    {format(currDate, "yyyy")}년 {format(currDate, "M")}월
                    <FaCaretRight style={{ cursor: "pointer" }} size={35} onClick={handleNextMonth} />
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
                        {
                            currTodoList.map((t, i) => (
                                <div className={style.item} key={i} style={{ display: "flex" }}>
                                    {t.isCompleted ? <IoMdCheckbox size={20} style={{ cursor: "pointer" }} onClick={() => handleCheckTodo(i)} /> : <IoMdSquareOutline size={20} style={{ cursor: "pointer" }} onClick={() => handleCheckTodo(i)} />}
                                    <div className={style.text} style={{ textDecoration: t.isCompleted && "#333 2px line-through" }}>{t.text}</div>
                                    <div style={{ marginLeft: "auto" }}>
                                        <IoMdClose size={20} style={{ paddingLeft: "5px", cursor: "pointer" }} onClick={() => handleDeleteTodo(i)} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={style.create}>
                        <input className={style.create_input} placeholder="클릭 후 투두 리스트 항목을 작성할 수 있습니다." value={currTodoValue} onChange={handleEditTodoValue}></input>
                        <IoIosArrowDroprightCircle className={style.create_btn} onClick={handleCreateTodo}></IoIosArrowDroprightCircle>
                    </div>
                </div>
                <div className={style.memo}>
                    <div className={style.memo_title}>Memo</div>
                    <textarea type='text' placeholder="클릭 후 메모를 작성할 수 있습니다." spellCheck={false} className={style.memo_text} onChange={handleEditMemo} value={currMemo} style={{ padding: "10px" }} ></textarea>
                </div>
            </div>
        </div>
    )
};

export default Calendar