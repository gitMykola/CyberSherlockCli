import {Injectable} from '@angular/core';
import { Task , Media } from './elements';

@Injectable()
export class MapService {
    public tasks: Task[];
    public medias: Media[];
}