var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// xem chi tiet
router.get('/chitiet' , async  function (req , res, next){
  var sinhvien = await SV.find({_id : req.query.id})
  res.render('chitiet' , {data:(sinhvien[0])})
})
// sua sv
router.get('/suasv', function(req, res, next) {

  var id = req.query.id

  res.render('suasv', {id:id});
});
// xóa sinh viên
router.get('/xoa' , async  function(req , res , next ){
  await SV.deleteOne({_id:req.query.id})
  res.redirect('/xemds')
})
// xem ds
router.get('/xemds',async function(req, res , next){
  var sinhviens = await  SV.find({})
  res.render('xemds' , {data:sinhviens}) ;
})
// ket oi voi mongoose
var db = 'mongodb+srv://Chungbui:chungkk123@cluster0.hq9zz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongoose = require('mongoose') ;
const {Schema} = mongoose ;
mongoose.connect(db) .catch(error =>{
  if (error)
  {
    console.log("kết nối lỗi")
  }
  else {
    console.log("kết nối thành công")

  }
}) ;
// tạo model
const  sinhvien = new Schema({
  idsv :String ,
  email:String ,
  diachi:String ,
  khoa:String
})
const SV = mongoose.model('thithu3' , sinhvien)
//// sua ds
router.post('/updata', function(req, res ) {
  var idsv = req.body.idsv ;
  var diachi = req.body.diachi ;
  var khoa = req.body.khoa ;
  var email = req.body.email ;
  var sinhvienmoi = {

    diachi:diachi ,
    khoa:khoa ,
    email:email
  }
  SV.findByIdAndUpdate({_id:idsv},sinhvienmoi,function (error){
    res.redirect('/xemds')
  })



});
// thêm sinh viên
router.post('/themsv', function(req, res, next) {
  var idsv = req.body.idsv ;
  var diachi = req.body.diachi ;
  var khoa = req.body.khoa ;
  var email = req.body.email ;
  const sinhvien = new SV({
    idsv: idsv ,
    diachi:diachi ,
    khoa:khoa ,
    email:email
  })
  sinhvien.save(function (error){
    if (error)
    {
      console.log('thêm không thành công')
    }
    else
    {
      console.log('thêm  thành công')

    }
  })
  res.redirect('/xemds')
});
module.exports = router;
