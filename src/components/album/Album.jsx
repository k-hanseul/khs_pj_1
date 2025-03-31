import React, { useState, useEffect, useLayoutEffect } from 'react'
import Pagination from 'rc-pagination';
import "rc-pagination/assets/index.css";
import { debounce } from 'lodash';
import { motion, AnimatePresence, easeIn } from 'framer-motion';
import style from './AlbumStyle.module.css'

function Album() {
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 768;

  const handleResize = debounce(() => {
    setWidth(window.innerWidth);
  }, 1000);

   // const [totalPhotos, setTotalPhotos] = useState(getPhotoList);
  const [totalPhotos, setTotalPhotos] = useState([]);
  const [currPage, setPage] = useState(1);
  const [pagePhoto, setPagePhoto] = useState([]);
  const pagePhotoCnt = 8;

  function getPageData() {
    var data = totalPhotos.slice((currPage - 1) * pagePhotoCnt, currPage * pagePhotoCnt);
    setPagePhoto(data);
  };

  function preloadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function () {
        resolve();
      };
      img.src = src;
    });
  };

  useEffect(() => {
    var files = require.context("../../../public/img/album", false, /\.(png|jpe?g|svg)$/);
    const photos = [];
    files.keys().forEach(function (key, i) {
      photos.push(files(key));
      console.log("#### photos key: " + key);
    });

    async function imagesPromiseList() {
      const imagesPromiseList = [];
      for (const i of photos) {
        console.log("#### testt");
        imagesPromiseList.push(preloadImage(i));
      }
      await Promise.all(imagesPromiseList).then(function () {
        console.log("#### Promise.all");
        setTotalPhotos(photos);
      });
    }
    imagesPromiseList();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    console.log("#### totalPhotos: " + JSON.stringify(totalPhotos));
    if (totalPhotos.length > 0) {
      getPageData();
    }
  }, [totalPhotos]);

  // 페이지 변경 시 노출 데이터 변경
  useEffect(() => {
    getPageData();
  }, [currPage]);

  // 페이지 변경 시 노출 데이터 변경
  // useEffect(() => {
  //   var items = document.getElementsByClassName("photo_img");
  //   // console.log("#### items.length: " + items.length + " / items: " + JSON.stringify(items));
  //   // console.log("#### pagePhoto.length: " + pagePhoto.length + " / pagePhoto: " + JSON.stringify(pagePhoto));
  //   console.log("#### pagePhoto.length: " + totalPhotos_.length + " / pagePhoto: " + JSON.stringify(totalPhotos_));

  //   // items.forEach(function(item) {
  //   //   item.style.display = "none";
  //   // });

  //   var data = totalPhotos_.slice((currPage - 1) * pagePhotoCnt, currPage * pagePhotoCnt);

  //   // var data = totalPhotos.slice((currPage - 1) * pagePhotoCnt, currPage * pagePhotoCnt);
  //   setPagePhoto(data);
  // }, [currPage]);

  useEffect(() => {
    console.log("#### pagePhoto: " + JSON.stringify(pagePhoto));
  }, [pagePhoto]);

  // useEffect(() => {
  //   console.log("#### imagesPreloaded: " + imagesPreloaded);
  //   if (imagesPreloaded) {
  //     console.log("#### imagesPreloaded totalPhotos: " + JSON.stringify(totalPhotos) + " / " + totalPhotos.length);
  //     console.log("#### 22 test: " + test);
  //     getPageData();
  //   }
  // }, [imagesPreloaded]);



  function getPageData() {
    var data = totalPhotos.slice((currPage - 1) * pagePhotoCnt, currPage * pagePhotoCnt);
    console.log("#### getPageData: " + JSON.stringify(data));

    setPagePhoto(data);
  }











  return (
    <div className={style.album}>
      <div className={style.photo_section_t1}>
        <div className={style.photo_list}>
          {
            // totalPhotos.map((p, i) => (
            //   <div className={style.photo_item} key={i}>
            //     <img className={style.photo_img} src={p} alt={"photo_" + i} />
            //   </div>
            // ))
            [...Array(pagePhotoCnt)].map((e, i) => (
              <div className={style.photo_item} key={i}>
                <AnimatePresence initial={false}>

                <img className={style.photo_img} style={{ display: pagePhoto.length > i ? "none" : "block", objectFit: "scale-down", opacity: "0.5" }} src={process.env.PUBLIC_URL + '/img/logo_cat_.png'} alt={"default_photo_" + i} />
                </AnimatePresence>

                <img className={style.photo_img} style={{ display: pagePhoto.length > i ? "block" : "none" }} src={pagePhoto[i]} alt={"photo_" + i} />
              </div>
            ))
          }
        </div>
        <div className={style.pagination}>
          <Pagination
            current={currPage}
            // total={totalPhotos.length}
            total={11}
            pageSize={pagePhotoCnt}
            showLessItems={true}
            onChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  )

  /*
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
  */
}

export default Album