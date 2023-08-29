const fs = require('fs')

function createShortUrl () {
  arr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
  let str = ''
  for (let i = 0; i < 5; i++) {
    str += arr[Math.floor(Math.random() * 62)].toString()
  }
  return str
}

function getKeyByValue(object, value) {
  for (const key in object) {
    if (object.hasOwnProperty(key) && object[key] === value) {
      return key;
    }
  }
}

function storeData (shortenUrl, originUrl) {
  // 讀取 data.json 檔案
  fs.readFile('./public/jsons/data.json', 'utf8', function (err, data) {
    if (err) {
      console.error(err)
      return;
    }
    try {
      // 解析 JSON
      const jsonData = JSON.parse(data);
      // 新的資料
      const newData = {
        [shortenUrl]: originUrl
      }
      // 將新資料新增到 people 陣列
      jsonData[shortenUrl] = originUrl
      // 寫回檔案
      fs.writeFile('./public/jsons/data.json', JSON.stringify(jsonData, null, 2), 'utf8', function (err) {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Data added successfully.');
      })
    } catch (jsonError) {
      console.error(jsonError)
    }
  })
}

function readData (dataPath) {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

module.exports = {
  createShortUrl,
  getKeyByValue,
  storeData,
  readData
}