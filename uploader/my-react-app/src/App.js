import './App.css';
import {useState} from 'react';
import {storage}  from './firebase';

import {ProgressBar} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
const [image,setImage]=useState(null);
const [display,setdisplay]=useState(0);
const [progress,setProgress]=useState(null);
const [url,setUrl]=useState('');

const handleChange=(e)=>{
  const val=e.target.files[0]
  console.log(val);
  setImage(val)
}
async function copyUrl(){
  var promise = await navigator.clipboard.writeText(url);
}
const handleUpload=()=>{
var name=image?image.name.split('.').join('')+Date.now():null
if(name){
  const UploadTask=storage.ref(`image/${name}`).put(image);
  UploadTask.on(
    "state_changed",
    snapshot=>{
      setProgress(Math.round(snapshot.bytesTransferred/snapshot.totalBytes)*100)
      setdisplay(1)
    },
    error=>{
      console.log('error')
    },
    ()=>{
      storage.ref('image').child(name).getDownloadURL().then(url=>{setUrl(url)})
    }
  )
}
}

switch(display){
  case 0: return (
    <div className='center'>
     <input type='file' onChange={handleChange} className='file-input'/>
     <button onClick={handleUpload} className='btn-upload'>Upload</button>
    </div>
   );
   break;
  case 1: return (
  <div className='center'>
  <div className='progress-bar'>
   <ProgressBar now={progress} />
   {
     console.log(progress)
   }
   {
     progress==100?setdisplay(2):''
   }
  </div>
  </div>);break;
  case 2: return (<> 
  <div className='display_image_container'>
    <img src={url} className='img-display'/>
  </div>
  <div className='link'>
      <p className='link-val'>{url.substring(0,8)+'image'+'.com'}</p>
      <button className='link-btn' onClick={copyUrl}>Copy</button>
    </div>
  </>)
}
  return 
}

export default App;
