import  {db, admin}  from '../util/admin'
import  * as formidable from 'formidable';
//const formidable = require('formidable');
//var multer  = require('multer')
import  * as Busboy from 'busboy';
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os'; 

export const postFragment = (req: any, res: any) => {
  if (req.body.body.trim() === '') {
       res.status(400).json({ body: 'Body must not be empty' });
       return
    }
  const newFragment = {
      body: req.body.body,
      no: admin.firestore.FieldValue.increment(1)
  }

  db.collection('fragments')
      .add(newFragment)
      .then( doc => {
          const resFragment: any = newFragment
          resFragment.screamId = doc.id;
          return res.json(resFragment);
      })
      .catch(error => {
          res.status(500).json({error: `check the 'createFragment' function in BackEnd pal`})
          console.error(error);
      })
};


export const uploadImageNega = (req: any, res: any) => {
    
    const form =  new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        console.log(fields)
        console.log('Buenas dentro parse')
        if (err) {
          return res.status(400).json({ error: err.message });
        }
    
        const [firstKey] = Object.keys(files);
        //@ts-ignore
        const fileImagePath = files[firstKey].path

        if(!fileImagePath){
            return res.status(500).json({error: "file.path does not exist"})
        }

        admin.storage().bucket().upload(fileImagePath).then(() => {
            return res.json({message: 'Image uploaded successfully'});
        })
        .catch((errUpload) => {
            console.error(errUpload);
            return res.status(500).json({error: "check the 'uploadImageNega' function in BackEnd pal"})
        })
    });

    console.log(form);

    return res.json({})
}

export const uploadImageBusboy = (req: any, res:any) => {
    //const BusBoy = require('busboy');
    //const path = require('path');
    //const os = require('os');
    //const fs = require('fs');
    console.log(req.body);
    /*There was indeed a breaking change in the Cloud Functions setup that triggered this issue. 
        It has to do with the way the middleware works that gets applied to all Express apps (including the default app) used to serve HTTPS functions. 
        Basically, Cloud Functions will parse the body of the request and decide what to do with it, leaving the raw contents of the body in a Buffer in req.rawBody. 
        You can use this to directly parse your multipart content, but you can't do it with middleware (like multer). 
        */
    console.log(req.rawBody);
    const busboy = new Busboy({headers: req.headers});

    let imageFileName : string;
    let imageToBeUploaded: any = {};

    busboy.on('file', (fieldname: string, file: NodeJS.ReadableStream, filename: string, encoding: string, mimetype: string) => {
        console.log(fieldname);
        console.log(filename);
        console.log(mimetype);
        console.log(os.tmpdir());
        if(mimetype !== 'image/jpeg' && mimetype !== 'image/png' ){
            return res.status(400).json({error: 'Wrong file type submitted'});
        }
        // my.image.png
        const imageExtension = filename.split('.')[filename.split('.').length - 1];

        imageFileName = `${Math.round(Math.random()*10000000000)}.${imageExtension}`;
        //tmpdir stands for "Temporary diectory"
        //This creates a temporary directory to store the file?
        const filePath = path.join(os.tmpdir() , imageFileName);
        
        imageToBeUploaded = {filePath, mimetype};
        //This creates the file?
        file.pipe(fs.createWriteStream(filePath));
    });

    busboy.on('field', (fieldname: string, val) => {
        console.log(fieldname);
        console.log(val)
    })

    busboy.on('finish', () => {
        admin.storage().bucket().upload(imageToBeUploaded.filePath,{
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
        .then(() => {
            return res.json({message: 'Image uploaded successfully'});
        })
        .catch(error => {
            console.error(error)
            return res.status(500).json({error: error.code})
        })
    })
    // The raw bytes of the upload will be in req.rawBody.  Send it to busboy, and get
        // a callback when it's finished.
    busboy.end(req.rawBody)
};

/*export const multerSpecs = (req: any, res: any, next) => {

}*/

export const uploadImageMulter = (req: any, res: any) => {

    const file = req.file
    console.log(file)
    //const filePath = req.file.path
    
        if(!req.file){
            return res.status(500).json({error: "file.path does not exist"})
        }

        admin.storage().bucket().upload(file.path).then(() => {
            return res.json({message: 'Image uploaded successfully'});
        })
        .catch((errUpload) => {
            console.error(errUpload);
            return res.status(500).json({error: "check the 'uploadImageNega' function in BackEnd pal"})
        })

}