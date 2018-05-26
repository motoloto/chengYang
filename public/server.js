// require這些東西都是調用node環境中的包，只要有node環境，這些require的模塊都是默認被安裝進去了，就可以直接這樣寫
// node支持ES6的寫法，下面的就是ES6的寫法，不需要額外使用插件來把ES6轉ES5，很方便

let http = require('http')
let url = require('url')
let util = require('util')
let fs = require('fs')

// http庫是node提供的api，可以直接上node的中文網，直接看到各種api
let server = http.createServer((req, res) => {

  // 通過你在瀏覽器輸入的網站，利用url.parse進行解析成一個對象，再讀取其中pathname的屬性
// 例如你輸入http://localhost:8080/index.html，然後url.parse(req.url).pathname返回的值為 "/index.html"
  var pathname = url.parse(req.url).pathname
  console.log('file:' + pathname.substring(1))
  // fs，文檔系統，讀取文檔
  fs.readFile(pathname.substring(1), (err, data) => {
    if (err) {
      // 錯誤就返回404狀態碼
      res.writeHead(404, {
        'Content-Type': 'text/html'
      })
    } else {
      // 成功讀取文檔
      res.writeHead(200, {
        'Content-Type': 'text/html'
      })
      // 展示文檔數據
      res.write(data.toString())
    }
    // 注意，這個end 一定要放在讀取文檔的內部使用
    res.end(util.inspect(url.parse(req.url)))
  })
})

server.listen(3000, '127.0.0.1', () => {
  console.log('服務器已經運行，請打開瀏覽器，輸入：http：//127.0.0.1：3000/來訪問')
})