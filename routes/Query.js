/**
 * Created by Aditya on 6/1/2017.
 */
//var redis = require('redis');
 var client = require('redis').createClient(6379, 'r1.7m5dyg.ng.0001.use2.cache.amazonaws.com', {no_ready_check: true})


exports.QueryRetrieve = function (req, res) {
    //The data is received on server side.It is further unpacked, and inserted in redis
    var p1 = req.body[0].data1;

    var d = new Date();
    var CurrentTime = d.getTime();
    var PastTime1 = (CurrentTime - 3600000)
    var PastTime3 = (CurrentTime - 10800000)
    var PastTime6 = (CurrentTime - 21600000)
    var PastTime12 = (CurrentTime - 43200000)
    var PastTime24 = (CurrentTime - 86400000)
    var PastAllTime = 0

    var MyVar = [];

    client.ZCOUNT(p1, PastTime1, CurrentTime, PastHour);


    function PastHour(err, reply) {
        if (!err) console.log("Past 1 hour :- " + reply);
        MyVar.push(reply);
        if(reply)client.ZCOUNT(p1, PastTime3, CurrentTime, Past3Hours);
    }

    function Past3Hours(err, reply) {
        if (!err) console.log("Past 3 hours :- " + reply);
        MyVar.push(reply);
        if(reply)client.ZCOUNT(p1, PastTime6, CurrentTime, Past6Hours);
    }

    function Past6Hours(err, reply) {
        if (!err) console.log("Past 6 hours :- " + reply);
        MyVar.push(reply);
        if(reply) client.ZCOUNT(p1, PastTime12, CurrentTime, Past12Hours);

    }

    function Past12Hours(err, reply) {
        if (!err) console.log("Past 12 hours :- " + reply);
        MyVar.push(reply);
        if(reply)client.ZCOUNT(p1, PastTime24, CurrentTime, Past24Hours);

    }

    function Past24Hours(err, reply) {
        if (!err) console.log("Past 24 hours :- " + reply);
        MyVar.push(reply);
        if(reply)client.ZCOUNT(p1, PastAllTime, CurrentTime, AllTime);

    }

    function AllTime(err, reply) {
        if (!err) console.log("Past All Time :- " + reply);
        MyVar.push(reply);
        res.send(MyVar);
    }

}


exports.QueryRetrieve1 = function (req, res) {

    var p1 = req.body[0].data1;//Number of Hours
    var p2 = req.body[1].data2;//CounterNumber

    var d = new Date();
    var CurrentTime = d.getTime();
    var PastTime1 = (CurrentTime - (p1 * 3600000))
    var a = [];
    client.ZCOUNT(p2, PastTime1, CurrentTime, function (err, reply) {
        if (!err) console.log("Past " + p1 + " hours :- " + reply);
        a.push(reply);
        res.status(200).send(a);

    })

}



