import React, { useState } from 'react'
import style from './infoStyle.module.css'

function Info() {

    const [detailLiStates, setDetailLiStates] = useState({});
    const handleShowDetail = (index) => {
        setDetailLiStates((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const introductions = [
        {
            isOpen: true,
            title: "[성장 과정]",
            text:
                "게임 업계에서의 시작은 QA 업무였습니다. 테스트를 진행하며 자연스럽게 개발자들과 협업할 기회가 많았고, 그들이 코드를 통해 게임을 구현하는 과정에 흥미를 느끼게 되었습니다. "
        },
        {
            isOpen: true,
            title: "[성격]",
            text:
                "저는 타인의 의견을 잘 수렴하는 성격을 가지고 있습니다. 팀원들의 다양한 의견을 받아들이며, 이를 바탕으로 더 나은 방향을 모색하고 부족한 부분을 보완하는 데 노력합니다."
        }
    ];


    return (
        <section className={style.info} bgcolor="#F4F4F2">
            <div className={style.info_section_1}>
                <img className={style.profile_img} src={'img/seul_.jpg'} alt="profile_img" />
                <div className={style.profile_list}>
                    <div className={style.profile_item}>
                        <span>이름 ||
                            <div>
                                김한슬
                            </div>
                        </span>
                    </div>
                    <div className={style.profile_item}>
                        <span>생년월일 ||
                            <div>1995.01.20</div>
                        </span>
                    </div>
                    <div className={style.profile_item}>
                        <span>전화번호 ||
                            <div>010-4067-5796</div>
                        </span>
                    </div>
                    <div className={style.profile_item}>
                        <span>이메일 ||
                            <div>lkj2822@gmail.com</div>
                        </span>
                    </div>
                    <div className={style.profile_item}>
                        <span>깃허브 ||
                            <div>https://github.com/k-hanseul</div>
                        </span>
                    </div>
                </div>
            </div>

            <div className={style.info_section_2}>
                {introductions.map((list, index) => (
                    <li key={index}>
                        <div className={style.introduction_title} onClick={() => handleShowDetail(index)}>
                            {list.title} {detailLiStates[index] ? '▲' : '▼'}
                        </div>
                        {detailLiStates[index] && (
                            <div className={style.introduction_text} >
                                {list.text}
                            </div>
                        )}
                    </li>
                ))}
            </div>
        </section>
    )
}

export default Info