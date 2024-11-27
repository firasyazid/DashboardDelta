export class UserPushToken {
    userId: string;           
    expoPushToken: string;     
    lastUpdated?: Date;        
  }
  

  // notification.model.ts
export interface Notification {
  title: string;
  message: string;
}
