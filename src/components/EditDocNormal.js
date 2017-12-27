import React from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar';
import Delete from 'material-ui/svg-icons/action/delete';
import Download from 'material-ui/svg-icons/file/file-download';
import RaisedButton from 'material-ui/RaisedButton';

export default ({ id, rev, foundID, editBtn, removeBtn, download }) => (
  <div>
    {foundID === id ? (
      // color around the box if id found
      <Toolbar className="editBtnJsonListColorful">
        <ToolbarGroup firstChild>
          <pre>{`Document ID: ${id}`}</pre>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <RaisedButton
            backgroundColor="#2161c6"
            onClick={() => editBtn(id)}
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
              onClick={() => removeBtn(id, rev)}
            />
            <MenuItem
              leftIcon={<Download />}
              primaryText="Download"
              onClick={() => download}
            />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    ) : (
      // NO color around the box
      <Toolbar className="editBtnJsonList">
        <ToolbarGroup firstChild>
          <pre>{`Document ID: ${id}`}</pre>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <RaisedButton
            backgroundColor="#2161c6"
            onClick={() => editBtn(id)}
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
              onClick={() => removeBtn(id, rev)}
            />
            <MenuItem
              leftIcon={<Download />}
              primaryText="Download"
              onClick={() => download}
            />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    )}
  </div>
);
