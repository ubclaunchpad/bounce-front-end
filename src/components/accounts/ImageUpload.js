/* eslint-disable no-unused-vars */

import React, { Component } from 'react';
/* eslint-enable no-unused-vars */


class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        };
    }

    fileChangedHandler(event) {
        console.log(event.target.files[0]);
        this.setState({selectedFile: event.target.files[0]});
    }

    //fileUploadHandler = () => {

    //}




    render() {
        return (
            <div className='container'>
                <input type="file" onChange={this.fileChangedHandler}/>
                {/* <button onClick={this.fileUploadHandler}>Upload</button> */}
            </div>
        );
    }
}
export default ImageUpload;
