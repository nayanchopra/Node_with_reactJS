if (process.env.NODE == "production"){
    // Export Production keys
    module.exports = require('./prod');
}else{
    //Export Development Keys
    module.exports = require('./dev');
}

