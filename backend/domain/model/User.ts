export class User{
    readonly name: string
    readonly id?:number
    readonly role?:string
    readonly telNr:string  
    readonly mail: string
    readonly password: string

  constructor(user:{
    name: string,  
    telNr: string,  
    mail: string, 
    password: string,
    id?: number, 
    role?: string,}
) {
  this.id=user.id;
  this.name=user.name;
  this.role = user.role;
  this.telNr=user.telNr;
  this.mail=user.mail;
  this.password=user.password;
  } 
}