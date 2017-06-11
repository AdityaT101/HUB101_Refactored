/**
 * Created by Aditya on 6/4/2017.
 */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://AdityaT101:kale123@ds053166.mlab.com:53166/textmonkey";
var client = require('redis').createClient(6379, 'r1.7m5dyg.ng.0001.use2.cache.amazonaws.com', {no_ready_check: true})


exports.RedisDelete = function (req, res) {
    var p1 = req.body[0].data1;

    MongoClient.connect(url, function MInsrt1(err, db) {

        client.ZRANGE(p1, 0, -1, Zrange)

        function Zrange(err, reply) {
            if (!err) {
                for (var i = 0; i <= (reply.length - 1); i++) {
                    client.ZSCORE(p1, reply[i],MongoInsertRecords );
                    if (i == (reply.length - 1))setTimeout(function () {client.del(p1); res.status(200).send("done")}, 250);
                }
            } else
                console.log(err);
        }

        function MongoInsertRecords(err, reply1) {
            if (!err)
                db.collection('text').insertOne({counter: p1, time: reply1}, MongoInsertConf);
            else
                console.log(err);
        }

        function MongoInsertConf(err1) {
            if (err1) console.log(err1);
        }
    });
}