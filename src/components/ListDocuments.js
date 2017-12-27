import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import EditDocNormal from './EditDocNormal.js';
import EditDocForm from './EditDocForm.js';

import {
  saveDocument,
  tempDocument,
  removeDocument,
  updateStatus,
  updateSaveButton,
} from '../actions';
import jsonValidation from './validation/jsonValidation.js';
// import Card from './Card';
// import Snackbar from './Snackbar';

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
    this.documentHandleChange = this.documentHandleChange.bind(this);
  }

  editBtn(id) {
    const status = true;
    this.props.tempDocument(''); // reset it to empty in store
    this.props.updateStatus(status, id);
  }

  cancelBtn(id) {
    const status = false;
    this.props.tempDocument(''); // reset it to empty in store
    this.props.updateStatus(status, id);
  }

  saveBtn(id, rev) {
    const editedDoc = this.props.storeData.tempDocument;

    const status = false;
    const isJSON = jsonValidation(editedDoc);

    if (isJSON) {
      const newDoc = JSON.parse(editedDoc);
      const oldDoc = this.props.prop;

      confirmAlert({
        title: 'Confirm to submit', // Title dialog
        message: 'Are you sure to save the changes?', // Message dialog
        confirmLabel: 'Confirm', // Text button confirm
        cancelLabel: 'Cancel', // Text button cancel
        onConfirm: () => {
          this.props.updateSaveButton(status, id); // update store
          this.props.saveDocument(id, newDoc, oldDoc); // save doc in store
          this.props.updateJson(newDoc, id, rev); // request for PUT fetch
        },
        onCancel: () => {}, // Action after Cancel
      });
    }
  }

  removeBtn(id, rev) {
    confirmAlert({
      title: 'Confirm to submit', // Title dialog
      message: 'Are you sure to remove the document?', // Message dialog
      confirmLabel: 'Confirm', // Text button confirm
      cancelLabel: 'Cancel', // Text button cancel
      onConfirm: () => {
        this.props.removeJson(id, rev); // request for DELETE fetch
        this.props.removeDocument(id); // remove doc in store
      },
      onCancel: () => {}, // Action after Cancel
    });
  }

  download() {
    fileDownload(JSON.stringify(this.props.prop, null, 2), 'filename.json');
  }

  // push the changes into the store before updating doc
  documentHandleChange(e) {
    this.props.tempDocument(e.target.value);
    e.preventDefault();
  }

  render() {
    const { storeData } = this.props;
    if (storeData.dataReducer.status === true) {
      if (this.props.index === storeData.dataReducer.id) {
        return (
          <EditDocForm
            id={this.props.prop._id}
            rev={this.props.prop._rev}
            defaultValue={JSON.stringify(this.props.prop, null, 2)}
            documentHandleChange={this.documentHandleChange}
            saveBtn={this.saveBtn}
            cancelBtn={this.cancelBtn}
          />
        );
      }
    }
    return (
      <EditDocNormal
        id={this.props.prop._id}
        rev={this.props.prop._rev}
        foundID={this.props.foundID}
        editBtn={this.editBtn}
        removeBtn={this.removeBtn}
        download={this.download}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    storeData: state,
  };
}

export default connect(mapStateToProps, {
  saveDocument,
  tempDocument,
  removeDocument,
  updateStatus,
  updateSaveButton,
})(Display);
