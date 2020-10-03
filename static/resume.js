import React, { Component } from "react";
var __html = require('./resume.html.js');
var template = { __html: __html };

class Resume extends Component {
  render() {
    return (
      <div className="resume">
        <span dangerouslySetInnerHTML={template} />
      </div>
    );
  }
}
export default Resume;