DROP TABLE IF EXISTS covers, books;

CREATE TABLE books(
	book_id SERIAL PRIMARY KEY NOT NULL,
	isbn VARCHAR(102) UNIQUE NOT NULL,
	author VARCHAR(102) NOT NULL,
	title VARCHAR(255) NOT NULL,
	descriptions TEXT NOT NULL,
	rating NUMERIC NOT NULL,
	read_on DATE NOT NUll
);

CREATE TABLE covers(
	cover_id SERIAL PRIMARY KEY,
	imageurl VARCHAR(255) UNIQUE NOT NULL,
	isbn VARCHAR(102) REFERENCES books(isbn)
	ON DELETE CASCADE 
);

INSERT INTO books (author, title, descriptions, rating, isbn, read_on)
VALUES 
('Masashi Kishimoto ', 'Naruto, Volume 1', 'Naruto is a young shinobi with an incorrigible knack for mischief. He got a wild sense of humor, but Naruto is completely serious about his mission to be the worlds greatest ninja! Twelve years ago the Village Hidden in the Leaves was attacked by a fearsome threat. A nine-tailed fox spirit claimed the life of the village leader, the Hokage, and many others. Today, the village is at peace and a troublemaking kid named Naruto is struggling to graduate from Ninja Academy. His goal may be to become the next Hokage, but his true destiny will be much more complicated. The adventure begins now!', 10, '9781569319000', '2000-06-09'),
('Eiichiro Oda ', 'One Piece, Vol. 1: Romance Dawn', 'Join Monkey D. Luffy and his swashbuckling crew in their search for the ultimate treasure, One Piece! As a child, Monkey D. Luffy dreamed of becoming King of the Pirates. But his life changed when he accidentally gained the power to stretch like rubber...at the cost of never being able to swim again! Years, later, Luffy sets off in search of the “One Piece,” said to be the greatest treasure in the world... As a child, Monkey D. Luffy was inspired to become a pirate by listening to the tales of the buccaneer "Red-Haired" Shanks. But his life changed when Luffy accidentally ate the Gum-Gum Devil Fruit and gained the power to stretch like rubber...at the cost of never being able to swim again! Years later, still vowing to become the king of the pirates, Luffy sets out on his adventure...one guy alone in a rowboat, in search of the legendary "One Piece," said to be the greatest treasure in the world...', 9.5, '9781569319017', '2024-07-05'),
(' Kohei Horikoshi', 'My Hero Academia, Vol. 1', 'Midoriya inherits the superpower of the worlds greatest hero, but greatness wont come easy. What would the world be like if 80 percent of the population manifested superpowers called “Quirks”? Heroes and villains would be battling it out everywhere! Being a hero would mean learning to use your power, but where would you go to study? The Hero Academy of course! But what would you do if you were one of the 20 percent who were born Quirkless? Middle school student Izuku Midoriya wants to be a hero more than anything, but he hasnt got an ounce of power in him. With no chance of ever getting into the prestigious U.A. High School for budding heroes, his life is looking more and more like a dead end. Then an encounter with All Might, the greatest hero of them all, gives him a chance to change his destiny...', 10, '9781421582696', '2024-07-04'),
('Koyoharu Gotouge', 'Demon Slayer: Kimetsu no Yaiba, Vol. 8', 'Tanjiro sets out on the path of the Demon Slayer to save his sister and avenge his family! In Taisho-era Japan, Tanjiro Kamado is a kindhearted boy who makes a living selling charcoal. But his peaceful life is shattered when a demon slaughters his entire family. His little sister Nezuko is the only survivor, but she has been transformed into a demon herself! Tanjiro sets out on a dangerous journey to find a way to return his sister to normal and destroy the demon who ruined his life. After dealing with several demonic enemies aboard the Infinity Train, Tanjiro, Zenitsu and Inosuke must face the demon spirit of the train itself! Even if they can stop the demon train, the minions of Muzan Kibutsuji are still out there and Tanjiro must continue to improve his strength and skills. Learning the secret of the Hikonami Kagura and Flame Breathing will give him a powerful new advantage.', 10, '9781974704422', '2024-08-09')
;

INSERT INTO covers (imageurl, isbn)
VALUES ('https://covers.openlibrary.org/b/isbn/9781569319000-M.jpg', '9781569319000'),
('https://covers.openlibrary.org/b/isbn/9781569319017-M.jpg', '9781569319017'),
('https://covers.openlibrary.org/b/isbn/9781421582696-M.jpg', '9781421582696'),
('https://covers.openlibrary.org/b/isbn/9781974704422-M.jpg', '9781974704422')
RETURNING *
;

SELECT * FROM books
JOIN covers
ON books.isbn = covers.isbn
ORDER BY rating DESC
;

