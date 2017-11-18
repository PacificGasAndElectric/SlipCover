import React, { Component } from 'react';
import * as queryString from 'query-string';
import ReactPaginate from 'react-paginate';
import Display from './Display.js'
import './App.css';
import {
  Button,
  ButtonGroup,
  DropdownButton,
  MenuItem
} from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      allKeys: [],
      currentPage: 1,
      rowsPerPage: 25,
      pageCount: 0, //Required. The total number of pages.
      //pageRangeDisplayed: 5, //Required. The range of pages displayed.
      // marginPagesDisplayed: 2, //Required. The number of pages to display for margins
      value: '',
      bucket: ['beer-sample'],
      selectedBucket: ''
    };
    this.updateJson = this.updateJson.bind(this);
    this.channelHandleChecked = this.channelHandleChecked.bind(this);
    this.bucketHandleChecked = this.bucketHandleChecked.bind(this);
  }

  componentWillMount() {
    this.getAllAvailableKeys();
  }

  async getAllAvailableKeys() {
    try {
      const res = await fetch('http://localhost:4984/beer-sample/_all_docs?access=false&include_docs=false', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw Error('bad ID\'s fetch');
    const json = await res.json();
    const trueResult = json.rows.map(element => element.id);

    const newState = this.state;
    newState.pageCount = Math.ceil(trueResult.length/this.state.rowsPerPage);
    newState.allKeys = trueResult;
    this.setState(newState);

    console.log('this.state.pageCount: ', this.state.pageCount);
    return Promise.resolve(trueResult);
    } catch (err) {
      console.log(err);
    }
  }

  async channelHandleChecked() {
    console.log(`Grabbing ${this.state.selectedChannel} channel`);
    console.log(' CURRENT PAGE: ' + this.state.currentPage);

    const startIdx = (this.state.currentPage - 1) * (this.state.rowsPerPage) + 1;
    const endIdx = (this.state.currentPage) * (this.state.rowsPerPage) + 1;

    try {
      const params = {
        include_docs: true,
        keys: JSON.stringify(this.state.allKeys.slice(startIdx, endIdx )),
      };
      const res = await fetch(`http://localhost:4984/beer-sample/_all_docs?access=false&${queryString.stringify(params)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw Error('bad data fetch');
    const json = await res.json();
    const trueResult = json.rows.map(element => element.doc);

    this.setState({ data: trueResult });
    return Promise.resolve(trueResult);
    } catch (err) {
      console.log(err);
    }
  }

  async updateJson(editedDoc, docId){
    const arr = this.state.data;
    let doc = ''
    arr.find((newDoc, i) => {
      if (newDoc._id === docId) {
        arr[i] = JSON.parse(editedDoc);
        arr[i].name = 'ixak';
        arr[i].updated = new Date().toJSON();
        doc =  arr[i];
        return true; // stop searching
      }
      return false;
    });
    console.log('doc before update in sync-gateway: ', doc);
    try{
      const params = {
        new_edits: true,
        rev: doc._rev,
      };;
      const res = await fetch(`http://localhost:4984/beer-sample/${doc._id}?${queryString.stringify(params)}`, {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doc),
      });
      if (!res.ok) throw Error('bad data fetch');
      this.channelHandleChecked();
    }catch (err){
      console.log(err);
    }
  }

  bucketHandleChecked(event) {
    const newState = this.state;
    newState.selectedBucket = event.target.value;
    this.setState(newState, () => {
      console.log('selectedBucket: ', this.state.selectedBucket);
    });
    this.channelHandleChecked();
  }

  handlePageClick = (data) => {
    const currentPage = (data.selected + 1);
    this.setState({currentPage: currentPage}, () => {
      this.channelHandleChecked();
    });
  };

  render() {
    return (
      <div>
        <h1 className="header"> Sync-Gateway-LazyBoy Open Source </h1>
        <div className="menuBar">
          {/* Buckets dropdown menu */}
          <div className="bucket-box">
              <select
                className="bucketSelectList"
                onChange={(e) => {
                  this.bucketHandleChecked(e);
                }}
                value={this.state.selectedBucket.value}
              >
                <option key='default'>-- Select Buckets --</option>
                {this.state.bucket.map(m => (
                  <option key={m.toString()} value={m}>{m}</option>
                ))}
              </select>
          </div>
        </div>
        <div>
          <ReactPaginate previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="">...</a>}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>

        <div>
          {this.state.data.map((object, i) => {
            if (this.state.selectedBucket){
              return (
                <Display
                  key={object._id}
                  index={object._id}
                  prop={object}
                  updateJson={this.updateJson}
                />
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default App;
