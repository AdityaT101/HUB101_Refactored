/**
 * Created by Aditya on 6/4/2017.
 */
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://AdityaT101:kale123@ds053166.mlab.com:53166/textmonkey";
var client = require('redis').createClient(6379, 'r1.7m5dyg.ng.0001.use2.cache.amazonaws.com', {no_ready_check: true})



//This is used to dump the data from Redis to MongoDB
exports.RedisDelete = function (req, res) {
    var CounterNumber = req.body[0].data1;

    MongoClient.connect(url, function MInsrt1(err, db) {

        //This function is used to get number of elements associated with key
        client.ZRANGE(CounterNumber, 0, -1, Zrange)

        function Zrange(err, reply) {
            if (!err) {
                for (var index = 0; index <= (reply.length - 1); index++) {
                    //Finding the ZScore of the element
                    client.ZSCORE(CounterNumber, reply[index], MongoInsertRecords);
                    if (index == (reply.length - 1)) setTimeout(function () {
                        client.del(CounterNumber);
                        res.status(200).send("done")
                    },100);
                }
            } else
                console.log(err);
        }

        //Inserting data in MongoDB
        function MongoInsertRecords(err, reply) {
            if (!err)
                db.collection('text').insertOne({counter: CounterNumber, time: reply}, MongoInsertConf);
            else
                console.log(err);
        }

        //Callback function
        function MongoInsertConf(err) {
            if (err) console.log(err);
        }
    });
}