# carousell-interview-reddit
Reddit clone for Carousell coding challenge

## Local Setup
Clone git to local
```
https://github.com/jomaint/carousell-interview-reddit.git
```

Install package.json @ backend/frontend folder
```
npm install
```

Backend API tests (backend folder)
```
npm test
```  

Frontend Unit tests (frontend folder)
```
npm test
```  


Start local server (backend folder)
```
npm start
```  

Visit frontend web
```
http://localhost:8000
```

## Front-end
The front-end stack uses the following:
- React
- Bootstrap
- Sass
- Gulp


## Back-end
The backend stack uses the following:
- node.js
- Express

### Topic data structure
The current topics are stored in memory using two variables:
- `rank` is an array storing the topic id in decreasing order.
- `topics` is a object that uses the topic id as key, storing the topic data as a value.

This way of normalising and storing the topics allows ease of retrieving top 20, simply slicing `rank` array . Rearrangement of topics during change of vote, we can simply shift, swap, remove any topic without moving the entire data object. We can also access any topic via its id, without having to iterate throught the entire array if we were to store all topics in one variable. Based on the assumption where a topic page is accessed directly, and we have a large number of topics, iterating through an array is not feasible, this data structure would help get a constant access time.

### Topic API
#### Getting list of top 20 Topics
/GET `/api/topics`

#### Adding new Topic
/POST `/api/topics`

| key | type |
| ------ | ------ |
| title | string |

#### Upvoting / Downvoting  Topic
/PUT `/api/topics/:topicId`

| key | type |
| ------ | ------ |
| newVote | Integer |

Each newVote (upvoting/downvoting) is updating the existing vote with the new vote.
After which the rearrangement of `rank` array take place. First locating the index of the target topic in `rank`.
Then check if
- the updated vote is smaller than the next topic
- the updated vote is larger than the prev topic

If so, run the function recursively to check in the same direction, until we find a final place for the updated topic. This implementation would be far more efficient than iterating through the whole array sorting it again. Since right when the `rank` array is empty, we hav e been maintaining the order, we can safely assume that if the updated vote is smaller than the next, we can swap position and check the next and so forth.
