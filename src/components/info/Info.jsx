import React, { useState, useRef } from 'react'
import { RxGithubLogo } from "react-icons/rx";
import { motion, AnimatePresence, easeIn } from 'framer-motion';
import style from './InfoStyle.module.css'

function Info() {
    const introductions = [
        {
            title: "[성장 과정]",
            text:
            [
                "저는 게임 QA 업무에서 경력을 시작했습니다. 테스트를 진행하며 개발자들과 협업할 기회를 많이 가졌고 그들이 코드를 통해 아이디어를 실현하고 문제를 해결하는 과정을 보면서 큰 매력을 느꼈습니다. 이 경험을 통해 문제를 발견하는 역할을 넘어 직접 기능을 구현하는 개발자로 성장하고 싶다는 목표를 가지게 되었습니다.",
                "퇴사 후에는 학원에 등록해 유니티를 사용한 게임 개발을 배우기 시작했습니다. 처음에는 버튼 클릭이나 간단한 애니메이션 같은 기본 기능조차 구현하기 어려웠지만 디버깅을 통해 문제를 하나씩 해결해 나가면서 개발에 대한 이해도가 깊어졌습니다. 점차 복잡한 기능을 구현하며 만드는 즐거움과 결과물에 대한 보람을 경험하게 되었습니다.",
                "게임 클라이언트 프로그래머로 근무하며 초기 기획 단계부터 출시 후 유지 보수까지 전반적인 개발 과정에 참여했습니다. 제가 구현한 기능들이 실제 유저들에게 서비스되고 그에 대한 피드백을 반영하는 과정을 경험했습니다. 업무 중 맡았던 웹 페이지 구현 작업을 통해 웹 프론트엔드 분야에 흥미를 가지게 되었고, 현재는 해당 분야로의 이직을 준비하는 단계이며 게임 개발을 통해 쌓은 경험을 바탕으로 웹에서도 유저에게 가치 있는 서비스를 제공하는 개발자가 되고자 합니다."                
            ]
        },
        {
            title: "[성격]",
            text:
                [
                    "저는 타인의 의견을 잘 수렴하는 성격을 가지고 있습니다. 팀원들의 다양한 의견을 존중하고 이를 바탕으로 더 나은 방향을 모색하며 부족한 부분을 보완하려 노력합니다. 협업이 중요한 업무 과정에서 이러한 성향은 원활한 소통과 문제 해결에 큰 도움이 된다고 생각합니다.",
                    "하지만 때때로 세심하지 못한 면이 있어 업무 진행 중 큰 틀을 해결하면서 사소한 부분을 놓치는 경우가 있습니다. 이를 보완하기 위해 체크리스트를 작성하거나 과거 문제 해결 방식을 정리해두고 잊지 않도록 눈에 잘 띄는 곳에 배치하는 습관을 기르고 있습니다."
                ]
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
                            <div style={{ cursor: "pointer" }}><RxGithubLogo size={28} onClick={() => window.open("https://github.com/k-hanseul")} />
                            </div>

                        </span>
                    </div>
                </div>
            </div>

            <div className={style.info_line}></div>

            <div className={style.info_section_t2} ref={el => scrollRef.current[1] = el}>
                {introductions.map((list, index) => (
                    <li  style={{ marginBottom:  index === 0 ? "15px" : "0"}} key={index}>
                        <div className={style.introduction_title} onClick={() => handleShowDetail(index)}>
                            {list.title}
                                <motion.div style={{ cursor: "pointer" }}
                                    initial={{ y: 0}}
                                    animate={{ y: listState[index] ? -5 : 5}}
                                    transition={{ duration: 0.8, ease: "easeIn", repeat: Infinity, repeatType: "reverse" }}
                                    >
                                    {listState[index] ? '▲' : '▼'}
                                </motion.div>
                        </div>
                        
                        <AnimatePresence initial={false}>
                            {listState[index] && (
                                <motion.div
                                    initial={{ y: -10, opacity: 0, height: 0 }}
                                    animate={{ y: 0, opacity: 1, height: "auto" }}
                                    exit={{ y: -10, opacity: 0, height: 0 }}
                                    transition={{ duration: 0.25, ease: "easeOut", opacity: { duration: 0.15 } }}
                                    // className={style.introduction_text}  >
                                    // {list.text}
                                    >
                                    {list.text.map((text, i) => (
                                        <div className={style.introduction_text}>{text}</div>
                                    ))}

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                ))}
            </div>

            <div className={style.info_line}></div>

            <div className={style.info_section_t2} ref={el => scrollRef.current[2] = el}>
                <div className={style.section_title}>교육</div>
                <br></br>
                <div className={style.content_box}>동서울대학교 | 게임 콘텐츠 학과 (2013.3 - 2015.2)</div>
                <br></br>
                <div className={style.content_box}>국제인재능력개발원 | 취업성공 2D&3D 게임 개발자 양성 (2017.11 - 2018.05)</div>
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
                <div className={style.career_division}>회사 프로젝트</div>
                <br></br>
                <div className={style.career_item}>
                    <div className={style.career_item_title}>
                        <h2 style={{ margin: "0" }}>Great Voyage</h2>
                        <p style={{ margin: "0", fontSize: "18px" }}>Cocos Creator - TypeScript</p>
                        <p style={{ margin: "0", fontSize: "15px" }}>(Facebook Instant, Android, Ios)</p>
                    </div>
                    <p className={style.career_item_text}>
                    <div className={style.career_item_top}>서비스 전</div>
                        컨텐츠 구현 (거점, 전투, 교역, 보너스 등)
                        <br />
                        jsbBridgeWrapper를 통한 apk 환경 구축
                        <br />
                        asset bundle을 이용한 리소스 버전 관리
                        <br />
                        api를 사용한 로그인, 결제, 광고, 친구 기능 추가
                    </p>
                </div>
                <div className={style.career_item}>
                    <div className={style.career_item_title}>
                        <h2 style={{ margin: "0" }}>LuckyBomb Casino Slots</h2>
                        <p style={{ margin: "0", fontSize: "18px" }}>Unity, Cocos2D - C#, JavaScript</p>
                        <p style={{ margin: "0", fontSize: "15px" }}>(Facebook Instant, Android, Ios)</p>
                    </div>
                    <p className={style.career_item_text}>
                    <button className={style.career_item_btn} onClick={()=>{window.open("https://luckybombcasino.com")}}>배포 URL</button>
                        slot 컨텐츠 및 이벤트 기능 구현
                        <br />
                        webView를 통한 apk 환경 구축
                        <br />
                        api를 사용한 로그인, 결제, 광고 기능 추가
                        <br />
                        게임 소개 웹페이지 구현
                    </p>
                </div>
                <div className={style.career_item}>
                    <div className={style.career_item_title}>
                        <h2 style={{ margin: "0" }}>Ding Games</h2>
                        <p style={{ margin: "0", fontSize: "18px" }}>React - JavaScript</p>
                    </div>
                    <p className={style.career_item_text}>
                    <div className={style.career_item_top}>서비스 종료</div>
                        컨텐츠 소개 웹페이지 구현
                        <br />
                        aws amplify를 통한 배포
                    </p>
                </div>
                <br></br>
                <br></br>
                <div className={style.career_division}>개인 프로젝트</div>
                <br></br>
                <div className={style.career_item}>
                    <div className={style.career_item_title}>
                        <h2 style={{ margin: "0" }}>Portfolio</h2>
                        <p style={{ margin: "0", fontSize: "18px" }}>React - JavaScript</p>
                    </div>
                    <p className={style.career_item_text}>
                    <button className={style.career_item_btn} onClick={()=>{window.open("https://k-hanseul.github.io/khs_portfolio_web")}}>배포 URL</button>
                        개인 소개 / 이미지 앨범 / 캘린더 날짜 별 투두리스트 + 메모
                        <br />
                        gitHub pages를 통한 배포
                    </p>
                </div>
                <div className={style.career_item}>
                    <div className={style.career_item_title}>
                        <h2 style={{ margin: "0" }}>Game</h2>
                        <p style={{ margin: "0", fontSize: "18px" }}>React - TypeScript, tailwind css</p>
                    </div>
                    <p className={style.career_item_text}>
                    <button className={style.career_item_btn} onClick={()=>{window.open("https://k-hanseul.github.io/khs_games_web")}}>배포 URL</button>
                        간단한 미니 게임 (틀린그림찾기, 지뢰찾기)
                        <br />
                        gitHub pages를 통한 배포
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