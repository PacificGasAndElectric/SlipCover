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
import jsonValidation from './validation/jsonValidation.js';

const fileDownload = require('react-file-download');

/* eslint no-underscore-dangle: [2, { "allow": ["_id", "_rev"] }] */
class Display extends Component {
  static get propTypes() {
    return {
      prop: PropTypes.object.isRequired,
      index: PropTypes.string.isRequired,
      removeJson: PropTypes.func.isRequired,
      updateJson: PropTypes.func.isRequired,
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
  }

  editBtn(id) {
    const status = true;
    this.props.updateStatus(status, id);
  }

  cancelBtn(id) {
    const status = false;
    this.props.updateStatus(status, id);
  }

  saveBtn(id, rev) {
    const status = false;
    const isJSON = jsonValidation(this.refs.newText.value);

    if (isJSON) {
      const newDoc = JSON.parse(this.refs.newText.value);
      const oldDoc = this.props.prop;

      this.props.updateSaveButton(status, id); // update store
      this.props.saveDocument(id, newDoc, oldDoc); // save doc in store
      this.props.updateJson(newDoc, id, rev); // request for PUT fetch
    }
  }

  removeBtn(id, rev) {
    this.props.removeJson(id, rev);
    this.props.removeDocument(id);
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
    const rev = this.props.prop._rev;
    return (
      <div className="editBtnJsonList">
        <textarea
          ref="newText"
          id="enableTextArea"
          defaultValue={JSON.stringify(this.props.prop, null, 2)}
        />
        <button onClick={() => this.saveBtn(id, rev)} className="save-button">
          Save
        </button>
        <button onClick={() => this.cancelBtn(id)} className="cancel-button">
          Cancel
        </button>
        <button
          onClick={() => this.removeBtn(id, rev)}
          className="remove-button"
        >
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
