import React, { Component } from 'react';
import logo from './logo.svg';
import { Octokit } from "@octokit/core";
import { Base64 } from 'js-base64';
import Trello from 'trello';

import './App.css';

class CMS extends Component {
  async componentDidMount() {
    // get file contents from github repo
    const octokit = new Octokit({ auth: process.env.REACT_APP_GITHUB_AUTH });
    const fileContent = await octokit.request('GET /repos/ioetbc/email-trello-cms/contents/email.html', {
      owner: 'ioetbc',
      repo: 'email-trello-cms',
      path: 'email.html',
      type: 'public'
    });
    const emailHtml = Base64.decode(fileContent.data.content)

    // convert html to markdown
    const turndownService = new window.TurndownService();
    const emailMarkdown = turndownService.turndown(emailHtml);
    // console.log('emailMarkdown', emailMarkdown)
    const JustTheEmailcontent = emailMarkdown.split('Hi there,')[1];

    // create trello card
    const trello = new Trello(process.env.REACT_APP_TRELLO_APP_KEY, process.env.REACT_APP_TRELLO_TOKEN);

    if (emailMarkdown) {
      console.log('trello', trello)
      trello.addCard('edit this email', JustTheEmailcontent, '5f2049ef1d997919333e725c',
      function (error, trelloCard) {
        if (error) {
            console.log('Could not add card:', error);
        }
        else {
            console.log('Added card:', trelloCard);
        }
      });
    }
  }

  render() {
    return <p>heloo</p>
  }
}

export default CMS;
