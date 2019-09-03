/* eslint-disable jsx-a11y/alt-text */
// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'dgqjgpfjc';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dgqjgpfjc/upload';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: '',
      uploadedFile: null,
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
        console.log(response)
      }
    });
  }

  render() {
    
    return (
      <form>
        <div className="FileUpload" style={{backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '25%', padding: 20, margin: 10}}>
          <Dropzone
            multiple={false}
            onDrop={this.onImageDrop.bind(this)}>
            {({ getRootProps, getInputProps }) => {
              return (
                <div
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  {
                    <p>Try dropping some files here, or click to select files to upload.</p>
                  }
                </div>
              )
            }}
          </Dropzone>
        </div>

        <div>
          {this.state.uploadedFileCloudinaryUrl === '' ? null :
            <div>
              <p>{this.state.uploadedFile.name}  {this.state.uploadedFile.length}</p>
              <img src={this.state.uploadedFileCloudinaryUrl} />
            </div>}
        </div>
      </form>
    );
  }
}
