import Axios from 'Axios';
import { HOST } from './Constants';

export const axios = Axios.create({
    baseURL: HOST,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export const getTopics = (callback) => {
    axios.get('/api/topics', {})
    .then(response => {
        // Catch error
        if (response.data && response.data.error)
        console.log('Error getting Topics. ', response.data.error);

        callback(response.data.success);
    })
    .catch(e => {
        console.log('Error getting Topics. ', e);
    });
};

export const saveNewTopic = (title,callback) => {
    axios.post('/api/topics', {
        title
    })
    .then(response => {
        // if no err, do callback
        if (response.data && !response.data.error)
            callback(response.data.success);
        else
            console.log('Error adding new topic.');
    })
    .catch(e => {
        console.log('Error adding new topic.', e);
    });
};

export const updateTopic = (id,newVote,callback) => {
    axios.put(`/api/topics/${id}`, {
        newVote
    })
    .then(response => {
        // if no err, do callback
        if (response.data && !response.data.error)
            callback(response.data.success);
        else
            console.log('Error updating topic votes.');
    })
    .catch(ex => {
        console.log('Error updating topic votes.', ex);
    });
};
