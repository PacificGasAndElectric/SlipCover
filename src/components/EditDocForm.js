import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';

export default ({
  id,
  rev,
  defaultValue,
  documentHandleChange,
  saveBtn,
  cancelBtn,
}) => (
  <div className="editBtnJsonList">
    <textarea
      className="enableTextArea"
      defaultValue={defaultValue}
      onChange={documentHandleChange}
    />
    <RaisedButton
      backgroundColor="Green"
      label={<span className="save-button">Save</span>}
      onClick={() => saveBtn(id, rev)}
    />
    <RaisedButton
      backgroundColor="Blue"
      label={<span className="cancel-button">Cancel</span>}
      onClick={() => cancelBtn(id)}
    />
  </div>
);
