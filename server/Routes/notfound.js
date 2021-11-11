const notfound =(req,res)=>{
res.status(404).send("Route doesn't exists")
}
module.exports ={notfound}