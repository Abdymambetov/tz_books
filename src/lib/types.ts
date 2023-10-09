export interface Book {
    id: number;
    name: string;
    description: string;
    authorId: string;
    reviewIds: string[];
  }
  
  export interface User {
    id: string;
    name: string;
  }
  
  export interface Review {
    id: string;
    userId: string;
    text: string;
  }
  
  export interface ReviewInformation {
    id: string;
    user: User;
    text: string;
  }
  
  export interface BookInformation {
    id: number;
    name: string;
    description: string;
    author: User;
    reviews: ReviewInformation[];
  }
  