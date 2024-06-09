// import AWS from 'aws-sdk';

//   AWS.config.update({
//     accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
//     region: process.env.REACT_APP_AWS_S3_REGION
//   });

// // S3 객체 생성
// const s3 = new AWS.S3();

// // 이미지를 S3에 업로드하는 함수
// export const uploadToS3 = (image) => {
//   const imageName = `${Date.now()}-${image.name}`; // 이미지 파일 이름
//   // console.log("imageName", imageName);

//   const params = {
//     Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
//     Key: imageName,
//     Body: image,
//   };

//   return new Promise((resolve, reject) => {
//     s3.upload(params, (err, data) => {
//       if (err) {
//         console.error('S3에 저장 실패', err);
//         reject(err);
//       } else {
//         console.log('S3에 업로드 성공', data.Location);
//         resolve(data.Location);
//       }
//     });
//   });
// };