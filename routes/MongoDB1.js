/**
 * Created by Aditya on 6/4/2017.
 */
var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/textmonkey";
var url = "mongodb://AdityaT101:kale123@ds053166.mlab.com:53166/textmonkey";
var client = require('redis').createClient(6379, 'r1.7m5dyg.ng.0001.use2.cache.amazonaws.com', {no_ready_check: true})



exports.RedisDelete = function (req, res)
{
    var p1 = req.body[0].data1;

   // client.ZRANGE(p1, 0, -1,Zrange)

    client.del(p1);res.status(200).send("done")

   /* function Zrange(err, reply)
    {
        if (!err)
        {
            for ( var i = 0 ; i <= (reply.length - 1); i++)
            {
                client.ZSCORE(p1, reply[i], ZrangeI);
                if(i == (reply.length - 1))
                    setTimeout(function () {client.del(p1);res.status(200).send("done")}, 250);
            }

        } else
            console.log(err);
    }

    function ZrangeI(err, reply)
    {
        if (!err)
        {
            console.log(reply);
            MongoClient.connect(url, function (err1, db)
            {
                if(!err1) {
                    db.collection('text').insertOne({counter: p1, time: reply}, MInsert);
                    db.close();
                }
                else
                    console.log(err1)
            });
        } else
            console.log(err);
    }

    function MInsert(err1)
    {
        if (err1) console.log(err1);
        else console.log("1 record inserted");
    }
*/
}
