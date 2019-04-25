import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import { database, auth, storage } from '../../firebase';
import Image from './Image';
import './Profile.less';

class Profile extends Component {
  state = {
    imageURL: null,
    loading: true,
  };
  componentDidMount() {
    database()
      .ref(`/users/${this.props.user.displayName}`)
      .on('value', (snapshot) => {
        this.props.update(snapshot.val());
        const imageURL = auth().currentUser.photoURL;
        if (imageURL) {
          this.setState({ loading: false, imageURL });
        }
        this.setState({ loading: false });
      });
  }
  SignOut = () => {
    auth().signOut();
  };
  handleUpload = async (e) => {
    const file = await e.target.files[0];
    const storageRef = storage()
      .ref(`/user-images/${this.props.user.username}`)
      .child(`${this.props.user.username}`);
    console.log(`${this.props.user.username}`);
    try {
      const upload = await storageRef.put(file, { contentType: file.type });
      const imageURL = await storageRef.getDownloadURL();
      const updateUser = await auth().currentUser.updateProfile({
        photoURL: imageURL,
      });
      this.setState({ imageURL });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { user, classes } = this.props;
    const { loading, imageURL } = this.state;
    return (
      <Card className="Profile">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Your Profile
          </Typography>

          {loading ? (
            <LinearProgress />
          ) : (
            <Fragment>
              <Image imageURL={imageURL} user={user} />
              <Typography variant="h5" component="h2">
                {user.username}
              </Typography>
              <Typography color="textSecondary">{user.name}</Typography>
              <Typography color="textSecondary">{user.email}</Typography>
            </Fragment>
          )}
        </CardContent>

        <CardActions>
          <Button type="file" onClick={this.SignOut} size="small">
            Log out
          </Button>
        </CardActions>
      </Card>
    );
  }
}
export default Profile;
