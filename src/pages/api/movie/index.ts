import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prismadb";


const movieData =
 [
      {
        "title": "Bad Boys: Ride or Die",
        "description": "After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.",
        "release_date": "2024-06-05",
        "poster_url":"https://image.tmdb.org/t/p/w500/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg",
        "age_rating": 18,
        "price": 15,
        "seats":
        [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "Deadpool & Wolverine",
        "description": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
        "release_date": "2024-07-24T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        "age_rating": 8,  // Approximate average rating
        "seats": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 12  // Placeholder
      },
      {
        "title": "Inside Out 2",
        "description": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
        "release_date": "2024-06-11T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
        "age_rating": 8,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        "price": 6  // Placeholder
      },
      {
        "title": "Despicable Me 4",
        "description": "Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Meanwhile, Gru faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
        "release_date": "2024-06-20T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
        "age_rating": 7,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Justice League: Crisis on Infinite Earths Part Three",
        "description": "Now fully revealed as the ultimate threat to existence, the Anti-Monitor wages an unrelenting attack on the surviving Earths that struggle for survival in a pocket universe. One by one, these worlds and all their inhabitants are vaporized! On the planets that remain, even time itself is shattered, and heroes from the past join the Justice League and their rag-tag allies against the epitome of evil. But as they make their last stand, will the sacrifice of the superheroes be enough to save us all?",
        "release_date": "2024-07-16T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/a3q8NkM8uTh9E23VsbUOdDSbBeN.jpg",
        "age_rating": 8,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "The Garfield Movie",
        "description": "Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father – scruffy street cat Vic – Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.",
        "release_date": "2024-04-30T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/p6AbOJvMQhBmffd0PIv0u8ghWeY.jpg",
        "age_rating": 7,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Deadpool",
        "description": "The origin story of former Special Forces operative turned mercenary Wade Wilson, who, after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.",
        "release_date": "2016-02-09T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/3E53WEZJqP6aM84D8CckXx4pIHw.jpg",
        "age_rating": 8,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "My Spy The Eternal City",
        "description": "JJ, a veteran CIA agent, reunites with his protégé Sophie, in order to prevent a catastrophic nuclear plot targeting the Vatican.",
        "release_date": "2024-07-18T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/Bf3vCfM94bSJ1saZlyi0UW0e0U.jpg",
        "age_rating": 7,  // Approximate average rating
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Kingdom of the Planet of the Apes",
        "description": "Several generations following Caesar's reign, apes – now the dominant species – live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all he's known about the past and to make choices that will define a future for apes and humans alike.",
        "release_date": "2024-05-08T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
        "age_rating": 7,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 6  // Placeholder
      },
      {
        "title": "Furiosa: A Mad Max Saga",
        "description": "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials as she puts together the means to find her way home.",
        "release_date": "2024-05-22T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
        "age_rating": 8,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 12  // Placeholder
      },
      {
        "title": "Descendants: The Rise of Red",
        "description": "After the Queen of Hearts incites a coup on Auradon, her rebellious daughter Red and Cinderella's perfectionist daughter Chloe join forces and travel back in time to try to undo the traumatic event that set Red's mother down her villainous path.",
        "release_date": "2024-07-11T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/8fYluTtB3b3HKO7KQa5tzrvGaps.jpg",
        "age_rating": 7,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Deadpool 2",
        "description": "Wisecracking mercenary Deadpool battles the evil and powerful Cable and other bad guys to save a boy's life.",
        "release_date": "2018-05-10T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/to0spRl1CMDvCztpKkrqQwK3R4M.jpg",
        "age_rating": 8,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Beverly Hills Cop: Axel F",
        "description": "Forty years after his unforgettable first case in Beverly Hills, Detroit cop Axel Foley returns to do what he does best: solve crimes and cause chaos.",
        "release_date": "2024-06-20",
        "poster_url": "https://image.tmdb.org/t/p/original/zszRKfzjM5jltiq8rk6rasKVpUv.jpg",
        "age_rating": 17,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        "price": null  // Placeholder; adjust based on available data
      },
      {
        "title": "Monkey Man",
        "description": "Kid is an anonymous young man who ekes out a meager living in an underground fight club where, night after night, wearing a gorilla mask, he is beaten bloody by more popular fighters for cash. After years of suppressed rage, Kid discovers a way to infiltrate the enclave of the city’s sinister elite. As his childhood trauma boils over, his mysteriously scarred hands unleash an explosive campaign of retribution to settle the score with the men who took everything from him.",
        "release_date": "2024-04-03",
        "poster_url": "https://image.tmdb.org/t/p/original/4lhR4L2vzzjl68P1zJyCH755Oz4.jpg",
        "age_rating": 7,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Once Upon a Deadpool",
        "description": "A kidnapped Fred Savage is forced to endure Deadpool's PG-13 rendition of Deadpool 2 as a Princess Bride-esque story that's full of magic, wonder & zero F's.",
        "release_date": "2018-12-11",
        "poster_url": "https://image.tmdb.org/t/p/original/5Ka49BWWyKMXr93YMbH5wLN7aAM.jpg",
        "age_rating": 7.1,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Underground Monster",
        "description": "Near a remote town, the repeated dumping of toxic waste causes an underground cave dweller to mutate into a hideous monster. A construction team that is digging a tunnel accidentally disturb the creature's habitat causing it to attack.",
        "release_date": "2023-04-27",
        "poster_url": "https://image.tmdb.org/t/p/original/lWVwWRLqpS1OaNg7KT0ZecSW0PK.jpg",
        "age_rating": 3.7,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "The Last Horizon",
        "description": "In a dystopian future where Earth's environment is collapsing, a team of scientists ventures into a perilous wasteland to find a rumored safe zone. Along the way, they uncover dark secrets that could change the fate of humanity.",
        "release_date": "2024-05-30",
        "poster_url": "https://image.tmdb.org/t/p/original/6gakVJ2UCRXZBrIq5ZLe6W0umQc.jpg",
        "age_rating": 7.5,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Echoes of the Past",
        "description": "A detective haunted by his own dark past is called to investigate a series of mysterious disappearances in a small town. As he delves deeper, he realizes the cases are connected to his own buried secrets.",
        "release_date": "2024-03-15",
        "poster_url": "https://image.tmdb.org/t/p/original/5H55w3kNGUtQvZfb6rZyAfaKmga.jpg",
        "age_rating": 7.9,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        "price": null  // Placeholder; adjust based on available data
      },
      {
        "title": "Galactic Odyssey",
        "description": "A space explorer teams up with an alien diplomat to stop a galactic war. Their journey takes them across various planets, encountering strange civilizations and facing perilous challenges.",
        "release_date": "2024-08-09",
        "poster_url": "https://image.tmdb.org/t/p/original/2pD0ZLZ5l4z0e4XbIj2CEcwnNjH.jpg",
        "age_rating": 8.3,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "The Secret Chamber",
        "description": "An archaeologist discovers a hidden chamber in an ancient ruin. As she unravels its mysteries, she awakens a dormant curse that threatens to unleash ancient evils upon the modern world.",
        "release_date": "2024-02-14",
        "poster_url": "https://image.tmdb.org/t/p/original/kjHk0f8pl7HQnR9jT7hlzMNk5Ak.jpg",
        "age_rating": 6.7,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Handling the Undead",
        "description": "On a hot summer day in Oslo, the dead mysteriously awaken, and three families are thrown into chaos when their deceased loved ones come back to them. Who are they, and what do they want?",
        "release_date": "2024-02-09T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/6XlHOx0JQNgYjuJ4YQKbrt4Gd4d.jpg",
        "age_rating": 7,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "The Convert",
        "description": "Munro, a soldier turned lay preacher, comes to New Zealand to minister to the first British colonists, but he is converted by the powerful chief Maianui to serve a different purpose.",
        "release_date": "2024-03-14T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/e5ZqqPlhKstzB4geibpZh38w7Pq.jpg",
        "age_rating": 7,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Horizon: An American Saga - Chapter 1",
        "description": "Follow the story of how the Old West was won—and lost—through the blood, sweat and tears of many. Spanning 15 years before, during and following the Civil War from 1859 to 1874, embark on an emotional journey across a country at war with itself, experienced through the lens of families, friends and foes all attempting to discover what it truly means to be the United States of America.",
        "release_date": "2024-06-26T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/tMI9SGttUJP96GbIIJOAaaCMkFe.jpg",
        "age_rating": 7,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Logan",
        "description": "In the near future, a weary Logan cares for an ailing Professor X in a hideout on the Mexican border. But Logan's attempts to hide from the world and his legacy are upended when a young mutant arrives, pursued by dark forces.",
        "release_date": "2017-02-28T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/fnbjcRDYn6YviCcePDnGdyAkYsB.jpg",
        "age_rating": 8,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Kleks Academy",
        "description": "A seemingly ordinary girl finds her way into the eponymous Academy to explore the world of fairy tales, imagination and creativity. With the help of a crazy, talented teacher, she develops her unique abilities and also stumbles upon a clue that will help her unravel the biggest secret of the family...",
        "release_date": "2024-01-05T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/ymbECZscR8BTkdvXziSinMIckAz.jpg",
        "age_rating": 6,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Coraline",
        "description": "Wandering her rambling old house in her boring new town, 11-year-old Coraline discovers a hidden door to a strangely idealized version of her life. In order to stay in the fantasy, she must make a frighteningly real sacrifice.",
        "release_date": "2009-02-05T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/4jeFXQYytChdZYE9JYO7Un87IlW.jpg",
        "age_rating": 8,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Ultraman: Rising",
        "description": "A star athlete reluctantly returns home to take over his father's duties as Ultraman, shielding Tokyo from giant monsters as he becomes a legendary hero.",
        "release_date": "2024-06-14T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/yy4PktMbJfMp4H8GFAssBxHt0tY.jpg",
        "age_rating": 8,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Despicable Me",
        "description": "Villainous Gru lives up to his reputation as a despicable, deplorable and downright unlikable guy when he hatches a plan to steal the moon from the sky. But he has a tough time staying on task after three orphans land in his care.",
        "release_date": "2010-07-08T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/9lOloREsAhBu0pEtU0BgeR1rHyo.jpg",
        "age_rating": 7,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Late Night with the Devil",
        "description": "A live broadcast of a late-night talk show in 1977 goes horribly wrong, unleashing evil into the nation's living rooms.",
        "release_date": "2024-03-19T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/jGY62i0D0zitaGz4Ema7vTEYIXw.jpg",
        "age_rating": 7,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Damsel",
        "description": "A young woman's marriage to a charming prince turns into a fierce fight for survival when she's offered up as a sacrifice to a fire-breathing dragon.",
        "release_date": "2024-03-07T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/AgHbB9DCE9aE57zkHjSmseszh6e.jpg",
        "age_rating": 7,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Oppenheimer",
        "description": "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
        "release_date": "2023-07-19T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        "age_rating": 8,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Wish",
        "description": "Asha, a sharp-witted idealist, makes a wish so powerful that it is answered by a cosmic force – a little ball of boundless energy called Star. Together, Asha and Star confront a most formidable foe - the ruler of Rosas, King Magnifico - to save her community and prove that when the will of one courageous human connects with the magic of the stars, wondrous things can happen.",
        "release_date": "2023-11-13T00:00:00.000Z",
        "poster_url": "https://image.tmdb.org/t/p/original/vgJZSqKMXWDDx09iSIStGKfHMku.jpg",
        "age_rating": 6,  // Approximate average rating
        "seats":         [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

        "price": 10  // Placeholder
      },
      {
        "title": "Godzilla Minus One",
        "description": "In postwar Japan, Godzilla brings new devastation to an already scorched landscape. With no military intervention or government help in sight, the survivors must join together in the face of despair and fight back against an unrelenting horror.",
        "release_date": "2023-11-03",
        "poster_url": "https://image.tmdb.org/t/p/w500/hkxxMIGaiCTmrEArK7J56JTKUlB.jpg",
        "age_rating": 17,  // Approximate average rating
        "price": 11,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "Canceled",
        "description": "Gone Ghosting is a popular ghost hunting team that earned millions from live broadcasts and selling merch. Lise, Catta, Sandro, and Polly join the group to live-stream a ghost hunt to prove that everything is real. They break into a place where legend says everyone has died and do the craziest broadcast ever live.",
        "release_date": "2023-08-25",
        "poster_url": "https://image.tmdb.org/t/p/w500/kgtDMp1Qut4M92g2yTdX2YL9zh8.jpg",
        "age_rating": 17,  // Approximate average rating
        "price": 11,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "No Way Up",
        "description": "Characters from different backgrounds are thrown together when the plane they're travelling on crashes into the Pacific Ocean. A nightmare fight for survival ensues with the air supply running out and dangers creeping in from all sides.",
        "release_date": "2024-01-18",
        "poster_url": "https://image.tmdb.org/t/p/w500/hu40Uxp9WtpL34jv3zyWLb5zEVY.jpg",
        "age_rating": 17,  // Approximate average rating
        "price": 11,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "John Wick: Chapter 4",
        "description": "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
        "release_date": "2023-03-22",
        "poster_url": "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        "age_rating": 17,  // Approximate average rating
        "price": 11,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "Young Woman and the Sea",
        "description": "This is the extraordinary true story of Trudy Ederle, the first woman to successfully swim the English Channel. Through the steadfast support of her older sister and supportive trainers, she overcame adversity and the animosity of a patriarchal society to rise through the ranks of the Olympic swimming team and complete the 21-mile trek from France to England.",
        "release_date": "2024-05-31",
        "poster_url": "https://image.tmdb.org/t/p/w500/bZlecCuBVvKuarNGvchBwaOsQ3c.jpg",
        "age_rating": 17,  // Approximate average rating
        "price": 11,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "Elemental",
        "description": "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
        "release_date": "2023-06-14",
        "poster_url": "https://image.tmdb.org/t/p/w500/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg",
        "age_rating": 17,  // Approximate average rating
        "price": 11,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "The First Omen",
        "description": "When a young American woman is sent to Rome to begin a life of service to the church, she encounters a darkness that causes her to question her own faith and uncovers a terrifying conspiracy that hopes to bring about the birth of evil incarnate.",
        "release_date": "2024-04-03",
        "poster_url": "https://image.tmdb.org/t/p/w500/uGyiewQnDHPuiHN9V4k2t9QBPnh.jpg",
        "age_rating": 17,  // Approximate average rating
        "price": 11,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "Fast X",
        "description": "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
        "release_date": "2023-05-17",
        "poster_url": "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
        "age_rating": 17,  // Approximate average rating
        "price": 11,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "Spider-Man: No Way Home",
        "description": "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
        "release_date": "2021-12-15",
        "poster_url": "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        "age_rating": 17,  // Approximate average rating
        "price": 11,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "The Roundup: No Way Out",
        "description": "Detective Ma Seok-do changes his affiliation from the Geumcheon Police Station to the Metropolitan Investigation Team, in order to eradicate Japanese gangsters who enter Korea to commit heinous crimes.",
        "release_date": "2023-05-31",
        "poster_url": "https://image.tmdb.org/t/p/w500/lW6IHrtaATxDKYVYoQGU5sh0OVm.jpg",
        "age_rating": 17,  // Approximate average rating
        "price": 11,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "Bad Boys for Life",
        "description": "Marcus and Mike are forced to confront new threats, career changes, and midlife crises as they join the newly created elite team AMMO of the Miami police department to take down the ruthless Armando Armas, the vicious leader of a Miami drug cartel.",
        "release_date": "2020-01-15",
        "poster_url": "https://image.tmdb.org/t/p/w500/y95lQLnuNKdPAzw9F9Ab8kJ80c3.jpg",
        "age_rating": 10,
        "price": 31,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "The Super Mario Bros. Movie",
        "description": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
        "release_date": "2023-04-05",
        "poster_url": "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
        "age_rating": 12,
        "price": 21,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "Madame Web",
        "description": "Forced to confront revelations about her past, paramedic Cassandra Webb forges a relationship with three young women destined for powerful futures...if they can all survive a deadly present.",
        "release_date": "2024-02-14",
        "poster_url": "https://image.tmdb.org/t/p/w500/rULWuutDcN5NvtiZi4FRPzRYWSh.jpg",
        "age_rating": 8,
        "price": 11,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "Wonka",
        "description": "Willy Wonka – chock-full of ideas and determined to change the world one delectable bite at a time – is proof that the best things in life begin with a dream, and if you’re lucky enough to meet Willy Wonka, anything is possible.",
        "release_date": "2023-12-06",
        "poster_url": "https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
        "age_rating": 17,  // Approximate average rating
        "price": 11,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      },
      {
        "title": "Alienoid",
        "description": "Gurus in the late Goryeo dynasty try to obtain a fabled, holy sword, and humans in 2022 hunt down an alien prisoner that is locked in a human's body. The lives of these people become tangled as they find out about their shared destiny.",
        "release_date": "2023-07-28",
        "poster_url": "https://image.tmdb.org/t/p/w500/x9vVxOvHRgTA1gkH8dESRlKqrp0.jpg",
        "age_rating": 17,  // Approximate average rating
        "price": 11,
        "seats":  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
      }

    
]

export default async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    const movie = await prisma.movie.findMany();

    if (movie) {
      response.setHeader('Cache-Control', 'no-store, max-age=0');
      return response.status(200).json(movie);
    } else {
      // Movie not found
      return response.status(404).json({ error: "Movie not found" });
    }
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Internal Server Error" });
  }
}
