import 'jsdom-global/register';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';
import { expect } from 'chai';
import TopicList from '../js/reactjs/Topic/TopicList';
import TopicItem from '../js/reactjs/Topic/TopicItem';

// configure adaptor for enzyme 
configure({ adapter: new Adapter() });

const sampleTopicArr = [
    {
        "_id": "Hy1O8LVR-",
        "title": "Hello",
        "imgSrc": "http://lorempixel.com/320/240/city/1",
        "createdDate": "2017-10-30T07:36:07.001Z",
        "votes": 0
    },
    {   "_id": "rk-zluVRW",
        "title":"test", 
        "imgSrc":"http://lorempixel.com/320/240/city/1",
        "createdDate":"2017-10-30T09:25:29.467Z",
        "votes":0
    }
];

describe('Topic Unit testing', () => {
    it('Testing TopicList', () => {
        const wrapper = mount(<TopicList />);
        wrapper.setState({ topics: sampleTopicArr });
        expect(wrapper.find('#topic-list').children()).to.have.length(sampleTopicArr.length);
    });

    it('Testing TopicItem', () => {
        const wrapper = mount(<TopicItem item={ sampleTopicArr[0] } />);
        expect(wrapper.find('.score').first().text()).to.equal(sampleTopicArr[0].votes.toString());
    });
});
