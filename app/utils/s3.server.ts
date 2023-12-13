import { S3Client } from '@aws-sdk/client-s3';

const REGION = 'eu-north-1'; // Replace with your AWS region
const ACCESS_KEY_ID = 'AKIAREXNNHZUOXTM436A'; // Replace with your AWS access key ID
const SECRET_ACCESS_KEY = '/wFL7eUZ6NpqqDYBUc92wve1xBuMz9XtMb0/HLj7'; // Replace with your AWS secret access key

export const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});
