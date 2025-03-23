import React, { useState, useEffect, useLayoutEffect } from 'react'
import style from './CalendarStyle.module.css'
// import { format, eachDayOfInterval, startOfMonth , endOfMonth, lastDayOfMonth  } from 'date-fns';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, getDay, addDays } from "date-fns";
import { LiaAngleLeftSolid } from "react-icons/lia";
import { LiaAngleRightSolid } from "react-icons/lia";

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
            daysInWeek.push(
                <div className={style.col}>
                    {i!==0 ? format(startDay, 'dd') : ''}

                </div>
            )
            if (i !== 0) startDay = addDays(startDay, 1);
        }

        daysInMonth.push(daysInWeek);
        console.log("### daysInWeek: " + daysInWeek.toString());
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

    return (
        <div className={style.calendar}>
            <div>
                <LiaAngleLeftSolid />
                {format(currDate, "yyyy")}년 {format(currDate, "M")}월 {format(currDate, "dd")}일
                <LiaAngleRightSolid />
            </div>

            <div className={style.calendar_week}>
                {
                    week.map((w, i) => (
                        <div className={style.col}>
                            {w}
                        </div>
                    ))
                }
            </div>

            <RenderDay
                currDate={currDate}
            />
        </div>
    )
};

export default Calendar