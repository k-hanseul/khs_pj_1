import React, { useState, useEffect } from 'react'
import style from './AlbumStyle.module.css'
// import fs from "fs";
// import { fs } from 'fs';

// import { promises as fs } from 'fs';
// import { promises as fs } from 'fs';
// import fs from "node:fs/promises";
// require("bootstrap/less/bootstrap.less");

function Album() {
  var totalPhoto = 30;  // 총 이미지 수
  var pagePhoto = 10;   // 한 페이지 당 노출되는 이미지 수
  const [currPage, setPage] = useState(1);



  // 이미지가 있는지 체크하는 함수
  function checkImageExists(imageUrl) {
    console.log("#### checkImageExists imageUrl: " + imageUrl);
    return true;
    /*
    

    fs.readFile('./sample.txt', 'utf8', (err, data) => {
      if (err) throw err;
      console.log(data); // 파일 데이터 정보
    });

    // 새로운 이미지 객체 생성
    const img = new Image();
    // 이미지 로드가 성공한 경우
    img.onload = function () {
      // 이미지가 존재하는 경우 true를 반환
      console.log('이미지가 유효합니다.');
      return true;
    };
    // 이미지 로드가 실패한 경우
    img.onerror = function () {
      // 이미지가 존재하지 않는 경우 false를 반환
      console.log('이미지 로딩에 실패했습니다.');
      return false;
    };
    // 이미지 URL 설정
    img.src = imageUrl;
    // 이미지가 존재하는지 여부를 반환
    console.log("#### img: " + img.src);
    return img.complete;
    */
  }
  {/* </div> */ }

  function test(index) {
    console.log("#### test");
    // if (index % 2 == 0) return true;
    // else return false;
    return true;
  }

  const changePageHandler = (pageIndex) => {
    // handlePageChange(pageNumber) {
    console.log(`active page is ${pageIndex}`);
    // this.setState({activePage: pageNumber});
  }

  
  // function getPhotoList() {
  //   console.log("#### getPhotoList");
  //   // if (index % 2 == 0) return true;
  //   // else return false;
  // }
  // const fileInput = document.querySelector('process.env.PUBLIC_URL' + "/img/album');

  // 처음 렌더링 시 앨범 사진 받아오기
  useEffect(() => {
    // var fs = require('fs'); 
    // var t= fs.readdirSync('img/album', function(err, filelist){
    //   console.log(filelist);
    // });
    var fs = require('fs');
// var tt = fs.readFileSync("파일경로", "encoding");
    // fs.readFileSync('경로');
    // console.log("#### getPhotoList");
    // const styleRaw = fs.readFileSync('./src/extensions/sites/noscript/test.css', 'utf-8');
// fs.readdirSync
    // const fs = require('fs');
// fs.readFile('');
    // fs.readFileSync("파일경로", "encoding");
// fs.readFile("./dist/client/index.html", "utf-8");
// fs.readFile
//     fs.readdir('img/album', function(err, filelist){
//       // fs모듈의 readdir함수를 사용해
//       // 첫번째 인자로 파일 목록을 읽을 폴더(dir)를 가져오고
//       // 콜백함수의 두번째 인자로 폴더(dir)의 파일목록(filelist)을 가져옴
      
//         console.log(filelist);
      
      // });
// var idx=0;
    // while(true) {
    // break;
    //   }
  }, []);

  return (

    <div>
      <div className={style.photo_section_t1}>
        <div className={style.photo_list}>

          {[...Array(15)].map((e, index) => (
            // <div key={index} className="post__box">
            //   {`${index}번째 아이템 입니다.`}
            // </div>
            // checkImageExists(process.env.PUBLIC_URL + "/img/album/" + index + ".jpg") ?
            // checkImageExists('img/seul_.jpg') ?
            test(index) &&
            <div className={style.photo_item} key={index}>
              <img className={style.photo_img} src={'img/album/0.jpg'} alt="photo_0" />
              {/* {`${index}`} */}
            </div>
            // :
            // <div>
            //   {`${index}번째 아이템 입니다.2`}
            // </div>
          ))}
        </div>

        <div>
          {/* <button onClick={setPage(1)} disabled={currPage === 1}>
            prev
          </button>

          {pageList.map((page) => (
            <button
              key={page}
              onClick={() => setPage(page)}
              className={currentPage === page ? "active" : ""}
            >
              {page}
            </button>
          ))}

          <button onClick={setPage(1)} disabled={currPage === pageList.length}>
            next
          </button> */}
        </div>

        {/* {[...Array(10)].map((value, index) => {
        return (
          <li key={index}>
            {`${index}번째 아이템 입니다.`}
          </li>
        );
      })} */}

      </div>
    </div>
  )
}

export default Album