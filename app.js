
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 5200
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({txtended: true}))
app.use(bodyParser.json())

//获取列表
app.post('/person/list', (req, res) => {
    fs.readFile(path.join(__dirname, './data/index.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
             return
        }
        const {male} = req.body;
        data = JSON.parse(data);
        if(male){
            data = data.filter((item)=>{
                return item.male == male;
            })
        }
        res.json({ data });
    })
})
// 新增
app.post('/add/person', (req, res) => {
    const newPerson = req.body;
    console.log({newPerson})
    fs.readFile(path.join(__dirname, './data/index.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
             return
        }
        fs.writeFileSync(path.join(__dirname, './data/index.json'),JSON.stringify([...JSON.parse(data),newPerson]),'utf8')
        res.json({ data:JSON.parse(data) });
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})