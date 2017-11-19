import React, { Component } from 'react';
import PropTypes from 'prop-types';
let fileDownload = require('react-file-download');

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
    };
    this.editBtn = this.editBtn.bind(this);
    this.saveBtn = this.saveBtn.bind(this);
    this.cancelBtn = this.cancelBtn.bind(this);
    this.noSubmit = this.noSubmit.bind(this);
    this.yesSubmit = this.yesSubmit.bind(this);
    this.download = this.download.bind(this);    
  }

  static get propTypes() {
    return {
      prop: PropTypes.object.isRequired,
      index: PropTypes.string.isRequired,
      updateJson: PropTypes.func.isRequired,
      foundID: PropTypes.string.isRequired,
    };
  }

  IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  
  editBtn() {
    this.setState({ status: true });
  }

  cancelBtn() {
    const newState = this.state;
    newState.status = false;
    newState.confirm = false;
    this.setState(newState);
  }

  saveBtn() {
    const jsonStatus = this.IsJsonString(this.refs.newText.value);
    if (jsonStatus) {
      this.setState({ confirm: true });
      document.getElementById('enableTextArea').disabled = true;
    } else {
      alert('This is NOT accepable JSON format!');
    }
  }

  submit() {
    if (this.state.confirm === true) {
      return (
        <div id="id_confrmdiv">
          Do you want to write the changes to Sync-gateway?
          <button id="id_truebtn" onClick={this.yesSubmit}>
            Yes
          </button>
          <button id="id_falsebtn" onClick={this.noSubmit}>
            No
          </button>
        </div>
      );
    }
    return false;
  }

  yesSubmit() {
    console.log('yes submit with id: ', this.props.index);
    const newState = this.state;
    this.props.updateJson(this.refs.newText.value, this.props.index);
    newState.status = false;
    this.setState(newState);
  }

  noSubmit() {
    console.log('no submit clicked');
    document.getElementById('enableTextArea').disabled = false;
    const newState = this.state;
    newState.state = false;
    newState.confirm = false;
    newState.status = false;
    this.setState(newState);
  }

  download() {
    fileDownload(JSON.stringify(this.props.prop, null, 2), 'filename.json');
  }

  // colorful border if id found
  viewerBox(){
    let viewerBox = '';
    if (this.props.foundID === this.props.prop._id){
      console.log('id found in search: ', this.props.foundID);      
      viewerBox = (
        <pre id="highlightID">{`id: ${this.props.prop._id}`}</pre>
      );
    }else {
      viewerBox = (
        <pre>{`id: ${this.props.prop._id}`}</pre>        
      );
    }
    return viewerBox;
  }


  renderNormal() {
    return (
      <div className="editBtnJsonList">
        {this.viewerBox()}
        <button onClick={this.editBtn} className="edit-button">
          Edit
        </button>
      </div>
    );
  }

  renderForm() {
    return (
      <div className="editBtnJsonList">
        <textarea
          ref="newText"
          id="enableTextArea"
          defaultValue={JSON.stringify(this.props.prop, null, 2)}
        />
        <button onClick={() => this.saveBtn()} className="save-button">
          Save
        </button>
        {this.submit()}
        <button onClick={this.cancelBtn} className="cancel-button">
          Cancel
        </button>
        <a>
          <button className="downloadBtn" onClick={() => this.download()}>Download</button>
        </a>
      </div>
    );
  }

  render() {
    if (this.state.status) {
      return this.renderForm();
    }
    return this.renderNormal();
  }
}

export default Display;
