import { Injectable } from "@nestjs/common";
import { EventBridge } from '@aws-sdk/client-eventbridge'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EventBusService {
  private eventBridge: EventBridge;

  constructor(private configService: ConfigService) {
    this.eventBridge = new EventBridge({
      region: this.configService.get<string>('AWS_REGION'),
    });
  }

  async publish(event: any): Promise<void> {
    const params = {
      Entries: [
        {
          Source: 'com.advancedapi.items',
          DetailType: event.constructor.name,
          Detail: JSON.stringify(event),
          EventBusName: this.configService.get<string>('EVENT_BUS_NAME'),
        },
      ],
    };

    await this.eventBridge.putEvents(params);
  }
}