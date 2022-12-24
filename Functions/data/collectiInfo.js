const registerSchema = require(`${process.cwd()}/DataBase/registerSchema`);

async function collectInfo(id, dato){
    let info = await registerSchema.findOne({ _id: id });

    if(dato){
        return info[`${dato}`];
    } else{
        return info
    }
}

module.exports = { collectInfo };