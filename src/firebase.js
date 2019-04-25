import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './fbConfig';

firebase.initializeApp(config);

export default firebase;

export const { database } = firebase;
