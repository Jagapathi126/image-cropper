import React, { Component } from 'react';

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/v1/view').then(data => data.json()).then(data => {
      this.setState({ list: data });
    }).catch(console.log);
  }

  render() {
    return (
      this.state.list.map((l, i) => {
        return (
          <div key={i} >
            <a href = {`http://localhost:3000/images/${l}`}>
            <img style={{ width: '25%', height: '250px', display: 'block', float: 'left', padding: '10px' }} src={`http://localhost:3000/images/${l}`} />
            </a>
          </div>
        );
      })
    );
  }
}