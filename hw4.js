'use strict'

const imgWidth = document.querySelector('#input1');
const imgHeight = document.querySelector('#input2');
const btn = document.querySelector('button');
const resultDiv = document.querySelector('.result');

btn.addEventListener('click', ()=>{
    let width = imgWidth.value;
    let height = imgHeight.value;
    if ((width > 500 || width < 100) || (height > 500 || height < 100)){
        document.querySelector('p').textContent ='число вне диапазона от 100 до 500';
    }
    else{
        useRequest(`https://loremflickr.com/json/${width}//${height}/all`, displayResult);
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