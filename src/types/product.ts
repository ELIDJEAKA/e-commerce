import { User } from './user';
import {Document } from 'mongoose'

export interface Product extends Document{
    owner:User;
    title:string;
    description:string;
    price:string;
    created:Date;
}