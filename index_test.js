var aws = require('aws-sdk');
var assert = require('assert')

var bucketName = "claudia-uppercase-test"
var inputFileName = "inputfile.txt"
var outputFileName = "outputfile.txt"


describe('Uppercase Bucket Stream', function(){
  it('converts inputfile to uppercase and writes to outputfile', function(){
    this.timeout(30000)

    var inputContent = "lorem ipsum dolor sit amet."
    var uppercasedContent = "LOREM IPSUM DOLOR SIT AMET."

    return deleteS3Object(bucketName, inputFileName)
    .then(() => deleteS3Object(bucketName, outputFileName))
    .then(() => putS3Object(bucketName, inputFileName, inputContent))
    .then(() => waitUntilS3ObjectExists(bucketName, outputFileName))
    .then((data) => {
      assert.equal(data.Body.toString(), uppercasedContent)
    })
  })
})


function deleteS3Object(bucket, key) {
  var s3 = new aws.S3({ signatureVersion: 'v4' })

  return new Promise((resolve, reject) => {
    console.log('-- delete s3 object', bucket, key)
    s3.deleteObject({
      Bucket: bucket,
      Key: key,
    }, (err, data) => err ? reject(err) : resolve(data) )
  })
}

function putS3Object(bucket, key, body) {
  var s3 = new aws.S3({ signatureVersion: 'v4' })
  return new Promise((resolve, reject) => {
    console.log('-- put s3 object', bucket, key)
    s3.putObject({
      Bucket: bucket,
      Key: key,
      Body: body
    }, (err, data) => err ? reject(err) : resolve(data) )
  })
}

function readS3Object(bucket, key) {
  var s3 = new aws.S3({ signatureVersion: 'v4' })

  return new Promise((resolve, reject) => {
    console.log('-- read s3 object', bucket, key)
    var stream = s3.getObject({
      Bucket: bucket,
      Key: key
    }, (err, data) => err ? reject(err) : resolve(data) )
  })
}

function waitUntilS3ObjectExists(bucket, key) {
  return new Promise((resolve, reject) => {
    var retries = 0
    var intervalId = setInterval(() => {
      console.log('-- waiting until s3 object exists', bucket, key)
      readS3Object(bucket, key)
      .then((data) => {
        resolve(data)
        clearInterval(intervalId)
      })
      .catch(() => {
        console.log('-- retries', retries)
        if(retries > 10) {
          reject(new Error(`file (${key}) not found in bucket (${bucket})`))
          clearInterval(intervalId)
        }
      })
      retries++
    }, 1000)
  })
}
