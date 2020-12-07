const orgtable = require('../lib/index');

describe('test for reader', () => {
    test.skip('can read a line', () => {
        const line = '|abc|def|ghi|';
        const content = orgtable.read(line);

        expect(content.length).toEqual(1);
        expect(content).toEqual([['abc', 'def', 'ghi']]);
    });

    test('can read a two lines, and first line is header', () => {
        const lines = '|name|age|gender|\n|Nico|22|F|';
        const content = orgtable.read(lines);

        expect(content.length).toEqual(1);
        expect(content).toEqual([{
            name: 'Nico',
            age: '22',
            gender: 'F'
        }]);
    });

    test('can read a table with separators', () => {
        const lines = '|name|age|gender|\n|--|--|--|\n|Nico|22|F|';
        const content = orgtable.read(lines);

        expect(content.length).toEqual(1);
        expect(content).toEqual([{
            name: 'Nico',
            age: '22',
            gender: 'F'
        }]);
    });
});
