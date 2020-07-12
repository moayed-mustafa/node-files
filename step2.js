
const file = require('fs')
const axios = require('axios').default

async function webCat(url) {

    try {
        let res = await axios.get(url)
        console.log(res)
    }
    catch (err) {
        console.log(err)
    }
}

    // webCat('http://rithmschool.com/no-such-path')


function cat(path) {
    // read the file
    file.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${path} \n` ,err)
            process.exit(1)
        }
        console.log(data)
    })
}

function processArgs() {
    args = process.argv
    path = args[2]
    if (path.slice(0, 4) == 'http') {
        console.log(path)
        webCat(path)
    }
    else {
        cat(path)
    }

}

processArgs()