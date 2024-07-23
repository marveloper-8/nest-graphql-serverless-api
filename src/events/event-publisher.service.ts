import { Injectable } from "@nestjs/common";
import { SNS } from '@aws-sdk/client-sns'
import { SQS } from '@aws-sdk/client-sqs'
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EventPublisherService {
  private sns: SNS;
  private sqs: SQS;

  constructor(private configService: ConfigService) {
    this.sns = new SNS({ region: this.configService.get<string>('AWS_REGION') });
    this.sqs = new SQS({ region: this.configService.get<string>('AWS_REGION') });
  }

  async publishToSNS(message: string): Promise<void> {
    const params = {
      Message: message,
      TopicArn: this.configService.get<string>('SNS_TOPIC_ARN'),
    };

    await this.sns.publish(params);
  }

  async sendToSQS(message: string): Promise<void> {
    const params = {
      MessageBody: message,
      QueueUrl: this.configService.get<string>('SQS_QUEUE_URL'),
    };

    await this.sqs.sendMessage(params);
  }
}