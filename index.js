var aws = require('aws-sdk');

exports.handler = function (event, context) {
  var convert = function(bucket, fileKey) {
    var s3 = new aws.S3({ signatureVersion: 'v4' }),
        Transform = require('stream').Transform,
        uppercase = new Transform({decodeStrings: false}),
        stream;
      uppercase._transform = function (chunk, encoding, done) {
        done(null, chunk.toUpperCase());
      };
      stream = s3.getObject({
        Bucket: bucket,
        Key: fileKey
      }).createReadStream();
      stream.setEncoding('utf8');
      stream.pipe(uppercase);
      s3.upload({
        Bucket: bucket,
        Key: fileKey.replace(/^in/, 'out'),
        Body: uppercase,
        ACL: 'private'
      }, context.done);
    },
    eventRecord = event.Records && event.Records[0];

  if (eventRecord) {
    if (eventRecord.eventSource === 'aws:s3' && eventRecord.s3) {
      convert(
        eventRecord.s3.bucket.name,
        eventRecord.s3.object.key
      );
    } else {
      context.fail('unsupported event source');
    }
  } else {
    context.fail('no records in the event');
  }
};
