import {Injectable} from '@angular/core';
import {Task} from './elements';
import {UserService} from './user.service';

@Injectable()
export class TaskService {
    private tasks: Task[];
    constructor (
        private user: UserService
    ) {}
    getTask () {}
    addTask () {}
    getByFilter () {}
}
