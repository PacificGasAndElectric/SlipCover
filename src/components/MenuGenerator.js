import React from 'react';
import manifest from '../manifest.js';

export default ({
  bucketHandleChecked,
  selectBucket,
  searchHandleSubmit,
  searchHandleChange,
}) => (
  <div className="menuBar">
    <h1 className="header"> Sync-Gateway-SlipCover Open Source </h1>
    <div className="menuRow">
      {/* Buckets dropdown menu */}
      <div className="bucket-box">
        <select
          className="bucketSelectList"
          onChange={e => {
            bucketHandleChecked(e);
          }}
          value={selectBucket}
        >
          <option>-- Select Buckets --</option>
          {manifest.bucket.map(m => (
            <option key={m.toString()} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      {/* search document id */}
      <div className="search">
        <form className="inputBox" onSubmit={searchHandleSubmit}>
          <input
            className="label"
            type="text"
            name="name"
            placeholder="Document ID"
            onChange={searchHandleChange}
          />
          <input className="submit" type="submit" value="&#x1F50D; Search" />
        </form>
      </div>
    </div>
  </div>
);
