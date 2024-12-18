


// const AWS = require('aws-sdk');
// const firebaseAdmin = require('firebase-admin');
// const fs = require('fs');
// require('dotenv').config(); // Load environment variables from .env

// // Initialize S3
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   region: process.env.AWS_REGION, // Moved region to .env
// });

// // Initialize Firebase using environment variables
// const firebaseConfig = {
//   type: process.env.FIREBASE_TYPE,
//   project_id: process.env.FIREBASE_PROJECT_ID,
//   private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//   private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Ensure proper formatting of private key
//   client_email: process.env.FIREBASE_CLIENT_EMAIL,
//   client_id: process.env.FIREBASE_CLIENT_ID,
//   auth_uri: process.env.FIREBASE_AUTH_URI,
//   token_uri: process.env.FIREBASE_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//   client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
// };

// // Validate required environment variables for Firebase credentials
// const requiredFirebaseVars = [
//   'FIREBASE_TYPE', 'FIREBASE_PROJECT_ID', 'FIREBASE_PRIVATE_KEY_ID', 'FIREBASE_PRIVATE_KEY',
//   'FIREBASE_CLIENT_EMAIL', 'FIREBASE_CLIENT_ID', 'FIREBASE_AUTH_URI', 'FIREBASE_TOKEN_URI',
//   'FIREBASE_AUTH_PROVIDER_X509_CERT_URL', 'FIREBASE_CLIENT_X509_CERT_URL'
// ];

// for (let variable of requiredFirebaseVars) {
//   if (!process.env[variable]) {
//     throw new Error(`${variable} is not defined in .env`);
//   }
// }

// // Initialize Firebase Admin SDK
// firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(firebaseConfig), // Use credentials from .env
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
// const { createCanvas } = require('canvas');  // Import canvas for image generation  
// require('dotenv').config(); // Load environment variables from .env  

// // Initialize S3  
// const s3 = new AWS.S3({  
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,  
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  
//     region: process.env.AWS_REGION,  
// });  

// // Initialize Firebase using environment variables  
// const firebaseConfig = {  
//     type: process.env.FIREBASE_TYPE,  
//     project_id: process.env.FIREBASE_PROJECT_ID,  
//     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,  
//     private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),  
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,  
//     client_id: process.env.FIREBASE_CLIENT_ID,  
//     auth_uri: process.env.FIREBASE_AUTH_URI,  
//     token_uri: process.env.FIREBASE_TOKEN_URI,  
//     auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,  
//     client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,  
// };  

// // Validate required environment variables for Firebase credentials  
// const requiredFirebaseVars = [  
//     'FIREBASE_TYPE',  
//     'FIREBASE_PROJECT_ID',  
//     'FIREBASE_PRIVATE_KEY_ID',  
//     'FIREBASE_PRIVATE_KEY',  
//     'FIREBASE_CLIENT_EMAIL',  
//     'FIREBASE_CLIENT_ID',  
//     'FIREBASE_AUTH_URI',  
//     'FIREBASE_TOKEN_URI',  
//     'FIREBASE_AUTH_PROVIDER_X509_CERT_URL',  
//     'FIREBASE_CLIENT_X509_CERT_URL'  
// ];  

// for (let variable of requiredFirebaseVars) {  
//     if (!process.env[variable]) {  
//         throw new Error(`${variable} is not defined in .env`);  
//     }  
// }  

// // Initialize Firebase Admin SDK  
// firebaseAdmin.initializeApp({  
//     credential: firebaseAdmin.credential.cert(firebaseConfig),  
//     databaseURL: process.env.FIREBASE_DATABASE_URL,  
// });  

// /**  
//  * Upload file to S3 with original file name  
//  */  
// const uploadToS3 = async (filePath, originalName, bucketName = process.env.AWS_BUCKET_NAME, folderName = '') => {  
//     try {  
//         const fileContent = fs.readFileSync(filePath);  
//         const s3Key = `${folderName}${originalName}`;  
//         const params = {  
//             Bucket: bucketName,  
//             Key: s3Key,  
//             Body: fileContent,  
//         };  
//         const data = await s3.upload(params).promise();  
//         console.log(`File uploaded successfully to ${data.Location}`);  
//         return data.Location;  
//     } catch (error) {  
//         console.error('Error uploading to S3:', error);  
//         throw error;  
//     }  
// };  

// /**  
//  * Generate cover image from form data  
//  */  
// const generateCoverImage = async ({ examName, subjectName, courseCode, slotNumber, programmeBranch, year }) => {  
//     const width = 940;  
//     const height = 788;  
//     const canvas = createCanvas(width, height);  
//     const ctx = canvas.getContext('2d');  

//     // Background color  
//     ctx.fillStyle = '#ffffff';  
//     ctx.fillRect(0, 0, width, height);  

//     // Set font styles and draw text  
//     ctx.font = 'bold 50px Arial';  
//     ctx.fillStyle = '#000000';  
//     ctx.fillText(examName, 50, 100);  
    
//     ctx.font = '30px Arial';  
//     ctx.fillText(subjectName, 50, 200);  
//     ctx.fillText(courseCode, 50, 300);  
//     ctx.fillText(`Slot-No: ${slotNumber}`, 50, 400);  
//     ctx.fillText(programmeBranch, 50, 600);  
//     ctx.fillText(year, 50, 700);  

//     // Save the image to a buffer  
//     const buffer = canvas.toBuffer('image/png');  
//     const coverImagePath = 'uploads/coverImage.png';  // Set path for temporary save  
//     fs.writeFileSync(coverImagePath, buffer);  
//     return coverImagePath;  // Return the path  
// };  

// /**  
//  * Upload paper and save metadata  
//  */  
// exports.uploadPaper = async (req, res) => {  
//     try {  
//         const { examName, subjectName, courseCode, slotNumber, programmeBranch, year } = req.body;  
//         const file = req.files?.file?.[0];  // Get the paper PDF  

//         if (!file || !examName || !subjectName || !courseCode || !slotNumber || !programmeBranch || !year) {  
//             return res.status(400).json({ message: 'All fields are required.' });  
//         }  

//         // Generate cover image from submitted data  
//         const coverImagePath = await generateCoverImage({ examName, subjectName, courseCode, slotNumber, programmeBranch, year });  

//         const contentUrl = await uploadToS3(file.path, file.originalname, process.env.AWS_BUCKET_NAME, 'alllin/');  
//         const coverUrl = await uploadToS3(coverImagePath, 'coverImage.png', process.env.AWS_BUCKET_NAME, 'alllin/');  

//         // Prepare paper data model  
//         const paperData = {  
//             content: contentUrl, // Link to the uploaded PDF  
//             cover: coverUrl,     // Link to the uploaded cover image  
//             title: subjectName,  // Title of the paper (subject name)  
//             type: 'pdf'          // Type of the file  
//         };  

//         const ref = firebaseAdmin.database().ref('books');  
//         await ref.push(paperData);  

//         res.status(200).json({ message: 'Paper uploaded successfully', data: paperData });  

//         // Cleanup: Remove the temporary cover image  
//         fs.unlinkSync(coverImagePath);  
//     } catch (error) {  
//         console.error('Error in uploadPaper:', error);  
//         res.status(500).json({ message: 'Internal server error', error: error.message });  
//     }  
// };













const AWS = require('aws-sdk');  
const firebaseAdmin = require('firebase-admin');  
const fs = require('fs');  
const { createCanvas } = require('canvas');  // Import canvas for image generation  
require('dotenv').config(); // Load environment variables from .env  
const { v4: uuidv4 } = require('uuid');


// Initialize S3  
const s3 = new AWS.S3({  
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,  
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  
    region: process.env.AWS_REGION,  
});  

// Initialize Firebase using environment variables  
const firebaseConfig = {  
    type: process.env.FIREBASE_TYPE,  
    project_id: process.env.FIREBASE_PROJECT_ID,  
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,  
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),  
    client_email: process.env.FIREBASE_CLIENT_EMAIL,  
    client_id: process.env.FIREBASE_CLIENT_ID,  
    auth_uri: process.env.FIREBASE_AUTH_URI,  
    token_uri: process.env.FIREBASE_TOKEN_URI,  
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,  
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,  
};  

// Validate required environment variables for Firebase credentials  
const requiredFirebaseVars = [  
    'FIREBASE_TYPE',  
    'FIREBASE_PROJECT_ID',  
    'FIREBASE_PRIVATE_KEY_ID',  
    'FIREBASE_PRIVATE_KEY',  
    'FIREBASE_CLIENT_EMAIL',  
    'FIREBASE_CLIENT_ID',  
    'FIREBASE_AUTH_URI',  
    'FIREBASE_TOKEN_URI',  
    'FIREBASE_AUTH_PROVIDER_X509_CERT_URL',  
    'FIREBASE_CLIENT_X509_CERT_URL'  
];  

for (let variable of requiredFirebaseVars) {  
    if (!process.env[variable]) {  
        throw new Error(`${variable} is not defined in .env`);  
    }  
}  

// Initialize Firebase Admin SDK  
firebaseAdmin.initializeApp({  
    credential: firebaseAdmin.credential.cert(firebaseConfig),  
    databaseURL: process.env.FIREBASE_DATABASE_URL,  
});  

/**  
 * Upload file to S3 with original file name  
 */  
const uploadToS3 = async (filePath, originalName, bucketName = process.env.AWS_BUCKET_NAME, folderName = '') => {  
    try {  
        const fileContent = fs.readFileSync(filePath);  
        const s3Key = `${folderName}${originalName}`;  
        const params = {  
            Bucket: bucketName,  
            Key: s3Key,  
            Body: fileContent,  
        };  
        const data = await s3.upload(params).promise();  
        console.log(`File uploaded successfully to ${data.Location}`);  
        return data.Location;  
    } catch (error) {  
        console.error('Error uploading to S3:', error);  
        throw error;  
    }  
};  

/**  
 * Generate cover image from form data  
 */  
/**  
 * Generate cover image from form data  
 */  
const generateCoverImage = async ({ examName, subjectName, courseCode, slotNumber, programmeBranch, year }) => {  
    const width = 940;  
    const height = 788;  
    const canvas = createCanvas(width, height);  
    const ctx = canvas.getContext('2d');  

    // Background color  
    ctx.fillStyle = '#ffffff';  
    ctx.fillRect(0, 0, width, height);  

    // Add stroke style for text visibility  
    ctx.fillStyle = '#000000'; // Set text color to black for visibility  

    // Function to center text  
    const centerText = (text, y, fontSize, isBold = false) => {  
        ctx.font = `${isBold ? 'bold' : ''} ${fontSize}px Arial`;  
        ctx.textBaseline = 'middle'; // Helps with centering the text vertically  
        const textWidth = ctx.measureText(text).width;  
        const x = (width - textWidth) / 2; // Center x-position  
        ctx.fillText(text, x, y);  
    };  

    // Set font sizes  
    const titleFontSize = 70; // Increased size for the exam name  
    const subtitleFontSize = 50; // Increased size for other details  

    // Draw the texts using the centering function  
    centerText(examName, 100, titleFontSize, true); // Bold for the exam name  
    centerText(subjectName, 200, subtitleFontSize);  
    centerText(courseCode, 300, subtitleFontSize);  
    centerText(`Slot-No: ${slotNumber}`, 400, subtitleFontSize);  
    centerText(programmeBranch, 600, subtitleFontSize);  
    centerText(year, 700, subtitleFontSize);  

    // Save the image to a buffer  
    const buffer = canvas.toBuffer('image/png');  
    const coverImagePath = 'uploads/coverImage.png';  // Set path for temporary save  
    fs.writeFileSync(coverImagePath, buffer);  
    return coverImagePath;  // Return the path  
};

/**  
 * Upload paper and save metadata  
 */  
exports.uploadPaper = async (req, res) => {  
    try {  
        const { examName, subjectName, courseCode, slotNumber, programmeBranch, year } = req.body;  
        const file = req.files?.file?.[0];  // Get the paper PDF  

        if (!file || !examName || !subjectName || !courseCode || !slotNumber || !programmeBranch || !year) {  
            return res.status(400).json({ message: 'All fields are required.' });  
        }  

        // Generate cover image from submitted data  
        const coverImagePath = await generateCoverImage({ examName, subjectName, courseCode, slotNumber, programmeBranch, year });  

        const contentUrl = await uploadToS3(file.path, file.originalname, process.env.AWS_BUCKET_NAME, 'alllin/');  

        // Generate a unique filename for the cover image  
        const uniqueCoverImageName = `coverImage-${uuidv4()}.png`; // Unique filename  
        const coverUrl = await uploadToS3(coverImagePath, uniqueCoverImageName, process.env.AWS_BUCKET_NAME, 'alllin/');  

        // Prepare paper data model  
        const paperData = {  
            content: contentUrl, // Link to the uploaded PDF  
            cover: coverUrl,     // Link to the uploaded cover image  
            title: subjectName,  // Title of the paper (subject name)  
            type: 'pdf'          // Type of the file  
        };  

        const ref = firebaseAdmin.database().ref('books');  
        await ref.push(paperData);  

        res.status(200).json({ message: 'Paper uploaded successfully', data: paperData });  

        // Cleanup: Remove the temporary cover image  
        fs.unlinkSync(coverImagePath);  
    } catch (error) {  
        console.error('Error in uploadPaper:', error);  
        res.status(500).json({ message: 'Internal server error', error: error.message });  
    }  
};  