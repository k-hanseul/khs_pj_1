import React, { useState, useRef } from 'react'
import { RxGithubLogo } from "react-icons/rx";
import { motion, AnimatePresence, easeIn } from 'framer-motion';
import style from './InfoStyle.module.css'

function Info() {
    const introductions = [
        {
            title: "[성장 과정]",
            text:
                "게임 업계에서의 시작은 QA 업무였습니다. 테스트를 진행하며 자연스럽게 개발자들과 협업할 기회가 많았고, 그들이 코드를 통해 게임을 구현하는 과정에 흥미를 느끼게 되었습니다.\n퇴사 후 게임 개발 학원에서 프로그래밍을 배우며 본격적으로 게임 개발을 시작했습니다. 처음에는 작은 기능 하나를 구현하는 것도 쉽지 않았지만, 디버깅을 통해 문제를 해결하며 점점 더 복잡한 시스템을 만들어 갈 수 있었습니다. 그렇게 게임이 완성되는 과정에서 개발의 즐거움과 성취감을 느꼈습니다.\n학원 수료 후 게임 프로그래머로 근무하며 직접 구현한 게임이 서비스되어 유저들에게 재미를 준다는 점에서 보람을 느꼈습니다.\n지금은 이직을 준비하는 단계이지만, 게임을 만들어가며 느끼는 즐거움과 보람을 계속 이어가고 싶습니다. 앞으로도 더욱 발전된 기술을 익히고, 더 나은 게임을 만드는 개발자가 되기 위해 끊임없이 노력하겠습니다."
        },
        {
            title: "[성격]",
            text:
                "저는 타인의 의견을 잘 수렴하는 성격을 가지고 있습니다. 팀원들의 다양한 의견을 받아들이며, 이를 바탕으로 더 나은 방향을 모색하고 부족한 부분을 보완하는 데 노력합니다. 협업이 중요한 게임 개발 과정에서 이러한 성향은 원활한 소통과 문제 해결에 도움이 된다고 생각합니다.\n하지만 세심하지 못한 면이 있어 업무 진행 중 큰 틀을 해결하며 사소한 부분을 놓치는 경우가 있습니다. 이를 보완하기 위해 미리 체크해야 할 사항과 과거 문제 해결 방식을 정리해 두고, 잊지 않도록 눈에 보이는 곳에 배치하는 습관을 기르고 있습니다."
        }
    ];

    const getListState = () => {
        let states = new Array(introductions.length).fill(true);
        // console.log("#### getListState states: " + JSON.stringify(states) + " / introductions: " + JSON.stringify(introductions));
        return states;
    };

    const handleShowDetail = (index) => {
        listState[index] = !listState[index];
        setListState([...listState]);
        console.log("#### handleShowDetail index: " + index + " / listState: " + JSON.stringify(listState));
    };

    const [listState, setListState] = useState(getListState);

    const scrollRef = useRef([]);
    const handleClickScroll = (index) => {
        scrollRef.current[index].style.scrollMargin = "80px";
        // scrollRef.current[index].style.scrollPadding = "60px";
        scrollRef.current[index].scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    return (
        <div className={style.info}>
            <div className={style.info_section_t1} ref={el => scrollRef.current[0] = el}>
                <img className={style.profile_img} src={process.env.PUBLIC_URL + '/img/seul_.jpg'} alt="profile_img" />
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
                            {/* <a href="mailto:lkj2822@gmail.com">lkj2822@gmail.com</a> */}
                            <div>lkj2822@gmail.com</div>
                        </span>
                    </div>
                    <div className={style.profile_item}>
                        <span>깃허브 ||
                            {/* <div>https://github.com/k-hanseul</div> */}
                            <div><RxGithubLogo size={28} onClick={() => window.open("https://github.com/k-hanseul")} />
                            </div>

                        </span>
                    </div>
                </div>
            </div>

            <div className={style.info_line}></div>

            <div className={style.info_section_t2} ref={el => scrollRef.current[1] = el}>
                {introductions.map((list, index) => (
                    <li key={index}>
                        {/* <div className={style.introduction_title} onClick={""}> */}
                        <div className={style.introduction_title} onClick={() => handleShowDetail(index)}>
                            {list.title}
                            {/* {" "}
                            <motion.div>
                            {"▲"}
                            </motion.div>
                             */}
                            {listState[index] ? ' ▲' : ' ▼'}
                        </div>
                        <AnimatePresence initial={false}>
                            {listState[index] && (
                                <motion.div
                                    initial={{ y: -10, opacity: 0, height: 0 }}
                                    animate={{ y: 0, opacity: 1, height: "auto" }}
                                    exit={{ y: -10, opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25, ease: "easeOut", opacity: { duration: 0.15 } }}
                                    className={style.introduction_text}  >
                                    {list.text}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <br></br>
                    </li>
                ))}
            </div>

            <div className={style.info_line}></div>

            <div className={style.info_section_t2} ref={el => scrollRef.current[2] = el}>
                <div className={style.section_title}>교육</div>
                <br></br>
                {/* <div className={style.content_list}> */}
                <div className={style.content_box}>동서울대학교 | 게임 콘텐츠 학과 (2013.3 - 2015.2)</div>
                <br></br>
                <div className={style.content_box}>국제인재능력개발원 | 취업성공 2D&3D 게임 개발자 양성 (2017.11 - 2018.05)</div>
                {/* </div> */}
            </div>

            <div className={style.info_line}></div>

            <div className={style.info_section_t2} ref={el => scrollRef.current[3] = el}>
                <div className={style.section_title}>경력</div>
                <br></br>
                <div className={style.career_item}>
                    <div className={style.career_item_title}>
                        <h2 style={{ margin: "0" }}>다이얼로그 스페이스</h2>
                        <p style={{ margin: "0", fontSize: "15px" }}>개발자 (사원) ∙ 2018 - 2024</p>
                    </div>
                    <div className={style.career_item_text}>
                        LuckyBomb Casino Slots, Great Voyage 개발
                    </div>
                </div>
                {/* <div className={style.career_item}>
                    <h4 className={style.career_item_title}>
                        다이얼로그 스페이스
                        <br />
                        개발자 (사원) ∙ 2018 - 2024
                    </h4>
                    <div className={style.career_item_text}>
                        LuckyBomb Casino Slots, Great Voyage 개발
                    </div>
                </div> */}
                <br></br>
                <div className={style.career_item}>
                    <div className={style.career_item_title}>
                        <h2 style={{ margin: "0" }}>블루 사이드</h2>
                        <p style={{ margin: "0", fontSize: "15px" }}>QA (사원) ∙ 2017</p>
                    </div>
                    <div className={style.career_item_text}>
                        킹덤 언더 파이어2 QA
                    </div>
                </div>
                <br></br>
                <div className={style.career_item}>
                    <div className={style.career_item_title}>
                        <h2 style={{ margin: "0" }}>세가 퍼블리싱 코리아</h2>
                        <p style={{ margin: "0", fontSize: "15px" }}>QA (사원) ∙ 2014 - 2017</p>
                    </div>
                    <div className={style.career_item_text}>
                        풋볼 매니저 온라인 QA
                    </div>
                </div>
            </div>

            <div className={style.info_line}></div>
            <div className={style.info_section_t2} ref={el => scrollRef.current[4] = el}>
                <div className={style.section_title}>프로젝트</div>
                <br></br>
                <div className={style.career_item}>
                    <div className={style.career_item_title}>
                        <h2 style={{ margin: "0" }}>Great Voyage</h2>
                        <p style={{ margin: "0", fontSize: "18px" }}>Cocos Creator</p>
                        <p style={{ margin: "0", fontSize: "15px" }}>(Facebook Instant, Android, Ios)</p>
                    </div>
                    <p className={style.career_item_text}>
                        컨텐츠 구현 (거점, 전투, 교역, 보너스 등)
                        <br />
                        jsbBridgeWrapper를 통한 apk 환경 구축
                        <br />
                        asset bundle을 이용한 리소스 버전 관리
                        <br />
                        api를 사용한 로그인, 결제, 광고, 친구 기능 추가
                    </p>
                </div>
                <br></br>
                <div className={style.career_item}>
                    <div className={style.career_item_title}>
                        <h2 style={{ margin: "0" }}>LuckyBomb Casino Slots</h2>
                        <p style={{ margin: "0", fontSize: "18px" }}>Unity, Cocos2D</p>
                        <p style={{ margin: "0", fontSize: "15px" }}>(Facebook Instant, Android, Ios)</p>
                    </div>
                    <p className={style.career_item_text}>
                        slot 컨텐츠 및 이벤트 기능 구현
                        <br />
                        webView를 통한 apk 환경 구축
                        <br />
                        api를 사용한 로그인, 결제, 광고 기능 추가
                        <br />
                        게임 소개 웹페이지 구현 (https://luckybombcasino.com)
                    </p>
                </div>
                <br></br>
                <div className={style.career_item}>
                    <div className={style.career_item_title}>
                        <h2 style={{ margin: "0" }}>Ding Games</h2>
                        <p style={{ margin: "0", fontSize: "18px" }}>React</p>
                    </div>
                    <p className={style.career_item_text}>
                        컨텐츠 소개 웹페이지 구현
                        <br />
                        aws amplify를 통한 배포
                    </p>
                </div>
            </div>
            <div className={style.info_navi}>
                <div className={style.navi_list}>
                    <div className={style.navi_item} onClick={() => { handleClickScroll(0) }}>
                        프로필
                    </div>
                    <div className={style.navi_item} onClick={() => { handleClickScroll(1) }}>
                        소개
                    </div>
                    <div className={style.navi_item} onClick={() => { handleClickScroll(2) }}>
                        교육
                    </div>
                    <div className={style.navi_item} onClick={() => { handleClickScroll(3) }}>
                        경력
                    </div>
                    <div className={style.navi_item} onClick={() => { handleClickScroll(4) }}>
                        프로젝트
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info