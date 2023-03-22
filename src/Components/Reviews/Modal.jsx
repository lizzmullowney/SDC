import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import Upload from './Upload.jsx';
import Sizes from './Sizes.jsx';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Modal = (props) => {
  const [modalRating, setModalRating] = useState(0);
  const [modalSummary, setModalSummary] = useState('');
  const [modalBody, setModalBody] = useState('');
  const [modalRecommend, setModalRecommend] = useState(null);
  const [modalUsername, setModalUsername] = useState('');
  const [modalCharacteristics, setModalCharacteristics] = useState({});
  const [modalEmail, setModalEmail] = useState('');
  const [modalPhoto, setModalPhoto] = useState([]);
  const [value, setValue] = useState(null);
  const [hover, setHover] = useState(-1);

  const handlesubmit = (e) => {
    e.preventDefault();
    if (typeof modalRecommend === 'string' && modalRecommend === 'No') {
      props.setRecommend(false);
    } else {
      props.setRecommend(true);
    };
    props.setForm(true);
    alert("Submission Successful!");
  }

  const uploadphoto = (photos) => {
    setModalPhoto(photos);
    props.setPhotos(photos);
  }

   const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? 's' : ''}, ${rlabels[value]}`;
  }

  const rlabels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  }


  const handleCharacteristics = (id, value) => {
    setModalCharacteristics({...modalCharacteristics, [id]:value});
    props.setCharacteristics({...modalCharacteristics, [id]:value});
  }

  return (
    <div className="modal" style={{ display: props.show ? 'block' : 'none' }}>
    <div className="overlay" onClick={props.closeModal}>      <IconButton aria-label="delete">
        <AcUnitIcon />
      </IconButton></div>
    <div className="modalContent">
      <form onSubmit={handlesubmit}>

      <div>
        <div className="startrating" > Your rating for this product: </div>
        <div className='ratebar'>
       <Rating name="simple-controlled" value={value} precision={1}
        getLabelText={getLabelText} onChange={(event, newvalue)=>{setModalRating(newvalue); props.setRating(newvalue); setValue(newvalue);}}         onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}/>
      {value !== null && (
        <Box sx={{ ml: 2 }}>{rlabels[hover !== -1 ? hover : value]}</Box>
      )}</div>

      </div>

      <div>
          <label>
            {/* Summary:
            <input
            onChange={(e)=>{setModalSummary(e.target.value); props.setSummary(e.target.value);}}
            type="text"
            maxLength="60"
            placeholder="Tell us about your experience"
            value={modalSummary}
            required
            /> */}
            <div className="modalSummary"> <TextField
          id="outlined-required"
          label="Suammry"
          placeholder="Tell us about your experience"
          sx={{width: '400px'}}
          onChange={(e)=>{setModalSummary(e.target.value); props.setSummary(e.target.value);}}
          value={modalSummary}
          required
        />
        </div>
           <div className="modalBody">
          <TextField
          id="outlined-multiline-static"
          label="Body"
          multiline
          rows={4}
          sx={{width: '400px'}}
          placeholder="Tell us about your experience"
          onChange={(e)=>{setModalBody(e.target.value); props.setBody(e.target.value);}}
          value={modalBody}
          required
        />
        </div>

          </label>
        </div>

        <div className="selec">
          <label>
            {/* <input
            onChange={(e)=>{setModalBody(e.target.value); props.setBody(e.target.value);}}
            type="text"
            maxLength="1000"
            placeholder="Tell us about your experience"
            value={modalBody}
            required
            /> */}
                  <Sizes handleCharacteristics={handleCharacteristics} reviewStars={props.reviewStars}/>
                  <div className="recom2">
        Recommend?:
          <label>
            <input
            onChange={(e)=>{setModalRecommend(e.target.value); }}
            type="radio"
            name="radioBut"
            value='Yes'
            required
            />
            Yes
          </label>
          <label>
            <input
            onChange={(e)=>{setModalRecommend(e.target.value); }}
            type="radio"
            name="radioBut"
            value='No'
            required
            />
            No
          </label>
        </div>

          </label>
        </div>



        <div className="startrating">Upload Photos:</div>
          <Upload photos={modalPhoto} upload={uploadphoto} />

        <div className="startrating">
          {/* <label>
            Name:
            <input
            onChange={(e)=>{setModalUsername(e.target.value); props.setUsername(e.target.value);}}
            type="text"
            maxLength="60"
            placeholder="Your Name"
            value={modalUsername}
            required
            />
          </label> */}

          <TextField
          id="outlined-required"
          label="Name"
          placeholder="Your Name"
          sx={{width: '200px'}}
          onChange={(e)=>{setModalUsername(e.target.value); props.setUsername(e.target.value);}}
          value={modalUsername}
          required
        />
        </div>

        <div className="startrating">
          {/* <label>
            Email:
            <input
            onChange={(e)=>{setModalEmail(e.target.value); props.setEmail(e.target.value);}}
            type="email"
            placeholder="Your Email"
            value={modalEmail}
            />
          </label> */}
          <TextField
          id="outlined-required"
          label="Email"
          placeholder="Your Email"
          sx={{width: '200px'}}
          onChange={(e)=>{setModalEmail(e.target.value); props.setEmail(e.target.value);}}
          value={modalEmail}
          required
        />
        </div>

        <input
              className="modalBar modalSubmit"
              type="submit"
              value="Submit"
              messsage='Submission Sucessful'
            />
      </form>
      {/* <button title="Close" className="closeModal" onClick={props.closeModal} >close</button> */}
    </div>
  </div>
  );
}
export default Modal;
