import { User } from '../models/User.model';
import { Subject } from 'rxjs';

export class UserService {
    private users: User[] = [
        new User('Will', 'Alexander', 'will@ta', 'vodka', ['coder', 'café']),
        new User('John', 'Snow', 'iknownothing@north.west', 'mother of dragon milk', ['kill people and UD'])
    ]; 
    
    userSubject = new Subject<User[]>(); 

    emitUsers() {
        this.userSubject.next(this.users.slice());
    }

    addUser(user: User) {
        this.users.push(user); 
        this.emitUsers(); 
    }
}