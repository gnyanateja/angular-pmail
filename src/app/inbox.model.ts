export interface Inbox {
  sender_email: String;
  recieved_content: String;
  recieved_subject: String;
  trash: Boolean;
  seen: Boolean;
  unseen: Boolean;
  date: Date;
  starred: Boolean;
  reply: Boolean;

}
