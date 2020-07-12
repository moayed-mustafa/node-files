

file = require('fs')
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

args = process.argv
path = args[2]
cat(path)
