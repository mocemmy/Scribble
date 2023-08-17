export function findCurrShelf (shelfArr, bookId){
    for(const shelf of shelfArr){
      const found = shelf.books.find(book => +bookId === book.id)
      if(found) return shelf.shelf_type
    }
    return null
  }