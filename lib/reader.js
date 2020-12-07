const fs = require('fs');
const _ = require('lodash');

function readHeaders(line){
    const charLength = line.length;

    const headers = [];

    let current = '';
    for(let i = 0; i < charLength; i++){
        if(line[i] == '|'){
            if(current){
                headers.push(_.camelCase(current.trim()));
            }

            current = '';
        } else {
            current+= line[i];
        }
    }

    if(current){
        headers.push(_.camelCase(current.trim()));
    }

    return headers;
}

function readBody(line, headers){
    const charLength = line.length;

    const body = [];

    let current = '';
    for(let i = 0; i < charLength; i++){
        if(line[0] == '|' && line[1] == '-')
        {
            return;
        }

        if(line[i] == '|'){
            if(current){
                body.push(current.trim());
            }

            current = '';
        } else {
            current+= line[i];
        }
    }

    if(current){
        body.push(current.trim());
    }

    const result = {};

    for(let i = 0; i < headers.length; i++){
        result[headers[i]] = body[i];
    }

    return result;
}

function read(content){
    const lines = content.split('\n');

    const result = [];
    const lineCount = lines.length;

    let headers;

    for(let i = 0; i < lineCount; i++){
        if(i == 0){
            headers = readHeaders(lines[i]);
        } else {
            const body = readBody(lines[i], headers);
            if(body){
                result.push(body);
            }
        }
    }

    return result;
}

function readFromFile(filename){
    const content = fs.readFileSync(filename, {encoding: 'utf-8'});
    return read(content);
}

module.exports = {
    read,
    readFromFile
};
