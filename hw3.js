'use strict'

function useRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true)

    xhr.onload = function(){
        const result = JSON.parse(xhr.response);
        if(callback){
            callback(result);
            xhr.send;
        }
    }
}

const resultNode = document.querySelector('.j-result');
const btnNode = document.querySelector('button');

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

  resultNode.innerHTML = cards;
}

btnNode.addEventListener('click', ()=>{
    const value = document.querySelector('input').value;
    if (value < 1 || value > 10){
        document.querySelector('p').textContent =`число ${value} вне диапазона от 1 до 10`;
    }
    else{
        useRequest(`https://loremflickr.com/json/g/320/240/all/?limit=${value}`, displayResult);
    }
});

