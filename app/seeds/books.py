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
    book15 = Book(
        creator_id=1,
        author_first_name="Harper",
        author_last_name="Lee",
        title="To Kill a Mockingbird",
        genre="Classics Fiction Historical",
        book_cover="/images/to-kill-a-mockingbird-cover.jpg",
        summary="""The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it. "To Kill A Mockingbird" became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.

Compassionate, dramatic, and deeply moving, "To Kill A Mockingbird" takes readers to the roots of human behavior - to innocence and experience, kindness and cruelty, love and hatred, humor and pathos. Now with over 18 million copies in print and translated into forty languages, this regional story by a young Alabama woman claims universal appeal. Harper Lee always considered her book to be a simple love story. Today it is regarded as a masterpiece of American literature.
"""
    )
    book16 = Book(
        creator_id=1,
        author_first_name="George",
        author_last_name="Orwell",
        title="1984",
        genre="Classics Fiction Science Fiction Dystopia",
        book_cover="/images/1984-cover.jpg",
        summary="""The new novel by George Orwell is the major work towards which all his previous writing has pointed. Critics have hailed it as his "most solid, most brilliant" work. Though the story of Nineteen Eighty-Four takes place thirty-five years hence, it is in every sense timely. The scene is London, where there has been no new housing since 1950 and where the city-wide slums are called Victory Mansions. Science has abandoned Man for the State. As every citizen knows only too well, war is peace.

To Winston Smith, a young man who works in the Ministry of Truth (Minitru for short), come two people who transform this life completely. One is Julia, whom he meets after she hands him a slip reading, "I love you." The other is O'Brien, who tells him, "We shall meet in the place where there is no darkness." The way in which Winston is betrayed by the one and, against his own desires and instincts, ultimately betrays the other, makes a story of mounting drama and suspense.
"""
    )
    book17 = Book(
        creator_id=1,
        author_first_name="F. Scott",
        author_last_name="Fitzgerald",
        title="The Great Gatsby",
        genre="Classics Fiction Historical",
        book_cover="/images/the-great-gatsby-cover.jpg",
        summary="""The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted "gin was the national drink and sex the national obsession," it is an exquisitely crafted tale of America in the 1920s.
"""
    )
    book18 = Book(
        creator_id=1,
        author_first_name="J.D.",
        author_last_name="Salinger",
        title="The Catcher in the Rye",
        genre="Classics Fiction YA",
        book_cover="/images/the-catcher-in-the-rye-cover.jpg",
        summary="""It's Christmas time and Holden Caulfield has just been expelled from yet another school...

Fleeing the crooks at Pencey Prep, he pinballs around New York City seeking solace in fleeting encounters—shooting the bull with strangers in dive hotels, wandering alone round Central Park, getting beaten up by pimps and cut down by erstwhile girlfriends. The city is beautiful and terrible, in all its neon loneliness and seedy glamour, its mingled sense of possibility and emptiness. Holden passes through it like a ghost, thinking always of his kid sister Phoebe, the only person who really understands him, and his determination to escape the phonies and find a life of true meaning.

The Catcher in the Rye is an all-time classic in coming-of-age literature- an elegy to teenage alienation, capturing the deeply human need for connection and the bewildering sense of loss as we leave childhood behind.

J.D. Salinger's (1919–2010) classic novel of teenage angst and rebellion was first published in 1951. The novel was included on Time's 2005 list of the 100 best English-language novels written since 1923. It was named by Modern Library and its readers as one of the 100 best English-language novels of the 20th century. It has been frequently challenged in the court for its liberal use of profanity and portrayal of sexuality and in the 1950's and 60's it was the novel that every teenage boy wants to read.
"""
    )
    book19 = Book(
        creator_id=1,
        author_first_name="J.R.R.",
        author_last_name="Tolkein",
        title="The Fellowship of the Ring",
        genre="Fantasy Classics Fiction",
        book_cover="/images/fellowship-of-the-ring-cover.jpg",
        summary="""One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them.

In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell into the hands of Bilbo Baggins, as told in The Hobbit.

In a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as his elderly cousin Bilbo entrusts the Ring to his care. Frodo must leave his home and make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ring and foil the Dark Lord in his evil purpose.
"""
    )
    book20 = Book(
        creator_id=1,
        author_first_name="J.R.R",
        author_last_name="Tolkein",
        title="To Two Towers",
        genre="Fantasy Classics Fiction",
        book_cover="/images/the-two-towers.jpg",
        summary="""One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them.

Frodo and his Companions of the Ring have been beset by danger during their quest to prevent the Ruling Ring from falling into the hands of the Dark Lord by destroying it in the Cracks of Doom. They have lost the wizard, Gandalf, in a battle in the Mines of Moria. And Boromir, seduced by the power of the Ring, tried to seize it by force. While Frodo and Sam made their escape, the rest of the company was attacked by Orcs. Now they continue the journey alone down the great River Anduin—alone, that is, save for the mysterious creeping figure that follows wherever they go.
"""
    )
    book21 = Book(
        creator_id=1,
        author_first_name="J.R.R",
        author_last_name="Tolkein",
        title="The Return of the King",
        genre="Fantasy Classics Fiction",
        book_cover="/images/the-return-of-the-king.jpg",
        summary="""One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them.

The Dark Lord has risen, and as he unleashes hordes of Orcs to conquer all Middle-earth, Frodo and Sam struggle deep into his realm in Mordor.

To defeat Sauron, the One Ring must be destroyed in the fires of Mount Doom. But the way is impossibly hard, and Frodo is weakening. The Ring corrupts all who bear it and Frodo’s time is running out.
"""
    )
    book22 = Book(
        creator_id=1,
        author_first_name="J.R.R",
        author_last_name="Tolkein",
        title="The Hobbit",
        genre="Fantasy Classics Fiction",
        book_cover="/images/the-hobbit-cover.jpg",
        summary="""In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.
Written for J.R.R. Tolkien’s own children, The Hobbit met with instant critical acclaim when it was first published in 1937. Now recognized as a timeless classic, this introduction to the hobbit Bilbo Baggins, the wizard Gandalf, Gollum, and the spectacular world of Middle-earth recounts of the adventures of a reluctant hero, a powerful and dangerous ring, and the cruel dragon Smaug the Magnificent.
"""
    )
    book23 = Book(
        creator_id=1,
        author_first_name="Charlotte",
        author_last_name="Bronte",
        title="Jane Eyre",
        genre="Classics Fiction Romance Historical",
        book_cover="/images/jane-eyre-cover.jpg",
        summary="""A gothic masterpiece of tempestuous passions and dark secrets, Charlotte Brontë's Jane Eyre is edited with an introduction and notes by Stevie Davis in Penguin Classics.

Charlotte Brontë tells the story of orphaned Jane Eyre, who grows up in the home of her heartless aunt, enduring loneliness and cruelty. This troubled childhood strengthens Jane's natural independence and spirit - which prove necessary when she finds employment as a governess to the young ward of Byronic, brooding Mr Rochester. As her feelings for Rochester develop, Jane gradually uncovers Thornfield Hall's terrible secret, forcing her to make a choice. Should she stay with Rochester and live with the consequences, or follow her convictions - even if it means leaving the man she loves? A novel of intense power and intrigue, Jane Eyre dazzled readers with its passionate depiction of a woman's search for equality and freedom.
"""
    )
    book24 = Book(
        creator_id=1,
        author_first_name="William",
        author_last_name="Golding",
        title="The Lord of the Flies",
        genre="Classics Fiction YA Dystopia",
        book_cover="/images/lord-of-the-flies-cover.jpg",
        summary="""At the dawn of the next world war, a plane crashes on an uncharted island, stranding a group of schoolboys. At first, with no adult supervision, their freedom is something to celebrate; this far from civilization the boys can do anything they want. Anything. They attempt to forge their own society, failing, however, in the face of terror, sin and evil. And as order collapses, as strange howls echo in the night, as terror begins its reign, the hope of adventure seems as far from reality as the hope of being rescued. Labeled a parable, an allegory, a myth, a morality tale, a parody, a political treatise, even a vision of the apocalypse, Lord of the Flies is perhaps our most memorable novel about “the end of innocence, the darkness of man’s heart.”
"""
    )
    book25 = Book(
        creator_id=1,
        author_first_name="Louisa May",
        author_last_name="Alcott",
        title="Little Women",
        genre="Classics Fiction Historical YA",
        book_cover="/images/little-women-cover.jpg",
        summary="""Generations of readers young and old, male and female, have fallen in love with the March sisters of Louisa May Alcott’s most popular and enduring novel, Little Women. Here are talented tomboy and author-to-be Jo, tragically frail Beth, beautiful Meg, and romantic, spoiled Amy, united in their devotion to each other and their struggles to survive in New England during the Civil War.
It is no secret that Alcott based Little Women on her own early life. While her father, the freethinking reformer and abolitionist Bronson Alcott, hobnobbed with such eminent male authors as Emerson, Thoreau, and Hawthorne, Louisa supported herself and her sisters with "woman’s work,” including sewing, doing laundry, and acting as a domestic servant. But she soon discovered she could make more money writing. Little Women brought her lasting fame and fortune, and far from being the "girl’s book” her publisher requested, it explores such timeless themes as love and death, war and peace, the conflict between personal ambition and family responsibilities, and the clash of cultures between Europe and America.
"""
    )
    book26 = Book(
        creator_id=1,
        author_first_name="Ray",
        author_last_name="Bradbury",
        title="Fahrenheit 451",
        genre="Classics Fiction Science Fiction Dystopia",
        book_cover="/images/fahrenheit-451-cover.jpg",
        summary="""Guy Montag is a fireman. His job is to destroy the most illegal of commodities, the printed book, along with the houses in which they are hidden. Montag never questions the destruction and ruin his actions produce, returning each day to his bland life and wife, Mildred, who spends all day with her television “family.” But when he meets an eccentric young neighbor, Clarisse, who introduces him to a past where people didn’t live in fear and to a present where one sees the world through the ideas in books instead of the mindless chatter of television, Montag begins to question everything he has ever known.
"""
    )
    book27 = Book(
        creator_id=1,
        author_first_name="Emily",
        author_last_name="Bronte",
        title="Wuthering Heights",
        genre="Classics Fiction Romance Gothic",
        book_cover="/images/wuthering-heights-cover.jpg",
        summary="""At the centre of this novel is the passionate love between Catherine Earnshaw and Heathcliff - recounted with such emotional intensity that a plain tale of the Yorkshire moors acquires the depth and simplicity of ancient tragedy.
"""
    )
    book28 = Book(
        creator_id=1,
        author_first_name="Victor",
        author_last_name="Hugo",
        title="Les Miserables",
        genre="Classics Fiction Historical",
        book_cover="/images/les-miserables-cover.jpg",
        summary="""Victor Hugo's tale of injustice, heroism and love follows the fortunes of Jean Valjean, an escaped convict determined to put his criminal past behind him. But his attempts to become a respected member of the community are constantly put under threat: by his own conscience, when, owing to a case of mistaken identity, another man is arrested in his place; and by the relentless investigations of the dogged Inspector Javert. It is not simply for himself that Valjean must stay free, however, for he has sworn to protect the baby daughter of Fantine, driven to prostitution by poverty.
"""
    )
    book29 = Book(
        creator_id=1,
        author_first_name="Aldous",
        author_last_name="Huxley",
        title="Brave New World",
        genre="Classics Fiction Science Fiction Dystopia",
        book_cover="/images/brave-new-world-cover.jpg",
        summary="""The astonishing novel Brave New World, originally published in 1932, presents Aldous Huxley's vision of the future--of a world utterly transformed. Through the most efficient scientific and psychological engineering, people are genetically designed to be passive and therefore consistently useful to the ruling class. This powerful work of speculative fiction sheds a blazing critical light on the present and is considered to be Aldous Huxley's most enduring masterpiece.
"""
    )
    book30 = Book(
        creator_id=1,
        author_first_name="L.M.",
        author_last_name="Montgomery",
        title="Anne of Green Gables",
        genre="Classics Fiction YA Historical",
        book_cover="/images/anne-of-green-gables-cover.jpg",
        summary="""This heartwarming story has beckoned generations of readers into the special world of Green Gables, an old-fashioned farm outside a town called Avonlea. Anne Shirley, an eleven-year-old orphan, has arrived in this verdant corner of Prince Edward Island only to discover that the Cuthberts—elderly Matthew and his stern sister, Marilla—want to adopt a boy, not a feisty redheaded girl. But before they can send her back, Anne—who simply must have more scope for her imagination and a real home—wins them over completely. A much-loved classic that explores all the vulnerability, expectations, and dreams of a child growing up, Anne of Green Gables is also a wonderful portrait of a time, a place, a family… and, most of all, love.
"""
    )
    book31 = Book(
        creator_id=1,
        author_first_name="Alexandre",
        author_last_name="Dumas",
        title="The Count of Monte Cristo",
        genre="Classics Fiction Historical Adventure",
        book_cover="/images/the-count-of-monte-cristo-cover.jpg",
        summary="""Thrown in prison for a crime he has not committed, Edmond Dantès is confined to the grim fortress of If. There he learns of a great hoard of treasure hidden on the Isle of Monte Cristo and he becomes determined not only to escape, but also to unearth the treasure and use it to plot the destruction of the three men responsible for his incarceration. Dumas’ epic tale of suffering and retribution, inspired by a real-life case of wrongful imprisonment, was a huge popular success when it was first serialized in the 1840s.

Robin Buss’s lively English translation is complete and unabridged, and remains faithful to the style of Dumas’s original. This edition includes an introduction, explanatory notes and suggestions for further reading.
"""
    )
    book32 = Book(
        creator_id=1,
        author_first_name="Orson Scott",
        author_last_name="Card",
        title="Ender's Game",
        genre="Fiction Science Fiction YA",
        book_cover="/images/enders-game-cover.jpg",
        summary="""Andrew "Ender" Wiggin thinks he is playing computer simulated war games; he is, in fact, engaged in something far more desperate. The result of genetic experimentation, Ender may be the military genius Earth desperately needs in a war against an alien enemy seeking to destroy all human life. The only way to find out is to throw Ender into ever harsher training, to chip away and find the diamond inside, or destroy him utterly. Ender Wiggin is six years old when it begins. He will grow up fast.

But Ender is not the only result of the experiment. The war with the Buggers has been raging for a hundred years, and the quest for the perfect general has been underway almost as long. Ender's two older siblings, Peter and Valentine, are every bit as unusual as he is, but in very different ways. While Peter was too uncontrollably violent, Valentine very nearly lacks the capability for violence altogether. Neither was found suitable for the military's purpose. But they are driven by their jealousy of Ender, and by their inbred drive for power. Peter seeks to control the political process, to become a ruler. Valentine's abilities turn more toward the subtle control of the beliefs of commoner and elite alike, through powerfully convincing essays. Hiding their youth and identities behind the anonymity of the computer networks, these two begin working together to shape the destiny of Earth-an Earth that has no future at all if their brother Ender fails.
"""
    )
    book33 = Book(
        creator_id=1,
        author_first_name="Charles",
        author_last_name="Dickens",
        title="A Tale of Two Cities",
        genre="Classics Fiction Historical",
        book_cover="/images/a-tale-of-two-cities-cover.jpg",
        summary="""A Tale of Two Cities is Charles Dickens’s great historical novel, set against the violent upheaval of the French Revolution. The most famous and perhaps the most popular of his works, it compresses an event of immense complexity to the scale of a family history, with a cast of characters that includes a bloodthirsty ogress and an antihero as believably flawed as any in modern fiction. Though the least typical of the author’s novels, A Tale of Two Cities still underscores many of his enduring themes—imprisonment, injustice, social anarchy, resurrection, and the renunciation that fosters renewal.
"""
    )
    book34 = Book(
        creator_id=1,
        author_first_name="Margaret",
        author_last_name="Atwood",
        title="The Handmaid's Tale",
        genre="Fiction Classics Dystopia Science Fiction",
        book_cover="/images/the-handmaids-tale-cover.jpg",
        summary="""Offred is a Handmaid in the Republic of Gilead. She may leave the home of the Commander and his wife once a day to walk to food markets whose signs are now pictures instead of words because women are no longer allowed to read. She must lie on her back once a month and pray that the Commander makes her pregnant, because in an age of declining births, Offred and the other Handmaids are valued only if their ovaries are viable. Offred can remember the years before, when she lived and made love with her husband, Luke; when she played with and protected her daughter; when she had a job, money of her own, and access to knowledge. But all of that is gone now…
"""
    )
    book35 = Book(
        creator_id=1,
        author_first_name="Leo",
        author_last_name="Tolstoy",
        title="Anna Karenina",
        genre="Classics Fiction Romance",
        book_cover="/images/anna-karenina-cover.jpg",
        summary="""Acclaimed by many as the world's greatest novel, Anna Karenina provides a vast panorama of contemporary life in Russia and of humanity in general. In it Tolstoy uses his intense imaginative insight to create some of the most memorable characters in all of literature. Anna is a sophisticated woman who abandons her empty existence as the wife of Karenin and turns to Count Vronsky to fulfil her passionate nature - with tragic consequences. Levin is a reflection of Tolstoy himself, often expressing the author's own views and convictions.

Throughout, Tolstoy points no moral, merely inviting us not to judge but to watch. As Rosemary Edmonds comments, 'He leaves the shifting patterns of the kaleidoscope to bring home the meaning of the brooding words following the title, 'Vengeance is mine, and I will repay.
"""
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
    db.session.add(book15)
    db.session.add(book16)
    db.session.add(book17)
    db.session.add(book18)
    db.session.add(book19)
    db.session.add(book20)
    db.session.add(book21)
    db.session.add(book22)
    db.session.add(book23)
    db.session.add(book24)
    db.session.add(book25)
    db.session.add(book26)
    db.session.add(book27)
    db.session.add(book28)
    db.session.add(book29)
    db.session.add(book30)
    db.session.add(book31)
    db.session.add(book32)
    db.session.add(book33)
    db.session.add(book34)
    db.session.add(book35)
    db.session.commit()

    
    

    
    
    

def unseed_books():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()
