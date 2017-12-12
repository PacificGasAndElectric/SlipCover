import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  saveDocument,
  removeDocument,
  updateStatus,
  updateSaveButton,
  selectBucket,
} from '../actions';
import updateJson from './updateJson';

const fileDownload = require('react-file-download');

/* eslint no-underscore-dangle: [2, { "allow": ["_id"] }] */

const IsJsonString = str => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

class Display extends Component {
  static get propTypes() {
    return {
      prop: PropTypes.object.isRequired,
      index: PropTypes.string.isRequired,
      removeJson: PropTypes.func.isRequired,
      //eslint-disable-next-line
      foundID: PropTypes.string,
    };
  }

  constructor(props) {
    super(props);
    this.editBtn = this.editBtn.bind(this);
    this.saveBtn = this.saveBtn.bind(this);
    this.cancelBtn = this.cancelBtn.bind(this);
    this.download = this.download.bind(this);
    this.removeBtn = this.removeBtn.bind(this);
    this.updateDocument = this.updateDocument.bind(this);
  }

  editBtn(id) {
    const status = true;
    this.props.updateStatus(status, id);
  }

  cancelBtn(id) {
    const status = false;
    this.props.updateStatus(status, id);
  }

  async updateDocument(editedDoc, docId) {
    await updateJson(
      this.props.storeData.selectBucket.bucket,
      this.props.storeData.dataReducer.data,
      editedDoc,
      docId,
    );
  }

  async saveBtn(id) {
    const status = false;
    const isJSON = IsJsonString(this.refs.newText.value);

    if (isJSON) {
      const newDoc = JSON.parse(this.refs.newText.value);
      const oldDoc = this.props.prop;

      await this.props.updateSaveButton(status, id);
      await this.props.saveDocument(id, newDoc, oldDoc); // IXAK check promise.all
      await this.updateDocument(newDoc, id);
    } else {
      alert('This is NOT accepable JSON format!');
    }
  }

  async removeBtn(id) {
    await this.props.removeJson(id);
    await this.props.removeDocument(id);
  }

  download() {
    fileDownload(JSON.stringify(this.props.prop, null, 2), 'filename.json');
  }

  renderNormal() {
    const id = this.props.prop._id;
    return (
      <div className="editBtnJsonList">
        {this.props.foundID === id ? (
          <pre id="highlightID">{`id: ${id}`}</pre>
        ) : (
          <pre>{`id: ${id}`}</pre>
        )}
        <button onClick={() => this.editBtn(id)} className="edit-button">
          Edit
        </button>
      </div>
    );
  }

  renderForm() {
    const id = this.props.prop._id;
    return (
      <div className="editBtnJsonList">
        <textarea
          ref="newText"
          id="enableTextArea"
          defaultValue={JSON.stringify(this.props.prop, null, 2)}
        />
        <button onClick={() => this.saveBtn(id)} className="save-button">
          Save
        </button>
        <button onClick={() => this.cancelBtn(id)} className="cancel-button">
          Cancel
        </button>
        <button onClick={() => this.removeBtn(id)} className="remove-button">
          Remove
        </button>
        <a>
          <button className="downloadBtn" onClick={() => this.download()}>
            Download
          </button>
        </a>
      </div>
    );
  }

  render() {
    if (this.props.storeData.dataReducer.status === true) {
      if (this.props.index === this.props.storeData.dataReducer.id) {
        return this.renderForm();
      }
    }
    return this.renderNormal();
  }
}

function mapStateToProps(state) {
  return {
    storeData: state,
  };
}

export default connect(mapStateToProps, {
  saveDocument,
  removeDocument,
  updateStatus,
  updateSaveButton,
  selectBucket,
})(Display);
