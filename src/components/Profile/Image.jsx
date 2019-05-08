import React, { useState } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';
import { auth, database, storage } from '../../firebase';
import { useStateValue } from '../../context';

const Image = () => {
  const [loadingImage, setLoading] = useState(false);
  const [menu, toggleMenu] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const handleUpload = async (e) => {
    const file = await e.target.files[0];
    if (file) {
      setLoading(true);
      toggleMenu(false);
      const imageRef = storage()
        .ref(`/user-images/${user.username}`)
        .child(`${user.username}-image`);
      try {
        await imageRef.put(file, { contentType: file.type });
        const url = await imageRef.getDownloadURL();
        await auth().currentUser.updateProfile({
          photoURL: url,
        });
        await database()
          .ref('/users')
          .child(user.username)
          .set({ ...user, imageURL: url });
        if (!user.imageURL) {
          dispatch({ type: 'setUser', payload: { ...user, imageURL: url } });
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const deleteImage = async () => {
    if (user.imageURL) {
      setLoading(true);
      await storage()
        .ref('/user-images')
        .child(user.username)
        .child(`${user.username}-image`)
        .delete();
      await auth().currentUser.updateProfile({
        photoURL: null,
      });
      await database()
        .ref('/users')
        .child(user.username)
        .set({ ...user, imageURL: '' });
      setLoading(false);
    }
  };
  const handleOpen = () => {
    toggleMenu(!menu);
  };
  const { imageURL } = user;
  return (
    <div className="Image">
      <CardActionArea onClick={handleOpen} className="profilePicture">
        <div className={`imageLoader ${loadingImage && 'loading'} ${menu && 'dark'}`}>
          {loadingImage && <CircularProgress />}
        </div>
        {imageURL ? (
          <CardMedia component="img" image={imageURL} title="Profile picture" />
        ) : (
          'You dont have image'
        )}
      </CardActionArea>
      <CardActions className={`menu ${menu && 'open'}`}>
        <input
          accept="image/*"
          onChange={handleUpload}
          className="uploadInput"
          id="contained-button-file"
          multiple
          type="file"
        />
        <label className="button" htmlFor="contained-button-file">
          <Button component="span" size="small">
            {imageURL ? 'Change your image ' : 'Upload an image'} <CloudUploadIcon />
          </Button>
        </label>
        {imageURL && (
          <Button className="button" onClick={deleteImage} component="span" size="small">
            Delete Image
            <DeleteIcon />
          </Button>
        )}
      </CardActions>
    </div>
  );
};
export default Image;
