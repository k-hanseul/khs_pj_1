import React, { useState, useEffect, useLayoutEffect } from 'react'
import Pagination from 'rc-pagination';
import "rc-pagination/assets/index.css";
import { debounce } from 'lodash';
import style from './AlbumStyle.module.css'

function Album() {
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 768;

  const handleResize = debounce(() => {
    setWidth(window.innerWidth);
  }, 1000);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [currPage, setPage] = useState(1);
  const [pagePhoto, setPagePhoto] = useState([]);

  var totalPhotos = [];
  var pagePhotoCnt = isMobile ? 4 : 8;   // 한 페이지 당 노출되는 이미지 수
  // var pagePhotoCnt = 6;   // 한 페이지 당 노출되는 이미지 수

  // 앨범 폴더 내 사진 체크
  function getPhotoList() {
    var photoFiles = require.context("../../../public/img/album", false, /\.(png|jpe?g|svg)$/);
    photoFiles.keys().forEach(function (key, i) {
      totalPhotos.push(photoFiles(key));
      // console.log("#### key: " + key + " / totalPhotos[key]: " + totalPhotos[i] + " / photoFiles[key]: " + photoFiles[key]);
    });
    // console.log("#### totalPhotos.length: " + totalPhotos.length + " / totalPhotos: " + JSON.stringify(totalPhotos));
    return totalPhotos.length;
  }

  // 페이지 변경 시 노출 데이터 변경
  useEffect(() => {
    var items = document.getElementsByClassName("photo_img");
    // console.log("#### items.length: " + items.length + " / items: " + JSON.stringify(items));
    console.log("#### pagePhoto.length: " + pagePhoto.length + " / pagePhoto: " + JSON.stringify(pagePhoto));

    // items.forEach(function(item) {
    //   item.style.display = "none";
    // });


    var data = totalPhotos.slice((currPage - 1) * pagePhotoCnt, currPage * pagePhotoCnt);
    setPagePhoto(data);
  }, [currPage]);

  return (
    <div className={style.album}>
      {
        getPhotoList() > 0 ?
          <div className={style.photo_section_t1}>
            <div className={style.photo_list}>
              {
                // totalPhotos.map((p, i) => (
                //   <div className={style.photo_item} key={i}>
                //     <img className={style.photo_img} src={p} alt={"photo_" + i} />
                //   </div>
                // ))
                [...Array(pagePhotoCnt)].map((e, i) => (
                  <div className={style.photo_item} style={{ display: pagePhoto.length > i ? "block" : "block" }} key={i}>
                    {
                      pagePhoto.length > i &&
                      <img className={style.photo_img} src={pagePhoto[i]} alt={"photo_" + i} />
                      // <img className={style.photo_img} src={pagePhoto[i]} alt={"photo_" + i} loading={"lazy"} decoding={"async"}/>
                    }

                  </div>
                ))
              }
            </div>
            <div className={style.pagination}>
              <Pagination
                current={currPage}
                total={totalPhotos.length}
                pageSize={pagePhotoCnt}
                showLessItems={true}
                onChange={(page) => setPage(page)}
              />
            </div>
          </div>
          :
          <div className={style.photo_section_t1}>
            <h3>앨범 내 사진이 존재하지 않습니다. </h3>
          </div>
      }
    </div>
  )
}

export default Album