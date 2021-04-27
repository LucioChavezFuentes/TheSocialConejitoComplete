//@ts-nocheck
//If you are gonna use TypeScript in Node, dont forget to install @types/node

import * as functions from 'firebase-functions';
import * as express from 'express';
import  * as formidable from 'formidable';
import * as multer from 'multer';
//var bodyParser = require('body-parser');
import {db, admin} from './util/admin';
const cors = require('cors');


const app = express();
app.use(cors());

//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());

//const multer  = require('multer');


/*const storage = multer.diskStorage({
    destination: './public/uploads/images',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + 
    path.extname(file.originalname));
    }
});*/

const upload = multer({des}).single('csv')
//Don't use 'firebase/app'
//TODO: Investigate why 'firebase/app' does not work here and why it works in UI Project
import {getAllScreams, postOneScream, getScream, postCommentOnScream, likeScream, unlikeScream, deleteScream, getAllScreamIds} from './handlers/screams';
import {signUp, login, uploadImage, addUserDetails, getAuthenticatedUser, getUserDetails, markNotificationsRead } from './handlers/users';
import { postFragment, uploadImageBusboy, uploadImageMulter } from './handlers/fragments';
import {firebaseAuth} from './util/firebaseAuth';



//Scream Routes
app.get('/screams', getAllScreams);
app.post('/scream', firebaseAuth, postOneScream );
app.get('/scream/:screamId', getScream);
app.delete('/scream/:screamId', firebaseAuth, deleteScream);
app.post('/scream/:screamId/comment', firebaseAuth, postCommentOnScream);
app.get('/scream/:screamId/like', firebaseAuth, likeScream);
app.get('/scream/:screamId/unlike', firebaseAuth, unlikeScream);


//Users Routes
app.post('/signup', signUp);
app.post('/login', login);
app.post('/user/image', firebaseAuth, uploadImage);
app.post('/user', firebaseAuth, addUserDetails);
app.get('/user', firebaseAuth, getAuthenticatedUser);
app.get('/user/:handle', getUserDetails);
app.post('/notifications',firebaseAuth, markNotificationsRead);

//Fragment for testing counter purposes
app.post('/fragment', postFragment);
//Get Scream IDS?
app.get('/screamIds', getAllScreamIds);
//Just to get an Idea about write and read stream for image upload
app.post('/uploadImage', function (req, res) {
    console.log(req.body);
    console.log(req.rawBody);
    var form = new formidable.IncomingForm();
    

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });


    console.log('No buenas')

    return res.json({reqBody: req.body})
});
app.post('/uploadImageBus', uploadImageBusboy);



app.post('/uploadImageMulter', function(req, res, next){

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            
            console.log(err)
            res.status(500).json({err})
          // A Multer error occurred when uploading.
        } else if (err) {

            console.log(err)
            res.status(500).json({err})
          // An unknown error occurred when uploading.
        }
    });
    console.log(req.body)
    const file = req.file
    console.log(file)
    //const filePath = req.file.path
    
        if(!req.file){
            console.error("file.path does not exist")
            return res.status(500).json({error: "file.path does not exist"})
        }

        admin.storage().bucket().upload(file.path).then(() => {
            return res.json({message: 'Image uploaded successfully'});
        })
        .catch((errUpload) => {
            console.error(errUpload);
            return res.status(500).json({error: "check the 'uploadImageNega' function in BackEnd pal"})
        })
})

//Makes /api url  and throught it you can manage the expresss modules
exports.api = functions.https.onRequest(app);

//This is only an alternative way to manage routes and  get firebase exactly wich endponint is executing instead of log an ambiguous 'api'
//Still need to test
/*const screams =  express.Router()
screams.get('/screams', getAllScreams)
exports.screams = functions.https.onRequest(screams)*/

exports.createNotificationOnLike = functions.firestore.document('likes/{id}')
    .onCreate((snapshot) => {
        return db.doc(`/screams/${snapshot.data()!.screamId}`).get()
            .then(docScream => {
                if(docScream.exists && docScream.data()!.userHandle !== snapshot.data()!.userHandle){
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: docScream.data()!.userHandle,
                        sender: snapshot.data()!.userHandle,
                        type: 'like',
                        read: false,
                        screamId: docScream.id

                    });
                } else {
                     console.error('Scream not found or User Like his own Scream')
                     return
                }          
            })
            .catch(error => 
                console.error(error)
                )
});

exports.deleteNotificationOnUnlike = functions.firestore.document('likes/{id}')
    .onDelete((snapshot) => {
        return db.doc(`/notifications/${snapshot.id}`)
            .delete()
            .catch((error) => {
                console.error(error)
                
            });
    });

exports.createNotificationOnComment = functions.firestore.document('comments/{id}')
    .onCreate((snapshot) => {
        return db.doc(`/screams/${snapshot.data()!.screamId}`).get()
            .then(docScream => {
                if(docScream.exists && docScream.data()!.userHandle !== snapshot.data()!.userHandle){
                    return db.doc(`/notifications/${snapshot.id}`).set({
                        createdAt: new Date().toISOString(),
                        recipient: docScream.data()!.userHandle,
                        sender: snapshot.data()!.userHandle,
                        type: 'comment',
                        read: false,
                        screamId: docScream.id

                    });
                } else {
                    console.error('Scream not found or User Comment his own Scream')
                    return
                }
                        
            })
            .catch(error => {
                console.error(error)
                
            })
})

exports.onUserImageChange = functions.firestore.document('users/{userId}')
        .onUpdate((change) => {
        const beforeUpdate = change.before.data()
        console.log({beforeUpdate});
        console.log(change.after.data());
        if(change.before.data()!.imageUrl !== change.after.data()!.imageUrl){
            console.log('image has changed');
            const batch = db.batch();

            return db.collection('screams').where('userHandle', '==', change.before.data()!.handle).get()
                .then(docScreams => {
                    docScreams.forEach(doc => {
                        const scream = db.doc(`/screams/${doc.id}`)
                        batch.update(scream, {userImage: change.after.data()!.imageUrl })
                    })
                    return batch.commit();
                })
        } else {
            return true
        }
    })

exports.onScreamDelete = functions.firestore.document('screams/{screamId}')
    .onDelete((snapshot, context) => {
        const screamId = context.params.screamId
        const batch = db.batch();

        return db.collection('comments').where('screamId', '==', screamId).get()
            .then((docScreams) => {
                docScreams.forEach(doc => {
                    batch.delete(db.doc(`comments/${doc.id}`))
                })
                return db.collection('likes').where('screamId', '==', screamId).get()
                    
            })
            .then((docLikes) => {
                docLikes.forEach(doc => {
                    batch.delete(db.doc(`/likes/${doc.id}`))
                })

                return db.collection('notifications').where('screamId', '==', screamId).get()
                
            })
            .then((docNotificatons) => {
                docNotificatons.forEach(doc => {
                    batch.delete(db.doc(`/notifications/${doc.id}`))
                })
                return batch.commit();

            })
            .catch(err => console.error(err))
    });