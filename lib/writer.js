function write(data){
    const headers = Object.keys(data[0]);

    let line = '|';

    for(const h of headers){
        line += h + '|';
    }

    console.log(line);

    for(const row of data){
        let line = '|';
        for(const h of headers){
            line += row[h] + ' |';
        }

        console.log(line);
    }
}

module.exports = write;
