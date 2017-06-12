/**
 * Created by Aditya on 6/7/2017.
 */
//var redis = require('redis');
var client = require('redis').createClient(6379, 'r1.7m5dyg.ng.0001.use2.cache.amazonaws.com', {no_ready_check: true})

exports.RedisInsert = function (req, res) {

    //the data is received on server side.It is further unpacked, and inserted in redis
    var CounterNumber = req.body[0].data1;//p1 is the counter number
    var ClickNumber = req.body[0].data2;//p2 is the Click number
    var TimeStamp = req.body[0].data3;//p3 is the timestamp

    //the data is arranged to be sent to redis
    var TimeStampFinal = (parseFloat(TimeStamp))

    /*The data is pushed into redis. We are using ZScore to store the data.*/
    client.ZADD(CounterNumber, TimeStampFinal, ClickNumber,  function (err, reply) {
        if (err) {
            res.status(400).send("bad request");
            console.log(err);
        }
        else {
            res.status(200).send("good request");
            console.log(reply);
        }
    });
}
