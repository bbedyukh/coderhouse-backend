import admin from 'firebase-admin'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const serviceAccount = require('../dao/db/coderhouse-backend-c42df-firebase-adminsdk-ob0wj-b0e65398f3.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.proyect_id}.firebaseio.com`
})

export default class FirebaseContainer {
  constructor () {
    this.db = admin.firestore()
  }
}
