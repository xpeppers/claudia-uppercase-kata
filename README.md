# claudia-uppercase-kata

Inspiration taken from [this article on claudiajs.com](https://claudiajs.com/tutorials/designing-testable-lambdas.html).

# Setup

## Requirements

- node (tested with Node.js 4.3)

## Instructions

```
npm install
```

## Create the Lambda

```
npm run create [-- --profile your-aws-profile]
```

## Create the S3 Event Source

Edit the bucket according to your configuration.

```
npm run add-s3-event-source -- --bucket YOUR_BUCKET_NAME --prefix inputfile [--profile your-aws-profile]
```

## Deploy the Lambda

```
npm run deploy [-- --profile your-aws-profile]
```

## Destroy the Lambda

```
npm run destroy [-- --profile your-aws-profile]
```


## Executing test

1. create a S3 bucket
2. change the bucket name in index_test.js
3. add `inputfile.txt` to bucket
4. `npm test` (optionally set AWS_PROFILE=[your_profile])
