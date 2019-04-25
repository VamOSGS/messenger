import React, { Component } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CircularProgress from '@material-ui/core/CircularProgress';
import { auth, storage } from '../../firebase';

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = { imageURL: props.imageURL, loadingImage: false, imageMenu: false };
    this.storageRef = storage().ref('/user-images');
  }
  handleUpload = async (e) => {
    const file = await e.target.files[0];
    if (file) {
      this.setState({ loadingImage: true, imageMenu: false });
      const storageRef = storage()
        .ref(`/user-images/${this.props.user.username}`)
        .child(`${this.props.user.username}-image`);
      try {
        const upload = await storageRef.put(file, { contentType: file.type });
        const imageURL = await storageRef.getDownloadURL();
        const updateUser = await auth().currentUser.updateProfile({
          photoURL: imageURL,
        });
        this.setState({ imageURL, loadingImage: false });
      } catch (error) {
        console.log(error);
      }
    }
  };
  deleteImage = async () => {
    if (this.state.imageURL) {
      this.setState({ loadingImage: true });
      const deleteImage = await this.storageRef
        .child(this.props.user.username)
        .child(`${this.props.user.username}-image`)
        .delete();
      const updateUser = await auth().currentUser.updateProfile({
        photoURL: null,
      });
      this.setState({ imageURL: null, loadingImage: false });
    }
  };
  handleOpen = () => {
    this.setState({ imageMenu: !this.state.imageMenu });
  };
  render() {
    const { imageURL, imageMenu, loadingImage } = this.state;
    return (
      <div className="Image">
        <CardActionArea onClick={this.handleOpen} className="profilePicture">
          <div className={`imageLoader ${loadingImage && 'loading'} ${imageMenu && 'dark'}`}>
            {loadingImage && <CircularProgress />}
          </div>
          {imageURL ? (
            <CardMedia component="img" image={imageURL} title="Profile picture" />
          ) : (
            'You dont have image'
          )}
        </CardActionArea>
        <CardActions className={`menu ${imageMenu && 'open'}`}>
          <input
            accept="image/*"
            onChange={this.handleUpload}
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
            <Button className="button" onClick={this.deleteImage} component="span" size="small">
              Delete Image
              <DeleteIcon />
            </Button>
          )}
        </CardActions>
      </div>
    );
  }
}
export default Image;
