import React, { FC } from 'react'
import { BookInformation } from './lib/types'
const Card: FC<{book: BookInformation}> = ({book})=> {
    return (
        <div>
          <h3>{book.name}</h3>
          <p>
            <b>Автор</b>: {book.author.name}
          </p>
          <p>
            <b>Описание</b>: {book.description}
          </p>
          <p>
            <b>Отзыв: </b>
            {book.reviews.map((r) => `${r.text} (${r.user.name})`).join(", ") || "-"}
          </p>
        </div>
    )
}

export default Card