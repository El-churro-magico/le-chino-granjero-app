export class Profile {
  cedula:number;
  name:String;
  lastName:String;
  province:String;
  canton:String;
  district:String;
  address:String;
  phoneN:number;
  userName:String;
  birthDate:String;
  notifications:{
    producerID:number,
    clientID:number,
    message:string,
    ID:number
  }[]
}
