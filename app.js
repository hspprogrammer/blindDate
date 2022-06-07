
const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 5200
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(bodyParser.urlencoded({txtended: true}))
app.use(bodyParser.json())
app.use(cors());

//获取列表
app.post('/person/list', (req, res) => {
    fs.readFile(path.join(__dirname, './data/index.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
             return
        }
        const {male,ageStart,ageEnd,heightStart,heightEnd,yearIncomeStart,yearIncomeEnd,localtion,hometown,page,size} = req.body;
        data = JSON.parse(data);
        data = data.filter((item)=>{
            let res = true;
            if(male){
                res = res&&item.male == male;
            }
            if(ageStart){
                res = res&&item.birthday > ageStart;
            }
            if(ageEnd){
                res = res&&item.birthday < ageEnd;
            }
            if(heightStart){
                res = res&&item.height > heightStart;
            }
            if(heightEnd){
                res = res&&item.height < heightEnd;
            }
            if(yearIncomeStart){
                res = res&&item.yearIncome > yearIncomeStart;
            }
            if(yearIncomeEnd){
                res = res&&item.yearIncome < yearIncomeEnd;
            }
            if(hometown&&hometown.length){
                res = res&&item.hometown.toString() ==hometown.toString();
            }
            if(localtion&&localtion.length){
                res = res&&item.localtion.toString() ==localtion.toString();
            }
            return res;
        })
        res.json({ data:[...data].splice(page-1,size),total:data.length,page,size });
    })
})
// 新增
app.post('/add/person', (req, res) => {
    const newPerson = req.body;
    fs.readFile(path.join(__dirname, './data/index.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
             return
        }
        fs.writeFileSync(path.join(__dirname, './data/index.json'),JSON.stringify([...JSON.parse(data),newPerson]),'utf8')
        res.json({ data:JSON.parse(data) });
    })
})
//行政区域
app.get('/cityList', (req, res) => {
    fs.readFile(path.join(__dirname, './data/cityList.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
             return
        }
        data = JSON.parse(data);
        res.json({ data });
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})