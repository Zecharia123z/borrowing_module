import Dexie, { Table } from 'dexie';
import { populate } from './populate';

export interface Item {
  id?: number;
  name: string;
  description: string;
  status: 'AVAILABLE' | 'BORROWED' | 'DONATED' | 'DELETED' | 'BORROW_PENDING' | 'RETURN_PENDING' | 'UNAVAILABLE',
  created_at: string;
  updated_at: string;
  note?: string;
}

export interface Borrow_Transaction {
    id?: number;
    status: 'APPROVED' | 'DELETED' | 'PENDING_BORROW' | 'PENDING_RETURNED' | 'RETURNED' | 'REJECTED';
    borrow_date: string;
    return_date: string;
    created_at: string;
    name: string;
    description: string;
    updated_at: string;
    item_id: number;
    student_id: number;
    first_name: string;
    last_name: string;
}

export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  type: 'STUDENT' | 'LAB_TECH' | 'ADMIN' | string,
  password: string;
  created_at: string;
  updated_at: string;
}

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>
};


export interface Return_Request {
  id?: number;
  status: 'APPROVED' | 'DELETED',
  item_id: number;
}

export class MySubClassedDexie extends Dexie {
  item!: Table<Item>; 
  borrow_transaction!: Table<Borrow_Transaction>;
  user!: Table<User>;
  return_request!: Table<Return_Request>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      item: '++id, status', // Primary key and indexed props
      borrow_transaction: '++id, student_id, status',
      user: '++id',
      return_request: '++id',
    });
  }
}

export const db = new MySubClassedDexie(); 

db.on('populate', populate);