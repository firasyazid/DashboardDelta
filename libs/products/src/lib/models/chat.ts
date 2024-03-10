export class Chat {
    id?: string;
    content?: string;
    sender?: string;
    type?: MessageType;
     }

enum MessageType {
    CHAT,
    LEAVE,JOIN

      }