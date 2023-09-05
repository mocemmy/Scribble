from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_reviews():
    def generate_unique_random_numbers():
        # Generate 5 unique random numbers between 6 and 56
        unique_numbers = random.sample(range(6, 57), 5)
        print(unique_numbers)
        return unique_numbers
    nums = generate_unique_random_numbers()
    reviews = [
        Review(book_id=1, review_body="The Lightning Thief is an absolute masterpiece! Rick Riordan's storytelling and world-building are top-notch. I can't give it anything less than 5 stars.", review_stars=5, user_id=nums[0]),
        Review(book_id=1, review_body="While I enjoyed The Lightning Thief, it didn't completely blow me away. I'd rate it a solid 4 stars for its creativity and engaging plot.", review_stars=4, user_id=nums[1]),
        Review(book_id=1, review_body="The Lightning Thief was a decent read, but I found some parts a bit slow. I'd rate it 3 stars for the interesting concept but room for improvement.", review_stars=3, user_id=nums[2]),
        Review(book_id=1, review_body="I had high expectations for The Lightning Thief, but it fell short for me. I'd give it 2 stars for effort, but it didn't resonate with me.", review_stars=2, user_id=nums[3]),
        Review(book_id=1, review_body="Unfortunately, The Lightning Thief wasn't my cup of tea. I struggled to connect with the characters, so I'd rate it 1 star.", review_stars=1, user_id=nums[4])
    ]

    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=2, review_body="The Sea of Monsters is another thrilling adventure in the Percy Jackson series. Riordan's writing keeps you hooked from start to finish.", review_stars=5, user_id=nums[0]),
        Review(book_id=2, review_body="I enjoyed The Sea of Monsters, but it didn't quite match the magic of the first book. Still, it's a solid 4-star read for fans of Percy Jackson.", review_stars=4, user_id=nums[1]),
        Review(book_id=2, review_body="The Sea of Monsters had some exciting moments, but I found the plot a bit predictable. It's a 3-star read for me.", review_stars=3, user_id=nums[2]),
        Review(book_id=2, review_body="I had high hopes for The Sea of Monsters, but it fell short of my expectations. 2 stars for effort, but it didn't captivate me.", review_stars=2, user_id=nums[3]),
        Review(book_id=2, review_body="Unfortunately, The Sea of Monsters didn't engage me as much as the first book. I'd give it 1 star for not living up to the hype.", review_stars=1, user_id=nums[4])
    ]
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=3, review_body="The Titan's Curse is a gripping addition to the Percy Jackson series. Riordan's storytelling remains strong, earning it 5 stars from me.", review_stars=5, user_id=nums[0]),
        Review(book_id=3, review_body="I thoroughly enjoyed The Titan's Curse. The characters' development and the plot twists kept me engaged. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=3, review_body="While The Titan's Curse was entertaining, it lacked the depth of the previous books. I'd rate it 3 stars for being decent but not outstanding.", review_stars=3, user_id=nums[2]),
        Review(book_id=3, review_body="I had high expectations for The Titan's Curse, but it didn't meet them. 2 stars for falling short of what I hoped for.", review_stars=2, user_id=nums[3]),
        Review(book_id=3, review_body="Unfortunately, The Titan's Curse didn't resonate with me. I'd give it 1 star for not living up to the series' potential.", review_stars=1, user_id=nums[4])
    ]
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=4, review_body="The Battle of the Labyrinth is an epic installment in the Percy Jackson series! The action and twists had me hooked, earning it 5 stars.", review_stars=5, user_id=nums[0]),
        Review(book_id=4, review_body="I couldn't get enough of The Battle of the Labyrinth. The character dynamics and the labyrinth itself were brilliant. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=4, review_body="While The Battle of the Labyrinth was enjoyable, it didn't reach the heights of the earlier books. I'd rate it 3 stars for being a decent read.", review_stars=3, user_id=nums[2]),
        Review(book_id=4, review_body="I had high hopes for The Battle of the Labyrinth, but it left me wanting more. 2 stars for not meeting my expectations.", review_stars=2, user_id=nums[3]),
        Review(book_id=4, review_body="The Battle of the Labyrinth was a letdown for me. I'd give it 1 star for not living up to the series' potential.", review_stars=1, user_id=nums[4])
    ]
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=5, review_body="The Last Olympian is a thrilling conclusion to the Percy Jackson series! The battle scenes and character development were exceptional. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=5, review_body="I couldn't have asked for a better ending than The Last Olympian. It's an action-packed and emotional ride. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=5, review_body="While The Last Olympian was great, it had some slow moments. I'd rate it 3 stars for being a good conclusion to the series.", review_stars=3, user_id=nums[2]),
        Review(book_id=5, review_body="I had high expectations for The Last Olympian, and it delivered. 5 stars for an epic finale!", review_stars=5, user_id=nums[3]),
        Review(book_id=5, review_body="The Last Olympian exceeded my expectations. It's a 5-star ending to an incredible series.", review_stars=5, user_id=nums[4])
    ]
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=6, review_body="Pride and Prejudice is an absolute classic! Jane Austen's wit and social commentary are unmatched. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=6, review_body="I thoroughly enjoyed Pride and Prejudice. The characters are so well-drawn, and the romance is timeless. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=6, review_body="While Pride and Prejudice is a literary masterpiece, it was a bit slow for my taste. Still, I'd rate it 3 stars for its importance.", review_stars=3, user_id=nums[2]),
        Review(book_id=6, review_body="Pride and Prejudice met my high expectations. Jane Austen's storytelling deserves 5 stars.", review_stars=5, user_id=nums[3]),
        Review(book_id=6, review_body="Pride and Prejudice is a timeless classic. It's a 5-star book that everyone should read at least once.", review_stars=5, user_id=nums[4])
    ]
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=7, review_body="Emma is a delightful classic by Jane Austen. The characters and witty dialogues make it a 5-star read.", review_stars=5, user_id=nums[0]),
        Review(book_id=7, review_body="I found Emma to be a charming and humorous novel. Austen's storytelling is top-notch. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=7, review_body="While Emma is a well-crafted story, it's not my favorite Austen work. I'd rate it 3 stars for its literary value.", review_stars=3, user_id=nums[2]),
        Review(book_id=7, review_body="Emma exceeded my expectations. It's a 5-star example of Austen's genius.", review_stars=5, user_id=nums[3]),
        Review(book_id=7, review_body="Emma is a classic that stands the test of time. I'd give it 5 stars without hesitation.", review_stars=5, user_id=nums[4])
    ]
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=8, review_body="Where the Crawdads Sing is a mesmerizing masterpiece. Delia Owens' prose is poetic, and the story is unforgettable. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=8, review_body="I couldn't put down Where the Crawdads Sing. It's a beautifully written and haunting tale. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=8, review_body="Where the Crawdads Sing is a lyrical novel, but it had moments where it felt slow. Still, I'd rate it 3 stars for its unique style.", review_stars=3, user_id=nums[2]),
        Review(book_id=8, review_body="Where the Crawdads Sing met my high expectations. Delia Owens' storytelling is exceptional. 5 stars!", review_stars=5, user_id=nums[3]),
        Review(book_id=8, review_body="Where the Crawdads Sing is a book that lingers in your thoughts. It deserves 5 stars for its beauty and depth.", review_stars=5, user_id=nums[4])
    ]
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=9, review_body="A Deadly Education is a dark and captivating fantasy. Naomi Novik's world-building is exceptional. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=9, review_body="I was hooked from the first page of A Deadly Education. The magical school setting is unique and thrilling. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=9, review_body="While A Deadly Education is intriguing, it had moments of complexity. I'd rate it 3 stars for its originality.", review_stars=3, user_id=nums[1]),
        Review(book_id=9, review_body="A Deadly Education didn't disappoint. Naomi Novik's storytelling shines. 5 stars!", review_stars=5, user_id=nums[1]),
        Review(book_id=9, review_body="A Deadly Education is a dark gem in the fantasy genre. It deserves 5 stars for its creativity and tension.", review_stars=5, user_id=nums[1])
    ]
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=10, review_body="The Last Graduate is an epic conclusion to the Scholomance series. Naomi Novik's writing keeps you on the edge of your seat. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=10, review_body="I couldn't have asked for a better ending than The Last Graduate. It's a thrilling and satisfying conclusion. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=10, review_body="While The Last Graduate tied up loose ends, it had moments of predictability. I'd rate it 3 stars for its closure. ", review_stars=3, user_id=nums[2]),
        Review(book_id=10, review_body="The Last Graduate met my high expectations. Naomi Novik delivers an outstanding finale. 5 stars!", review_stars=5, user_id=nums[3]),
        Review(book_id=10, review_body="The Last Graduate is a 5-star ending to an enthralling series. Novik's storytelling is superb.", review_stars=5, user_id=nums[4])
    ]
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=11, review_body="The Golden Enclaves is a richly imagined fantasy world. The characters and their adventures are captivating. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=11, review_body="I was spellbound by The Golden Enclaves. It's a thrilling journey through a fantastical realm. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=11, review_body="While The Golden Enclaves had moments of brilliance, it also had some pacing issues. I'd rate it 3 stars for its potential. ", review_stars=3, user_id=nums[2]),
        Review(book_id=11, review_body="The Golden Enclaves met my high expectations. The world-building is top-notch. 5 stars!", review_stars=5, user_id=nums[3]),
        Review(book_id=11, review_body="The Golden Enclaves is a 5-star fantasy with vivid world-building and engaging characters. A must-read!", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'The Hunger Games' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=12, review_body="The Hunger Games is a dystopian masterpiece! Suzanne Collins' storytelling is gripping. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=12, review_body="I was hooked from the start of The Hunger Games. The suspense and Katniss's character development are incredible. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=12, review_body="While The Hunger Games is intense, it had moments of brutality. I'd rate it 3 stars for its impact.", review_stars=3, user_id=nums[2]),
        Review(book_id=12, review_body="The Hunger Games exceeded my expectations. Suzanne Collins delivers a powerful story. 5 stars!", review_stars=5, user_id=nums[3]),
        Review(book_id=12, review_body="The Hunger Games is a 5-star dystopian classic that leaves a lasting impression. A must-read!", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'Catching Fire' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=13, review_body="Catching Fire is a brilliant sequel that keeps the momentum going. Suzanne Collins' writing is exceptional. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=13, review_body="I couldn't put down Catching Fire. The twists and character development are riveting. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=13, review_body="While Catching Fire is exciting, it had some slow moments. I'd rate it 3 stars for its middle book syndrome.", review_stars=3, user_id=nums[2]),
        Review(book_id=13, review_body="Catching Fire met my high expectations. Suzanne Collins keeps you on the edge of your seat. 5 stars!", review_stars=5, user_id=nums[3]),
        Review(book_id=13, review_body="Catching Fire is a 5-star sequel that takes the series to new heights. A must-read for fans!", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'Mockingjay' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=14, review_body="Mockingjay is an intense and emotional conclusion to the Hunger Games trilogy. Suzanne Collins' writing is powerful. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=14, review_body="I couldn't have asked for a better ending than Mockingjay. It's a rollercoaster of emotions. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=14, review_body="While Mockingjay is gripping, it had moments of darkness. I'd rate it 3 stars for its heavy themes.", review_stars=3, user_id=nums[2]),
        Review(book_id=14, review_body="Mockingjay met my high expectations. Suzanne Collins delivers a poignant finale. 5 stars!", review_stars=5, user_id=nums[3]),
        Review(book_id=14, review_body="Mockingjay is a 5-star conclusion to an unforgettable series. Collins' storytelling is superb.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'To Kill a Mockingbird' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=15, review_body="To Kill a Mockingbird is a timeless classic that tackles important social issues. Harper Lee's writing is masterful. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=15, review_body="I was deeply moved by To Kill a Mockingbird. The characters and the courtroom drama are powerful. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=15, review_body="While To Kill a Mockingbird is a thought-provoking novel, it had moments of slower pacing. I'd rate it 3 stars for its social commentary.", review_stars=3, user_id=nums[2]),
        Review(book_id=15, review_body="To Kill a Mockingbird is a must-read classic that leaves a lasting impact. Harper Lee's storytelling deserves 5 stars.", review_stars=5, user_id=nums[3]),
        Review(book_id=15, review_body="To Kill a Mockingbird is a 5-star masterpiece that remains relevant and thought-provoking.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for '1984' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=16, review_body="1984 is a chilling dystopian novel that warns of the dangers of totalitarianism. George Orwell's writing is haunting. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=16, review_body="I couldn't put down 1984. It's a thought-provoking and cautionary tale. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=16, review_body="While 1984 is a powerful work, it had moments of darkness. I'd rate it 3 stars for its dystopian themes.", review_stars=3, user_id=nums[2]),
        Review(book_id=16, review_body="1984 is a 5-star masterpiece that remains relevant in today's world. George Orwell's vision is impactful.", review_stars=5, user_id=nums[3]),
        Review(book_id=16, review_body="1984 is a 5-star classic that serves as a stark warning about the dangers of surveillance and authoritarianism.", review_stars=5, user_id=nums[4])
    ]# Create instances of the Review class for 'The Great Gatsby' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=17, review_body="The Great Gatsby is a literary gem that captures the spirit of the Roaring Twenties. F. Scott Fitzgerald's writing is exquisite. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=17, review_body="I was captivated by The Great Gatsby's portrayal of decadence and disillusionment. It's a 4-star classic.", review_stars=4, user_id=nums[1]),
        Review(book_id=17, review_body="While The Great Gatsby is a captivating story, it had moments of shallow characters. I'd rate it 3 stars for its social commentary.", review_stars=3, user_id=nums[2]),
        Review(book_id=17, review_body="The Great Gatsby is a timeless 5-star classic that remains relevant in its portrayal of the American Dream.", review_stars=5, user_id=nums[3]),
        Review(book_id=17, review_body="The Great Gatsby is a 5-star masterpiece that beautifully captures the essence of a bygone era.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'The Catcher in the Rye' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=18, review_body="The Catcher in the Rye is a classic coming-of-age novel. J.D. Salinger's portrayal of teenage angst is relatable. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=18, review_body="I connected with The Catcher in the Rye's protagonist Holden Caulfield on a personal level. It's a 4-star classic.", review_stars=4, user_id=nums[1]),
        Review(book_id=18, review_body="While The Catcher in the Rye is a compelling story, it had moments of introspection. I'd rate it 3 stars for its character study.", review_stars=3, user_id=nums[2]),
        Review(book_id=18, review_body="The Catcher in the Rye is a timeless 5-star classic that explores the complexities of youth and alienation.", review_stars=5, user_id=nums[3]),
        Review(book_id=18, review_body="The Catcher in the Rye is a 5-star masterpiece that continues to resonate with readers of all ages.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'The Fellowship of the Ring' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=19, review_body="The Fellowship of the Ring is the beginning of an epic journey. J.R.R. Tolkien's world-building is astounding. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=19, review_body="I was transported to Middle-earth while reading The Fellowship of the Ring. It's a 4-star start to an unforgettable series.", review_stars=4, user_id=nums[1]),
        Review(book_id=19, review_body="While The Fellowship of the Ring is an excellent introduction, it had moments of exposition. I'd rate it 3 stars for its world-building.", review_stars=3, user_id=nums[2]),
        Review(book_id=19, review_body="The Fellowship of the Ring is a 5-star fantasy classic that sets the stage for an epic adventure.", review_stars=5, user_id=nums[3]),
        Review(book_id=19, review_body="The Fellowship of the Ring is a 5-star masterpiece that immerses you in Tolkien's richly imagined world.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'The Two Towers' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=20, review_body="The Two Towers is an action-packed continuation of the Lord of the Rings series. J.R.R. Tolkien's storytelling is captivating. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=20, review_body="I couldn't put down The Two Towers. It's a thrilling middle installment. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=20, review_body="While The Two Towers is a great part of the series, it had moments of slower pacing. I'd rate it 3 stars for its plot development.", review_stars=3, user_id=nums[2]),
        Review(book_id=20, review_body="The Two Towers is a 5-star epic that keeps you engaged in the quest for Middle-earth.", review_stars=5, user_id=nums[3]),
        Review(book_id=20, review_body="The Two Towers is a 5-star gem in the Lord of the Rings trilogy. Tolkien's world-building shines.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'The Return of the King' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=21, review_body="The Return of the King is an epic conclusion to the Lord of the Rings trilogy. J.R.R. Tolkien's writing is masterful. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=21, review_body="I was emotionally invested in The Return of the King. It's a satisfying and emotional finale. 4 stars!", review_stars=4, user_id=nums[1]),
        Review(book_id=21, review_body="While The Return of the King ties up loose ends, it had moments of closure. I'd rate it 3 stars for its resolution.", review_stars=3, user_id=nums[2]),
        Review(book_id=21, review_body="The Return of the King is a 5-star epic that brings the Lord of the Rings saga to a triumphant end.", review_stars=5, user_id=nums[3]),
        Review(book_id=21, review_body="The Return of the King is a 5-star masterpiece that concludes Tolkien's epic fantasy journey.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'The Hobbit' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=22, review_body="The Hobbit is a delightful adventure filled with dwarves, dragons, and Bilbo Baggins. J.R.R. Tolkien's storytelling is enchanting. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=22, review_body="I was captivated by The Hobbit's charming tale. It's a 4-star journey through Middle-earth. ", review_stars=4, user_id=nums[1]),
        Review(book_id=22, review_body="While The Hobbit is a fantastic adventure, it had moments of simplicity. I'd rate it 3 stars for its lighter tone.", review_stars=3, user_id=nums[2]),
        Review(book_id=22, review_body="The Hobbit is a 5-star classic that introduces readers to the wonders of Middle-earth.", review_stars=5, user_id=nums[3]),
        Review(book_id=22, review_body="The Hobbit is a 5-star gem that is perfect for readers of all ages. Tolkien's world-building shines.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'Jane Eyre' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=23, review_body="Jane Eyre is a timeless classic with a strong and independent heroine. Charlotte Brontë's writing is captivating. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=23, review_body="I was deeply moved by Jane Eyre's journey. It's a 4-star tale of love and resilience.", review_stars=4, user_id=nums[1]),
        Review(book_id=23, review_body="While Jane Eyre is a compelling novel, it had moments of melodrama. I'd rate it 3 stars for its emotional intensity.", review_stars=3, user_id=nums[2]),
        Review(book_id=23, review_body="Jane Eyre is a 5-star classic that continues to inspire with its strong characters and timeless themes.", review_stars=5, user_id=nums[3]),
        Review(book_id=23, review_body="Jane Eyre is a 5-star masterpiece that showcases Brontë's genius in storytelling and character development.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'Lord of the Flies' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=24, review_body="Lord of the Flies is a thought-provoking exploration of human nature. William Golding's writing is haunting. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=24, review_body="I couldn't put down Lord of the Flies. It's a 4-star descent into chaos and survival.", review_stars=4, user_id=nums[1]),
        Review(book_id=24, review_body="While Lord of the Flies is a dark and gripping tale, it had moments of brutality. I'd rate it 3 stars for its exploration of primal instincts.", review_stars=3, user_id=nums[2]),
        Review(book_id=24, review_body="Lord of the Flies is a 5-star masterpiece that forces us to confront the darker aspects of humanity.", review_stars=5, user_id=nums[3]),
        Review(book_id=24, review_body="Lord of the Flies is a 5-star classic that remains relevant with its unsettling portrayal of human behavior.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'Little Women' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=25, review_body="Little Women is a heartwarming tale of family and sisterhood. Louisa May Alcott's storytelling is touching. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=25, review_body="I was charmed by Little Women's characters and their coming-of-age journeys. It's a 4-star classic.", review_stars=4, user_id=nums[1]),
        Review(book_id=25, review_body="While Little Women is a delightful novel, it had moments of sentimentality. I'd rate it 3 stars for its portrayal of domestic life.", review_stars=3, user_id=nums[2]),
        Review(book_id=25, review_body="Little Women is a 5-star classic that continues to inspire with its timeless themes of love and family.", review_stars=5, user_id=nums[3]),
        Review(book_id=25, review_body="Little Women is a 5-star gem that beautifully captures the joys and challenges of growing up.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'Fahrenheit 451' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=26, review_body="Fahrenheit 451 is a thought-provoking dystopian novel. Ray Bradbury's writing is compelling. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=26, review_body="I couldn't put down Fahrenheit 451. It's a 4-star warning about the dangers of censorship.", review_stars=4, user_id=nums[1]),
        Review(book_id=26, review_body="While Fahrenheit 451 is a powerful work, it had moments of darkness. I'd rate it 3 stars for its message.", review_stars=3, user_id=nums[2]),
        Review(book_id=26, review_body="Fahrenheit 451 is a 5-star classic that remains relevant in today's world. Bradbury's vision is impactful.", review_stars=5, user_id=nums[3]),
        Review(book_id=26, review_body="Fahrenheit 451 is a 5-star masterpiece that serves as a stark warning about the importance of literature.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'Wuthering Heights' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=27, review_body="Wuthering Heights is a haunting and passionate tale of love and revenge. Emily Brontë's writing is mesmerizing. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=27, review_body="I was captivated by the dark and tumultuous love story in Wuthering Heights. It's a 4-star masterpiece.", review_stars=4, user_id=nums[1]),
        Review(book_id=27, review_body="While Wuthering Heights is a compelling novel, it had moments of tragedy. I'd rate it 3 stars for its emotional depth.", review_stars=3, user_id=nums[2]),
        Review(book_id=27, review_body="Wuthering Heights is a 5-star classic that continues to enthrall readers with its passionate characters.", review_stars=5, user_id=nums[3]),
        Review(book_id=27, review_body="Wuthering Heights is a 5-star gem that explores the complexities of love and obsession.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'Les Misérables' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=28, review_body="Les Misérables is an epic tale of justice and redemption. Victor Hugo's writing is profound. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=28, review_body="I was deeply moved by the characters and their struggles in Les Misérables. It's a 4-star masterpiece.", review_stars=4, user_id=nums[1]),
        Review(book_id=28, review_body="While Les Misérables is a lengthy novel, it had moments of brilliance. I'd rate it 3 stars for its social commentary.", review_stars=3, user_id=nums[2]),
        Review(book_id=28, review_body="Les Misérables is a 5-star classic that continues to inspire with its themes of hope and compassion.", review_stars=5, user_id=nums[3]),
        Review(book_id=28, review_body="Les Misérables is a 5-star masterpiece that showcases Hugo's talent for storytelling and character development.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'Brave New World' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=29, review_body="Brave New World is a thought-provoking dystopian novel. Aldous Huxley's writing is chillingly prescient. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=29, review_body="I couldn't put down Brave New World. It's a 4-star warning about the consequences of a dehumanized society.", review_stars=4, user_id=nums[1]),
        Review(book_id=29, review_body="While Brave New World is a powerful work, it had moments of discomfort. I'd rate it 3 stars for its unsettling themes.", review_stars=3, user_id=nums[2]),
        Review(book_id=29, review_body="Brave New World is a 5-star classic that continues to provoke thought about the future of humanity.", review_stars=5, user_id=nums[3]),
        Review(book_id=29, review_body="Brave New World is a 5-star masterpiece that serves as a stark warning about the consequences of a utopian society.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'Anne of Green Gables' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=30, review_body="Anne of Green Gables is a heartwarming tale of an imaginative orphan. Lucy Maud Montgomery's writing is enchanting. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=30, review_body="I was charmed by Anne's adventures and her lively spirit. It's a 4-star classic for all ages.", review_stars=4, user_id=nums[1]),
        Review(book_id=30, review_body="While Anne of Green Gables is a delightful novel, it had moments of nostalgia. I'd rate it 3 stars for its portrayal of rural life.", review_stars=3, user_id=nums[2]),
        Review(book_id=30, review_body="Anne of Green Gables is a 5-star classic that continues to inspire with its timeless characters and settings.", review_stars=5, user_id=nums[3]),
        Review(book_id=30, review_body="Anne of Green Gables is a 5-star gem that beautifully captures the innocence and wonder of childhood.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'The Count of Monte Cristo' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=31, review_body="The Count of Monte Cristo is an epic tale of revenge and redemption. Alexandre Dumas' writing is captivating. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=31, review_body="I was enthralled by the twists and turns in The Count of Monte Cristo. It's a 4-star masterpiece of intrigue.", review_stars=4, user_id=nums[1]),
        Review(book_id=31, review_body="While The Count of Monte Cristo is a lengthy novel, it had moments of suspense. I'd rate it 3 stars for its intricate plot.", review_stars=3, user_id=nums[2]),
        Review(book_id=31, review_body="The Count of Monte Cristo is a 5-star classic that continues to captivate readers with its complex characters and themes.", review_stars=5, user_id=nums[3]),
        Review(book_id=31, review_body="The Count of Monte Cristo is a 5-star masterpiece that showcases Dumas' skill in crafting a compelling adventure.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'Ender's Game' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=32, review_body="Ender's Game is a thrilling science fiction novel. Orson Scott Card's storytelling is riveting. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=32, review_body="I was hooked from the start of Ender's Game. It's a 4-star adventure in space.", review_stars=4, user_id=nums[1]),
        Review(book_id=32, review_body="While Ender's Game is a fast-paced read, it had moments of moral dilemmas. I'd rate it 3 stars for its exploration of ethics.", review_stars=3, user_id=nums[2]),
        Review(book_id=32, review_body="Ender's Game is a 5-star classic that continues to captivate readers with its complex characters and futuristic themes.", review_stars=5, user_id=nums[3]),
        Review(book_id=32, review_body="Ender's Game is a 5-star masterpiece that remains a must-read for science fiction enthusiasts.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'A Tale of Two Cities' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=33, review_body="A Tale of Two Cities is a historical masterpiece with a gripping plot. Charles Dickens' writing is captivating. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=33, review_body="I was transported to the tumultuous times of the French Revolution in A Tale of Two Cities. It's a 4-star classic.", review_stars=4, user_id=nums[1]),
        Review(book_id=33, review_body="While A Tale of Two Cities is a compelling novel, it had moments of tragedy. I'd rate it 3 stars for its portrayal of sacrifice.", review_stars=3, user_id=nums[2]),
        Review(book_id=33, review_body="A Tale of Two Cities is a 5-star classic that continues to resonate with its timeless themes of love and sacrifice.", review_stars=5, user_id=nums[3]),
        Review(book_id=33, review_body="A Tale of Two Cities is a 5-star gem that brilliantly captures the turmoil of the era.", review_stars=5, user_id=nums[4])
    ]
    # Create instances of the Review class for 'The Handmaid's Tale' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=34, review_body="The Handmaid's Tale is a dystopian masterpiece that explores themes of oppression. Margaret Atwood's writing is haunting. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=34, review_body="I was deeply disturbed by the chilling world of The Handmaid's Tale. It's a 4-star warning about the consequences of extremism.", review_stars=4, user_id=nums[1]),
        Review(book_id=34, review_body="While The Handmaid's Tale is a powerful work, it had moments of despair. I'd rate it 3 stars for its depiction of a bleak future.", review_stars=3, user_id=nums[2]),
        Review(book_id=34, review_body="The Handmaid's Tale is a 5-star classic that remains relevant in its cautionary tale about the erosion of rights.", review_stars=5, user_id=nums[3]),
        Review(book_id=34, review_body="The Handmaid's Tale is a 5-star masterpiece that leaves a lasting impact on the reader.", review_stars=5, user_id=nums[4])
    ]

    # Create instances of the Review class for 'Anna Karenina' reviews
    nums = generate_unique_random_numbers()
    reviews += [
        Review(book_id=35, review_body="Anna Karenina is a sweeping novel of love and society. Leo Tolstoy's writing is profound. 5 stars!", review_stars=5, user_id=nums[0]),
        Review(book_id=35, review_body="I was engrossed in the complex relationships in Anna Karenina. It's a 4-star masterpiece of Russian literature.", review_stars=4, user_id=nums[1]),
        Review(book_id=35, review_body="While Anna Karenina is a lengthy novel, it had moments of philosophical reflection. I'd rate it 3 stars for its exploration of morality.", review_stars=3, user_id=nums[2]),
        Review(book_id=35, review_body="Anna Karenina is a 5-star classic that continues to captivate readers with its rich character development and social commentary.", review_stars=5, user_id=nums[3]),
        Review(book_id=35, review_body="Anna Karenina is a 5-star gem that beautifully portrays the complexities of love and society.", review_stars=5, user_id=nums[4])
    ]

    unique_user_ids = random.sample(range(6, 57), 5)

    unique_reviews = [
        Review(book_id=24, review_body="A gripping and thought-provoking read.", review_stars=5, user_id=unique_user_ids[0]),
        Review(book_id=24, review_body="The characters' descent into chaos is masterfully depicted.", review_stars=4, user_id=unique_user_ids[1]),
        Review(book_id=24, review_body="An unsettling and captivating exploration of human nature.", review_stars=3, user_id=unique_user_ids[2]),
        Review(book_id=24, review_body="Not as engaging as I expected, but still a good book.", review_stars=2, user_id=unique_user_ids[3]),
        Review(book_id=24, review_body="Couldn't get into it; the story was confusing.", review_stars=1, user_id=unique_user_ids[4])
    ]

    db.session.bulk_save_objects(unique_reviews)
    db.session.bulk_save_objects(reviews)
    

def unseed_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()