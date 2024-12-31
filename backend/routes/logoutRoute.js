const express=require("express");
const app = express();
const {Router}=require("express");
const router=Router();
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
router.use(cookieParser()) ;

router.get("/", (req,res)=>{ //for logout token reset kr r bs
    res.cookie("token","");
    res.redirect('http://localhost:5173/');
})

module.exports=router;