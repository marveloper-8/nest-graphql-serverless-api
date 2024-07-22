import { registerAs } from "@nestjs/config"

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPRESS_IN,
  },
  aws: {
    region: process.env.AWS_REGION,
    dynamoDb: {
      tableName: process.env.DYNAMODB_TABLE,
    },
    sns: {
      topicArn: process.env.SNS_TOPIC_ARN,
    },
    sqs: {
      queueUrl: process.env.SQS_QUEUE_URL,
    },
    eventBridge: {
      busName: process.env.EVENT_BUS_NAME,
    }
  }
}))