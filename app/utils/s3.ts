import AWS from "aws-sdk"
export async function  uploadToS3(file:File) {
    try {
        AWS.config.update({
            accessKeyId:process.env.S3_ACCESS_KEY_ID,
           secretAccessKey:process.env.S3_SECRET_ACCESS_KEY
        })
    } catch (error) {
        
    }
}