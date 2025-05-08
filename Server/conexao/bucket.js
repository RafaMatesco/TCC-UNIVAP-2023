const { S3Client } = require("@aws-sdk/client-s3");

const REGION = "sa-east-1"; 
//const ACCESS_KEY_ID = ''
//const SECRET_ACCESS_KEY = ''
const ACCESS_KEY_ID = ""
const SECRET_ACCESS_KEY = ""
const s3Client = new S3Client({ 
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
 });
module.exports =  { s3Client };