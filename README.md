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

1. Create a S3 bucket
2. Change the bucket name in index_test.js:4
3. Deploy the lambda
4. Create the S3 Event Source with your bucket name
5. `npm test` (optionally set AWS_PROFILE=[your_profile])
