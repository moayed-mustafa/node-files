
const file = require('fs')
const axios = require('axios').default

// make a write function for testing purposes

function catWrite(writeTo, writeFrom) {
    data = []
    const options = { encoding: 'utf8', flag: 'a' }
    readStream = file.createReadStream(writeFrom)
    readStream.on('data', (chunk) => {
        data.push(chunk)
        console.log(data, chunk)
    })
    readStream.on('end', () => {
        let fileData = Buffer.concat(data).toString()
        // console.log('end: ', Buffer.concat(data).toString())
        file.writeFile(writeTo, fileData, options, (err) => {
            if (err) {
                console.log(err)
                process.exit(1)
            }

        })
    })
    readStream.on('error', (err) => {
        console.log('error: ', err)
    })
}

async function webCatWrite(writeTo, url) {
    const options = { encoding: 'utf8', flag: 'a' }

    webData =  await webCat(url)
        file.writeFile(writeTo, webData, options, (err) => {
            if (err) {
                console.log(err)
                process.exit(1)
            }

        })
}

async function webCat(url) {

    try {
        let res = await axios.get(url)
        return res.data
    }
    catch (err) {
        console.log(err)
    }
}

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
    let args = process.argv
    let len = args.length

    if (len == 3) {
        args[len -1].slice(0,4) == 'http' ? webCat(args[len -1]) : cat(args[len -1])
    }
    if (len == 5 && args[2] === '--out') {
        args[len -1].slice(0,4) == 'http' ? webCatWrite(args[3], args[4]) : catWrite(args[3], args[4])
    }
}

processArgs()

