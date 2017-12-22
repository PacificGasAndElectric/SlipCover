import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import Delete from 'material-ui/svg-icons/action/delete';
import Download from 'material-ui/svg-icons/file/file-download';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import {
  saveDocument,
  removeDocument,
  updateStatus,
  updateSaveButton,
  selectBucket,
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
        this.props.removeJson(id, rev);
        this.props.removeDocument(id);
      },
      onCancel: () => {}, // Action after Cancel
    });
  }

  download() {
    fileDownload(JSON.stringify(this.props.prop, null, 2), 'filename.json');
  }

  renderNormal() {
    const id = this.props.prop._id;
    const rev = this.props.prop._rev;
    return (
      <Toolbar className="editBtnJsonList">
        <ToolbarGroup firstChild>
          {this.props.foundID === id ? (
            <pre className="highlightID">{`Document ID: ${id}`}</pre>
          ) : (
            <pre>{`Document ID: ${id}`}</pre>
          )}
        </ToolbarGroup>
        <ToolbarGroup>
          {/* <ToolbarTitle text="Options" /> */}
          <ToolbarSeparator />
          <RaisedButton
            backgroundColor="#2161c6"
            onClick={() => this.editBtn(id)}
            label={<span className="edit-button">Edit</span>}
          />

          <IconMenu
            iconButtonElement={
              <IconButton touch>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem
              leftIcon={<Delete />}
              primaryText="Remove"
              onClick={() => this.removeBtn(id, rev)}
            />
            <MenuItem
              leftIcon={<Download />}
              primaryText="Download"
              onClick={() => this.download()}
            />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }

  renderForm() {
    const id = this.props.prop._id;
    const rev = this.props.prop._rev;

    return (
      <div className="editBtnJsonList">
        <textarea
          ref="newText"
          className="enableTextArea"
          defaultValue={JSON.stringify(this.props.prop, null, 2)}
        />
        <RaisedButton
          backgroundColor="Green"
          label={<span className="save-button">Save</span>}
          onClick={() => this.saveBtn(id, rev)}
        />
        <RaisedButton
          backgroundColor="Blue"
          label={<span className="cancel-button">Cancel</span>}
          onClick={() => this.cancelBtn(id)}
        />
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
