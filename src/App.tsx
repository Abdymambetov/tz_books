import "./styles.css";
import {
  Book,
  BookInformation,
  Review,
  ReviewInformation,
  User
} from "./lib/types";
import { getBooks, getUsers, getReviews } from "./lib/api";
import { useEffect, useState, FC } from "react";
import Card from "./Card";

const toReviewInformation = (
  review: Review,
  users: User[]
): ReviewInformation => {
  const userName = users.find((user) => review.userId === user.id);

  return {
    id: review.id,
    user: userName || {id: "", name: ""},
    text: review.text
  };
};

const toBookInformation = (
  book: Book,
  users: User[],
  reviews: Review[]
): BookInformation => {
  const autorName = users.find((user) => user.id === book.authorId);

  const infoAllREviews = reviews.map((review) => 
    toReviewInformation(review, users)
  );
  const contentIdBook = infoAllREviews.filter(
    (review) => review.id === book.reviewIds[0]
  );

  return {
    id: book.id,
    name: book.name || 'Книга без названия',
    author: autorName || {id: "", name: "Неизвестный автор"},
    reviews: contentIdBook ? contentIdBook : [],
    description: book.description,
  }
}

const App: FC =() => {
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try{
        const [fetchedBooks, fetchedUsers, fetchedReviews] = await Promise.all([
          getBooks(),
          getUsers(),
          getReviews(),
        ]);
        setBooks(fetchedBooks);
        setUsers(fetchedUsers)
        setReviews(fetchedReviews)

      } catch(e){
        alert(`Book not found ${e}`)
      } finally{
        setIsLoading(false)
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Мои книги:</h1>
      {isLoading && <div>Загрузка...</div>}
      {!isLoading &&
        books.map((b) => (
          <Card key={b.id} book={toBookInformation(b, users, reviews)} />
        ))}
    </div>
  );
}

export default App;
