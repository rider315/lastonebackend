



// const AWS = require('aws-sdk');
// const firebaseAdmin = require('firebase-admin');
// const fs = require('fs');
// require('dotenv').config();

// // Initialize S3
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   region: process.env.AWS_REGION, // Moved region to .env
// });

// // Initialize Firebase
// const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH); // Path from .env
// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   databaseURL: process.env.FIREBASE_DATABASE_URL, // Database URL from .env
// });



// /**
//  * Upload file to S3 with original file name
//  */
// const uploadToS3 = async (filePath, originalName, bucketName = process.env.AWS_BUCKET_NAME, folderName = '') => {
//   try {
//     // Read file content
//     const fileContent = fs.readFileSync(filePath);

//     // Construct S3 key (folder + original file name)
//     const s3Key = `${folderName}${originalName}`;

//     // S3 upload parameters
//     const params = {
//       Bucket: bucketName,
//       Key: s3Key,
//       Body: fileContent,
//     };

//     // Upload file to S3
//     const data = await s3.upload(params).promise();
//     console.log(`File uploaded successfully to ${data.Location}`);
//     return data.Location; // Return the file's public URL
//   } catch (error) {
//     console.error('Error uploading to S3:', error);
//     throw error;
//   }
// };

// /**
//  * Upload paper and save metadata
//  */
// exports.uploadPaper = async (req, res) => {
//   try {
//     const { title, type } = req.body;

//     // Access uploaded files
//     const file = req.files?.file?.[0];
//     const coverImage = req.files?.coverImage?.[0];

//     if (!file || !coverImage || !title || !type) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     // Upload files to S3 in "alllin" folder
//     const contentUrl = await uploadToS3(file.path, file.originalname, process.env.AWS_BUCKET_NAME, 'alllin/');
//     const coverUrl = await uploadToS3(coverImage.path, coverImage.originalname, process.env.AWS_BUCKET_NAME, 'alllin/');

//     // Prepare metadata in the desired format
//     const paperData = {
//       content: contentUrl,
//       cover: coverUrl,
//       title,
//       type,
//     };

//     // Save metadata to Firebase
//     const ref = firebaseAdmin.database().ref('books');
//     await ref.push(paperData);

//     // Respond with success
//     res.status(200).json({
//       message: 'Paper uploaded successfully',
//       data: paperData,
//     });
//   } catch (error) {
//     console.error('Error in uploadPaper:', error);
//     res.status(500).json({
//       message: 'Internal server error',
//       error: error.message,
//     });
//   }
// };


// const AWS = require('aws-sdk');
// const firebaseAdmin = require('firebase-admin');
// const fs = require('fs');
// require('dotenv').config();

// // Initialize S3
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   region: process.env.AWS_REGION, // Moved region to .env
// });

// // Initialize Firebase
// const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH); // Path from .env
// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   databaseURL: process.env.FIREBASE_DATABASE_URL, // Database URL from .env
// });

// /**
//  * Upload file to S3 with original file name
//  */
// const uploadToS3 = async (filePath, originalName, bucketName = process.env.AWS_BUCKET_NAME, folderName = '') => {
//   try {
//     // Read file content
//     const fileContent = fs.readFileSync(filePath);

//     // Construct S3 key (folder + original file name)
//     const s3Key = `${folderName}${originalName}`;

//     // S3 upload parameters
//     const params = {
//       Bucket: bucketName,
//       Key: s3Key,
//       Body: fileContent,
//     };

//     // Upload file to S3
//     const data = await s3.upload(params).promise();
//     console.log(`File uploaded successfully to ${data.Location}`);
//     return data.Location; // Return the file's public URL
//   } catch (error) {
//     console.error('Error uploading to S3:', error);
//     throw error;
//   }
// };

// /**
//  * Upload paper and save metadata
//  */
// exports.uploadPaper = async (req, res) => {
//   try {
//     const { title, type } = req.body;

//     // Access uploaded files
//     const file = req.files?.file?.[0];
//     const coverImage = req.files?.coverImage?.[0];

//     if (!file || !coverImage || !title || !type) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

//     // Upload files to S3 in "alllin" folder
//     const contentUrl = await uploadToS3(file.path, file.originalname, process.env.AWS_BUCKET_NAME, 'alllin/');
//     const coverUrl = await uploadToS3(coverImage.path, coverImage.originalname, process.env.AWS_BUCKET_NAME, 'alllin/');

//     // Prepare metadata in the desired format
//     const paperData = {
//       content: contentUrl,
//       cover: coverUrl,
//       title,
//       type,
//     };

//     // Save metadata to Firebase
//     const ref = firebaseAdmin.database().ref('books');
//     await ref.push(paperData);

//     // Respond with success
//     res.status(200).json({
//       message: 'Paper uploaded successfully',
//       data: paperData,
//     });
//   } catch (error) {
//     console.error('Error in uploadPaper:', error);
//     res.status(500).json({
//       message: 'Internal server error',
//       error: error.message,
//     });
//   }
// };

















const AWS = require('aws-sdk');
const firebaseAdmin = require('firebase-admin');
const fs = require('fs');
require('dotenv').config(); // Load environment variables from .env

// Initialize S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION, // Moved region to .env
});

// Initialize Firebase using environment variables
const firebaseConfig = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Ensure proper formatting of private key
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

// Validate required environment variables for Firebase credentials
const requiredFirebaseVars = [
  'FIREBASE_TYPE', 'FIREBASE_PROJECT_ID', 'FIREBASE_PRIVATE_KEY_ID', 'FIREBASE_PRIVATE_KEY',
  'FIREBASE_CLIENT_EMAIL', 'FIREBASE_CLIENT_ID', 'FIREBASE_AUTH_URI', 'FIREBASE_TOKEN_URI',
  'FIREBASE_AUTH_PROVIDER_X509_CERT_URL', 'FIREBASE_CLIENT_X509_CERT_URL'
];

for (let variable of requiredFirebaseVars) {
  if (!process.env[variable]) {
    throw new Error(`${variable} is not defined in .env`);
  }
}

// Initialize Firebase Admin SDK
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseConfig), // Use credentials from .env
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Database URL from .env
});

/**
 * Upload file to S3 with original file name
 */
const uploadToS3 = async (filePath, originalName, bucketName = process.env.AWS_BUCKET_NAME, folderName = '') => {
  try {
    // Read file content
    const fileContent = fs.readFileSync(filePath);

    // Construct S3 key (folder + original file name)
    const s3Key = `${folderName}${originalName}`;

    // S3 upload parameters
    const params = {
      Bucket: bucketName,
      Key: s3Key,
      Body: fileContent,
    };

    // Upload file to S3
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully to ${data.Location}`);
    return data.Location; // Return the file's public URL
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw error;
  }
};

/**
 * Upload paper and save metadata
 */
exports.uploadPaper = async (req, res) => {
  try {
    const { title, type } = req.body;

    // Access uploaded files
    const file = req.files?.file?.[0];
    const coverImage = req.files?.coverImage?.[0];

    if (!file || !coverImage || !title || !type) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Upload files to S3 in "alllin" folder
    const contentUrl = await uploadToS3(file.path, file.originalname, process.env.AWS_BUCKET_NAME, 'alllin/');
    const coverUrl = await uploadToS3(coverImage.path, coverImage.originalname, process.env.AWS_BUCKET_NAME, 'alllin/');

    // Prepare metadata in the desired format
    const paperData = {
      content: contentUrl,
      cover: coverUrl,
      title,
      type,
    };

    // Save metadata to Firebase
    const ref = firebaseAdmin.database().ref('books');
    await ref.push(paperData);

    // Respond with success
    res.status(200).json({
      message: 'Paper uploaded successfully',
      data: paperData,
    });
  } catch (error) {
    console.error('Error in uploadPaper:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
