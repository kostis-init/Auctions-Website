export class MessageModel {
  constructor(
    public senderId:number,
    public receiverId:number,
    public senderUsername:string,
    public seen:string,
    public receiverUsername:string,
    public text:string,
    public time:string,
    public id:number
  ){}
}
