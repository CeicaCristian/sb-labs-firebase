import { Component, OnInit } from '@angular/core';
import {User} from "../interfaces/user";
import {FirestoreService} from "../services/firestore.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user:User={name:"",email:""};
  public users: User[]=[];
  public search: string="";

  constructor(private firestoreService:FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getAllUsersFromFirestore().subscribe((res:any)=>{
      this.users=res.map((item:any)=>{item.dateAdded=item.dateAdded.toDate(); return item});
    })
  }

  addUser(user:User){
    const id= new Date().getTime().toString();
    const data:User ={
      name: user.name,
      email:user.email,
      dateAdded:new Date(),
      id:id
    }

    this.firestoreService.addUserToFirestore(data, id).then((res:any)=>{
      console.log("User added");
    })
  }

}
