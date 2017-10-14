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
        let newTopic = {};
        let id = generateID();
        
        newTopic._id = id ;
        newTopic.title = req.body.title;
        newTopic.imgSrc = "http://lorempixel.com/320/240/city/" + (rank.length + 1);
        newTopic.createdDate = new Date();
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
            checkVote(id);

            res.json({ success:  topics[id] });
        }
    });
}

// Check and rearrange rank according to vote
function checkVote(topicId,index) {
    // Check if index of topic in rank array is provided, if not get index
    if (!index) {
        index = rank.indexOf(topicId);
    }

    console.log('index',index);

    // Prev topic relative to current
    let prevIndex = index - 1;
    let prevTopicId = rank[prevIndex];
    // Next topic relative to current
    let nextIndex = index + 1;
    let nextTopicId = rank[nextIndex];
    
    // current topic more than prev, swap
    //console.log('testing index', index, ' & curr vote > prev vote : ',(topics[topicId].votes > topics[prevTopicId].votes));
    if ((prevIndex != -1) && (topics[topicId].votes > topics[prevTopicId].votes)) {
        console.log('prevIndex',prevIndex);
        rank.swap(index,prevIndex);
        // check if we need to propagate shift
        checkVote(prevTopicId,prevIndex);

    // current topic less than next, swap
    } else if ((nextIndex != rank.length) && (topics[topicId].votes < topics[nextTopicId].votes)) {
        console.log('nextIndex',nextIndex);
        rank.swap(index,nextIndex);
        checkVote(nextTopicId,nextIndex);
    }

    return;
}

function generateID() {
    let id;
    // ensure id is unique, if not generate until unique
    do {
        id = shortid.generate();
    } while(id in topics);

    return id;
}

Array.prototype.swap = function (x,y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
}

module.exports = exports["default"];
