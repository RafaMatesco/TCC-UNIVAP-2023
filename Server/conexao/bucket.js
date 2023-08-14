const { S3Client } = require("@aws-sdk/client-s3");

const REGION = "sa-east-1"; 
const ACCESS_KEY_ID = 'AKIAWJ5445KM2PM745NV'
const SECRET_ACCESS_KEY = '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'

const s3Client = new S3Client({ 
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
 });
module.exports =  { s3Client };