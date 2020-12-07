function write(data){
    const result = [];

    const headers = Object.keys(data[0]);

    let line = '|';

    for(const h of headers){
        line += h + '|';
    }

    result.push(line);

    for(const row of data){
        let line = '|';
        for(const h of headers){
            line += row[h] + ' |';
        }

        result.push(line);
    }

    return result;
}

module.exports = write;
