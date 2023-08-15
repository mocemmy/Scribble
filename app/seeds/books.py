from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text

def seed_books():
    book1 = Book(
        creator_id = 3,
        author_first_name = 'Rick',
        author_last_name = 'Riordan',
        title = 'The Lightning Thief',
        genre = 'YA Fantasy',
        book_cover = '/images/the-lightning-thief-cover.jpg',
        summary = "Percy Jackson is a good kid, but he can't seem to focus on his schoolwork or control his temper. And lately, being away at boarding school is only getting worse - Percy could have sworn his pre-algebra teacher turned into a monster and tried to kill him. When Percy's mom finds out, she knows it's time that he knew the truth about where he came from, and that he go to the one place he'll be safe. She sends Percy to Camp Half Blood, a summer camp for demigods (on Long Island), where he learns that the father he never knew is Poseidon, God of the Sea. Soon a mystery unfolds and together with his friends—one a satyr and the other the demigod daughter of Athena - Percy sets out on a quest across the United States to reach the gates of the Underworld (located in a recording studio in Hollywood) and prevent a catastrophic war between the gods."
    )
    book2 = Book(
        creator_id = 3,
        author_first_name = 'Rick',
        author_last_name = 'Riordan',
        title = 'The Sea of Monsters',
        genre = 'YA Fantasy',
        book_cover = '/images/the-sea-of-monsters-cover.jpg',
        summary = "After a year spent trying to prevent a catastropic war among the Greek gods, Percy Jackson finds his seventh-grade school year unnervingly quiet. His biggest problem is dealing with his new friend, Tyson--a six-foot-three, mentally challenged homeless kid who follows Percy everywhere, making it hard for Percy to have any 'normal' friends. But things don't stay quiet for long. Percy soon discovers there is trouble at Camp Half-Blood: The magical borders which protect Half-Blood Hill have been poisoned by a mysterious enemy, and the only safe haven for demigods is on the verge of being overrun by mythological monsters. To save the camp, Percy needs the help of his best friend, Grover, who has been taken prisoner by the Cyclops Polyphemus on an island somewhere in the Sea of Monsters--the dangerous waters Greek heroes have sailed for millenia--only today, the Sea of Monsters goes by a new name...the Bermuda Triangle. Now Percy and his friends--Grover, Annabeth, and Tyson--must retrieve the Golden Fleece from the Island of the Cyclopes by the end of the summer or Camp Half-Blood will be destroyed. But first, Percy will learn a stunning new secret about his family--one that makes him question whether being claimed as Poseidon's son is an honor or simply a cruel joke."
    )

    book3 = Book(
        creator_id = 3,
        author_first_name = 'Rick',
        author_last_name = 'Riordan',
        title = "The Titan's Curse",
        genre = 'YA Fantasy',
        book_cover = '/images/the-titans-curse-cover.jpg',
        summary = "It's not everyday you find yourself in combat with a half-lion, half-human. But when you're the son of a Greek god, it happens. And now my friend Annabeth is missing, a goddess is in chains and only five half-blood heroes can join the quest to defeat the doomsday monster.Oh, and guess what? The Oracle has predicted that not all of us will survive..."
    )
    book4 = Book(
        creator_id = 3,
        author_first_name = 'Rick',
        author_last_name = 'Riordan',
        title = "The Battle of the Labyrinth",
        genre = 'YA Fantasy',
        book_cover = '/images/the-battle-of-the-labyrinth-cover.jpg',
        summary = "Percy Jackson isn't expecting freshman orientation to be any fun. But when a mysterious mortal acquaintance appears at his potential new school, followed by demon cheerleaders, things quickly move from bad to worse. In this fourth installment of the blockbuster series, time is running out as war between the Olympians and the evil Titan lord Kronos draws near. Even the safe haven of Camp Half-Blood grows more vulnerable by the minute as Kronos's army prepares to invade its once impenetrable borders. To stop the invasion, Percy and his demigod friends must set out on a quest through the Labyrinth - a sprawling underground world with stunning surprises at every turn."
    )
    book5 = Book(
        creator_id = 3,
        author_first_name = 'Rick',
        author_last_name = 'Riordan',
        title = "The Last Olympian",
        genre = 'YA Fantasy',
        book_cover = '/images/the-last-olympian-cover.jpg',
        summary = "All year the half-bloods have been preparing for battle against the Titans, knowing the odds of victory are grim. Kronos's army is stronger than ever, and with every god and half-blood he recruits, the evil Titan's power only grows. While the Olympians struggle to contain the rampaging monster Typhon, Kronos begins his advance on New York City, where Mount Olympus stands virtually unguarded. Now it's up to Percy Jackson and an army of young demigods to stop the Lord of Time. In this momentous final book in the New York Times best-selling series, the long-awaited prophecy surrounding Percy's sixteenth birthday unfolds. And as the battle for Western civilization rages on the streets of Manhattan, Percy faces a terrifying suspicion that he may be fighting against his own fate."
    )
    book6 = Book(
        creator_id = 2,
        author_first_name = 'Jane',
        author_last_name = 'Austen',
        title = "Pride and Prejudice",
        book_cover = '/images/pride-and-prejudice-cover.jpg',
        genre = 'Classics Romance Historical',
        summary = 'Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work "her own darling child" and its vivacious heroine, Elizabeth Bennet, "as delightful a creature as ever appeared in print." The romantic clash between the opinionated Elizabeth and her proud beau, Mr. Darcy, is a splendid performance of civilized sparring. And Jane Austen\'s radiant wit sparkles as her characters dance a delicate quadrille of flirtation and intrigue, making this book the most superb comedy of manners of Regency England.'
    )

    book7 = Book(
        creator_id = 2,
        author_first_name = 'Jane',
        author_last_name = 'Austen',
        title = "Emma",
        book_cover = '/images/emma-cover.jpg',
        genre = 'Classics Romance Historical',
        summary = "Emma Woodhouse is one of Austen's most captivating and vivid characters. Beautiful, spoilt, vain and irrepressibly witty, Emma organizes the lives of the inhabitants of her sleepy little village and plays matchmaker with devastating effect."
    )
    book8 = Book(
        creator_id = 4,
        author_first_name = 'Delia',
        author_last_name = 'Owens',
        title = "Where the Crawdads Sing",
        book_cover = '/images/where-the-crawdads-sing-cover.jpg',
        genre = 'Fiction Mystery Contemporary Adult',
        summary = "For years, rumors of the “Marsh Girl” haunted Barkley Cove, a quiet fishing village. Kya Clark is barefoot and wild; unfit for polite society. So in late 1969, when the popular Chase Andrews is found dead, locals immediately suspect her. But Kya is not what they say. A born naturalist with just one day of school, she takes life's lessons from the land, learning the real ways of the world from the dishonest signals of fireflies. But while she has the skills to live in solitude forever, the time comes when she yearns to be touched and loved. Drawn to two young men from town, who are each intrigued by her wild beauty, Kya opens herself to a new and startling world—until the unthinkable happens."
    )
    book9 = Book(
        creator_id = 5,
        author_first_name = 'Naomi',
        author_last_name = 'Novik',
        title = "A Deadly Education",
        genre = 'YA Fantasy',
        book_cover = '/images/a-deadly-education-cover.jpg',
        summary = "Lesson One of the Scholomance: Learning has never been this deadly. A Deadly Education is set at Scholomance, a school for the magically gifted where failure means certain death (for real) — until one girl, El, begins to unlock its many secrets. There are no teachers, no holidays, and no friendships, save strategic ones. Survival is more important than any letter grade, for the school won’t allow its students to leave until they graduate… or die! The rules are deceptively simple: Don’t walk the halls alone. And beware of the monsters who lurk everywhere. El is uniquely prepared for the school’s dangers. She may be without allies, but she possesses a dark power strong enough to level mountains and wipe out millions. It would be easy enough for El to defeat the monsters that prowl the school. The problem? Her powerful dark magic might also kill all the other students."
    )
    book13 = Book(
        creator_id = 5,
        author_first_name = 'Naomi',
        author_last_name = 'Novik',
        title = "The Last Graduate",
        genre = 'YA Fantasy',
        book_cover = '/images/the-last-graduate-cover.jpg',
        summary = """A budding dark sorceress determined not to use her formidable powers uncovers yet more secrets about the workings of her world in the stunning sequel to A Deadly Education, the start of Naomi Novik’s groundbreaking crossover series.

        At the Scholomance, El, Orion, and the other students are faced with their final year—and the looming specter of graduation, a deadly ritual that leaves few students alive in its wake. El is determined that her chosen group will survive, but it is a prospect that is looking harder by the day as the savagery of the school ramps up. Until El realizes that sometimes winning the game means throwing out all the rules . . ."""
    )
    book14 = Book(
        creator_id = 5,
        author_first_name = 'Naomi',
        author_last_name = 'Novik',
        title = "The Golden Enclaves",
        genre = 'YA Fantasy',
        book_cover = '/images/the-golden-enclaves-cover.jpg',
        summary = """Saving the world is a test no school of magic can prepare you for in the triumphant conclusion to the New York Times bestselling trilogy that began with A Deadly Education and The Last Graduate.

        The one thing you never talk about while you're in the Scholomance is what you'll do when you get out. Not even the richest enclaver would tempt fate that way. But it's all we dream about, the hideously slim chance we'll survive to make it out the gates and improbably find ourselves with a life ahead of us, a life outside the Scholomance halls.

        And now the impossible dream has come true. I'm out, we're all out--and I didn't even have to turn into a monstrous dark witch to make it happen. So much for my great-grandmother's prophecy of doom and destruction. I didn't kill enclavers, I saved them. Me, and Orion, and our allies. Our graduation plan worked to perfection: we saved everyone and made the world safe for all wizards and brought peace and harmony to all the enclaves of the world.

        Ha, only joking! Actually it's gone all wrong. Someone else has picked up the project of destroying enclaves in my stead, and probably everyone we saved is about to get killed in the brewing enclave war on the horizon. And the first thing I've got to do now, having miraculously got out of the Scholomance, is turn straight around and find a way back in."""
    )
    book10 = Book(
        creator_id = 6,
        author_first_name = 'Suzanne',
        author_last_name = 'Collins',
        title = "The Hunger Games",
        genre = 'YA Fiction Dystopia',
        book_cover = '/images/the-hunger-games-cover.jpg',
        summary = """Could you survive on your own in the wild, with every one out to make sure you don't live to see the morning?

        In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV.

        Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she steps forward to take her sister's place in the Games. But Katniss has been close to dead before—and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weight survival against humanity and life against love."""
    )
    book11 = Book(
        creator_id = 6,
        author_first_name = 'Suzanne',
        author_last_name = 'Collins',
        title = "Catching Fire",
        genre = 'YA Fiction Dystopia',
        book_cover = '/images/catching-fire-cover.jpg',
        summary = """Sparks are igniting.
                    Flames are spreading.
                    And the Capitol wants revenge.

                    Against all odds, Katniss Everdeen has won the Hunger Games. She and fellow District 12 tribute Peeta Mellark are miraculously still alive. Katniss should be relieved, happy even. After all, she has returned to her family and her longtime friend, Gale. Yet nothing is the way Katniss wishes it to be. Gale holds her at an icy distance. Peeta has turned his back on her completely. And there are whispers of a rebellion against the Capitol—a rebellion that Katniss and Peeta may have helped create.

                    Much to her shock, Katniss has fueled an unrest that she's afraid she cannot stop. And what scares her even more is that she's not entirely convinced she should try. As time draws near for Katniss and Peeta to visit the districts on the Capitol's cruel Victory Tour, the stakes are higher than ever. If they can't prove, without a shadow of a doubt, that they are lost in their love for each other, the consequences will be horrifying.

                    In Catching Fire, the second novel of the Hunger Games trilogy, Suzanne Collins continues the story of Katniss Everdeen, testing her more than ever before . . . and surprising readers at every turn."""
    )
    book12 = Book(
        creator_id = 6,
        author_first_name = 'Suzanne',
        author_last_name = 'Collins',
        title = "Mockingjay",
        genre = 'YA Fiction Dystopia',
        book_cover = '/images/mockingjay-cover.jpg',
        summary = """My name is Katniss Everdeen.
                    Why am I not dead?
                    I should be dead.

                    Katniss Everdeen, girl on fire, has survived, even though her home has been destroyed. Gale has escaped. Katniss's family is safe. Peeta has been captured by the Capitol. District 13 really does exist. There are rebels. There are new leaders. A revolution is unfolding.

                    It is by design that Katniss was rescued from the arena in the cruel and haunting Quarter Quell, and it is by design that she has long been part of the revolution without knowing it. District 13 has come out of the shadows and is plotting to overthrow the Capitol. Everyone, it seems, has had a hand in the carefully laid plans—except Katniss.

                    The success of the rebellion hinges on Katniss's willingness to be a pawn, to accept responsibility for countless lives, and to change the course of the future of Panem. To do this, she must put aside her feelings of anger and distrust. She must become the rebels' Mockingjay—no matter what the personal cost."""
    )
   

    db.session.add(book1)
    db.session.add(book2)
    db.session.add(book3)
    db.session.add(book4)
    db.session.add(book5)
    db.session.add(book6)
    db.session.add(book7)
    db.session.add(book8)
    db.session.add(book9)
    db.session.add(book10)
    db.session.add(book11)
    db.session.add(book12)
    db.session.add(book13)
    db.session.add(book14)
    db.session.commit()

    
    

    
    
    

def unseed_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()
