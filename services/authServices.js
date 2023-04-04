const db = require("../models/User");

const loginSuccessService = (id) => new Promise( async(resolve, reject) => {
    if(id){
        try{
            let response = await db.findOne({
                userId: id.userId
            })
            resolve(response)
        } catch (error){
            reject({
                err: 2,
                msg: 'Fail at auth server' + error
            })
        }
    }
})

module.exports = {
    loginSuccessService
}