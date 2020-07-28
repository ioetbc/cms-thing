import React, { Component } from 'react';
import logo from './logo.svg';
import { Octokit } from "@octokit/core";
import { Base64 } from 'js-base64';
import Trello from 'trello';

import './App.css';

class CMS extends Component {
  async componentDidMount() {
    // get file contents from github repo
    const octokit = new Octokit({ auth: '5d00d0ff68b35b476b45cba8af4e750b930a8fc1' });
    const fileContent = await octokit.request('GET /repos/ioetbc/email-trello-cms/contents/email.html', {
      owner: 'ioetbc',
      repo: 'email-trello-cms',
      path: 'email.html',
      type: 'public'
    });

    const buff = new Buffer(fileContent.data.content);
    const emailHtml = Base64.decode(fileContent.data.content)


    // console.log('fileContent', emailHtml)


    // convert html to markdown
    const turndownService = new window.TurndownService();
    const emailMarkdown = turndownService.turndown(emailHtml);
    // console.log('emailMarkdown', emailMarkdown)
    const JustTheEmailcontent = emailMarkdown.split('Hi there,')[1];

    // create trello card
    const trello = new Trello('c7a88a9d0ae5ab28abbe5527500ec6bd', 'a508fcfdad1e34e2e6b849a65594df307f509d1fb0e379654c26671ffa45beb9');

    if (emailMarkdown) {
      console.log('trello', trello)
      // trello.addCard('edit this email', JustTheEmailcontent, '5f2049ef1d997919333e725c',
      // function (error, trelloCard) {
      //   if (error) {
      //       console.log('Could not add card:', error);
      //       return false;
      //   }
      //   else {
      //       console.log('Added card:', trelloCard);
      //   }
      // });
    }

var WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
var BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';

var onBtnClick = function (t, opts) {
  console.log('Someone clicked the button');
};

trello.TrelloPowerUp.initialize({
  'board-buttons': function (t, opts) {
    return [{
      // we can either provide a button that has a callback function
      icon: {
        dark: WHITE_ICON,
        light: BLACK_ICON
      },
      text: 'Callback',
      callback: onBtnClick,
      condition: 'edit'
    }, {
      // or we can also have a button that is just a simple url
      // clicking it will open a new tab at the provided url
      icon: {
        dark: WHITE_ICON,
        light: BLACK_ICON
      },
      text: 'URL',
      condition: 'always',
      url: 'https://trello.com/inspiration',
      target: 'Inspiring Boards' // optional target for above url
    }];
  }
});





  }

  render() {
    return <p>heloo</p>
  }
}

export default CMS;
