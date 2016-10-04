var aws = require('aws-sdk');
var assert = require('assert')

var event = {
  "Records": [
    {
      "eventSource": "aws:s3",
      "s3": {
        "bucket": {
          "name": "claudia-uppercase-test"
        },
        "object": {
          "key": "inputfile.txt"
        }
      }
    }
  ]
}

var handler = require("./index").handler

describe('Uppercase Bucket Stream', function(){
  it('saves uppercased output file on S3 Bucket', function(done){
    this.timeout(15000)

    handler(event, {
      done: function(err, data) {
        assert.equal(data.Bucket, "claudia-uppercase-test")
        assert.equal(data.Key, "outputfile.txt")
        assert.equal(data.Location, 'https://claudia-uppercase-test.s3.amazonaws.com/outputfile.txt')

        readS3Object(data.Bucket, data.Key, function(err, data) {
          assert.equal(err, null)
          assert.equal(data.Body.toString(), "LOREM IPSUM DOLOR SIT AMET.\n")
          done()
        })
      }
    })
  })
})


function readS3Object(bucket, key, callback) {
  var s3 = new aws.S3()

  var stream = s3.getObject({
    Bucket: bucket,
    Key: key
  }, callback)
}
