'use strict';
var shortid = require('shortid');

let rank = [];
let topics = {};

exports["default"] = function(route) {
    route.route('/topics')

    // get all current topics
    .get(function(req,res){
        let first20
        
        // get first 20 if more than 20
        if (rank.length > 20) {
            // clone & slice rank arr
            first20 = rank.slice(0,20);
        } else {
            first20 = rank.slice();
        }
        
        // then populate id with actual obj
        let populated = first20.map(function(item,ind) {
            return topics[item];
        });

        res.json({ success: populated });
    })
    
    // save topics
    .post(function(req,res){
        console.log('query',req.body)
        let newTopic = {};
        let id = generateID();
        
        newTopic._id = id ;
        newTopic.title = req.body.title;
        newTopic.votes = 0;
        
        // save topics
        topics[id] = newTopic;
        // push to rank
        rank.push(id);

        res.json({ success: newTopic });
    });

    // upvote/downvote topics
    route.route('/topics/:id')
    .put(function(req,res){
        let id = req.params.id;
        let newVote = req.body.newVote;

        // cannot find id
        if (!(id in topics)) {
            res.json({ error: "Id does not exist" });
        } else {
            topics[id].votes = newVote;
            res.json({ success:  topics[id] });
        }
    });
}

// Check and rearrange rank according to vote
function checkAndSaveVote() {
}

function generateID() {
    let id;
    // ensure id is unique, if not generate until unique
    do {
        id = shortid.generate();
    } while(id in topics);

    return id;
}

module.exports = exports["default"];
