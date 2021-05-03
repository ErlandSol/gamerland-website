var express = require('express');
var router = express.Router();
const util = require("minecraft-server-util");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/mc/server/status", async function(req,res) {
  updateServerData()
  .then(response=>{
    res.status(200).send(response);
  })
  .catch(error=>{
    res.status(500).send(error);
  })
})


function updateServerData(){
  return new Promise((resolve, reject)=>{

    util.status('mc.gamerland.no')
    .then(response=>{
      console.log(response)
      if(response) {
        resolve(response);
      }
    })
    .catch(error=>{
      reject(error);
    })
  })
}


module.exports = router;
