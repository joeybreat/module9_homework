'use strict'

const imgWidth = document.querySelector('#input1');
const imgHeight = document.querySelector('#input2');
const btn = document.querySelector('button');
const resultDiv = document.querySelector('.result');

btn.addEventListener('click', ()=>{
    let imageWidth = imgWidth.value;
    let imageHeight = imgHeight.value;
    let randomNumber = Math.floor(Math.random() * 5);
    if (imageWidth > 500 || imageWidth < 100){
        document.querySelector('p').textContent ='Ширина картинки вне диапазона от 100 до 500';
    }
    else if (imageHeight > 500 || imageHeight < 100){
      document.querySelector('p').textContent ='Высота картинки вне диапазона от 100 до 500';
    }
    else{
        useRequest(`https://source.unsplash.com/collection/928423/${imageWidth}x${imageHeight}/?sig=${randomNumber}`, displayResult);
    }
});

function useRequest(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    
    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        const result = JSON.parse(xhr.response);
        if (callback) {
          callback(result);
        }
      }
    };
    
    xhr.onerror = function() {
      console.log('Ошибка! Статус ответа: ', xhr.status);
    };
    
    xhr.send();
  };

  function displayResult(apiData) {
    let cards = '';    
    apiData.forEach(item => {
      const cardBlock = `
        <div class="card">
          <img
            src="${item.download_url}"
            class="card-image"
          />
        </div>
      `;
      cards = cards + cardBlock;
    });      
    resultDiv.innerHTML += cards;
  }