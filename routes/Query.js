/**
 * Created by Aditya on 6/1/2017.
 */
var client = require('redis').createClient(6379, 'r1.7m5dyg.ng.0001.use2.cache.amazonaws.com', {no_ready_check: true})
var async = require('async');

exports.QueryRetrieveFixed = function (req, res) {
    //The data is received on server side.It is further unpacked, and inserted in redis
    var CounterNumber = req.body[0].data1;

    var date = new Date();
    var CurrentTime = date.getTime();
    var PastTime1 = (CurrentTime - 3600000)
    var PastTime3 = (CurrentTime - 10800000)
    var PastTime6 = (CurrentTime - 21600000)
    var PastTime12 = (CurrentTime - 43200000)
    var PastTime24 = (CurrentTime - 86400000)
    var PastAllTime = 0

    var MyVar = [];

    async.series([

        function (callback) {
            client.ZCOUNT(CounterNumber, PastTime1, CurrentTime, function PastHour(err, reply) {
                if (err) console.log(err);
                else {
                    MyVar.push(reply);
                    callback();
                }
            });
        },

        function (callback) {
            client.ZCOUNT(CounterNumber, PastTime3, CurrentTime, function Past3Hours(err, reply) {
                if (err) console.log(err);
                else {
                    MyVar.push(reply);
                    callback();
                }
            });
        },

        function (callback) {
            client.ZCOUNT(CounterNumber, PastTime6, CurrentTime, function Past6Hours(err, reply) {
                if (err) console.log(err);
                else {
                    MyVar.push(reply);
                    callback();
                }
            });

        },

        function (callback) {
            client.ZCOUNT(CounterNumber, PastTime12, CurrentTime, function Past12Hours(err, reply) {
                if (err) console.log(err);
                else {
                    MyVar.push(reply);
                    callback();
                }
            });
        },

        function (callback) {
            client.ZCOUNT(CounterNumber, PastTime24, CurrentTime, function Past24Hours(err, reply) {
                if (err) console.log(err);
                else {
                    MyVar.push(reply);
                    callback();
                }
            });
        },

        function (callback) {
            client.ZCOUNT(CounterNumber, PastAllTime, CurrentTime, function AllTime(err, reply) {
                if (err) console.log(err);
                else {
                    MyVar.push(reply);
                    res.send(MyVar);
                    callback();
                }
            });
        }

    ], function (err) { //This function gets called after the 6 tasks have called their "task callbacks"
        if (err) return next(err);
    });

}

exports.QueryRetrieveDynamic = function (req, res) {

    var NumberOfHours = req.body[0].data1;//Number of Hours
    var CounterNumber = req.body[1].data2;//CounterNumber

    var date = new Date();
    var CurrentTime = date.getTime();
    var PastTime1 = (CurrentTime - (NumberOfHours * 3600000))
    var array = [];
    client.ZCOUNT(CounterNumber, PastTime1, CurrentTime, function (err, reply) {
        if (!err) {
            array.push(reply);
            res.status(200).send(array);
        }
    });
}


