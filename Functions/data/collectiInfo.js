const registerSchema = require(`${process.cwd()}/DataBase/registerSchema`);

async function collectInfo(id, dato){
    let info = await registerSchema.findOne({ _id: id });
    return info[`${dato}`];
}

module.exports = { collectInfo };