import React, { Component } from 'react';
import Constants from './Constants';
export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    fetch(`${Constants.endpoint}${Constants.viewURL}`).then(data => data.json()).then(data => {
      this.setState({ list: data });
    }).catch(console.log);
  }

  render() {
    return (
      this.state.list.map((l, i) => {
        return (
          <div key={i} >
            <a target="_blank" href={l}>
              <img style={{ width: '25%', height: '250px', display: 'block', float: 'left', padding: '10px' }}
                src={l} />
            </a>
          </div>
        );
      })
    );
  }
}