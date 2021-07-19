require('../index').init();
let {db} = require('../index');
let ndb = db.instance('note');

async function main() {

    let rs = await Promise.all([
        ndb.add({title:"a",content:"a",viewCount: 2}),
        ndb.add({title:"b",content:"b"}),
        ndb.add({title:"c",content:"c"}),
        ndb.add({title:"d",content:"d",viewCount: 5}),
        ndb.add({title:"e",content:"e"}),
    ]);
    console.log(rs);
    let rs1 = await ndb.find({},{title:1},{viewCount: 1});
    console.log(rs1);
    let rs2 = await ndb.find({},'title content',{viewCount: -1},0,2);
    console.log(rs2);
}

main();
