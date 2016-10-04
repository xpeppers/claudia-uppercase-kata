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

## Deploy the Lambda

```
npm run deploy [-- --profile your-aws-profile]
```

## Destroy the Lambda

```
npm run destroy [-- --profile your-aws-profile]
```


## Executing test

1. create a bucket named `claudia-uppercase-test`
2. add `inputfile.txt` to bucket
3. `npm test` (optionally set AWS_PROFILE=[your_profile])
