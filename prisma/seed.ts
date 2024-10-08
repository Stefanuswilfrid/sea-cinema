import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const movieData = [
  {
    title: "Bad Boys: Ride or Die",
    description:
      "After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.",
    release_date: new Date("2024-07-31"),
    poster_url:
      "/poster/bad_boys.jpg",
    age_rating: 18,
    price: 15,
  },
  {
    title: "Deadpool & Wolverine",
    description:
      "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
    release_date: new Date("2024-07-31"),
    poster_url:
      "/poster/deadpool_wolverine.jpg",
    age_rating: 8, // Approximate average rating

    price: 12, // Placeholder
  },
  {
    title: "Inside Out 2",
    description:
      "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
    release_date: new Date("2024-07-31"),
    poster_url:
      "/poster/inside_out.jpg",
    age_rating: 8, // Approximate average rating
    price: 6, // Placeholder
  },
  {
    title: "Despicable Me 4",
    description:
      "Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Meanwhile, Gru faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/despicable_me_4.jpg",
    age_rating: 7, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Justice League: Crisis on Infinite Earths Part Three",
    description:
      "Now fully revealed as the ultimate threat to existence, the Anti-Monitor wages an unrelenting attack on the surviving Earths that struggle for survival in a pocket universe. One by one, these worlds and all their inhabitants are vaporized! On the planets that remain, even time itself is shattered, and heroes from the past join the Justice League and their rag-tag allies against the epitome of evil. But as they make their last stand, will the sacrifice of the superheroes be enough to save us all?",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/justice_league_crisis.jpg",
    age_rating: 8, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "The Garfield Movie",
    description:
      "Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father – scruffy street cat Vic – Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/garfield.jpg",
    age_rating: 7, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Deadpool",
    description:
      "The origin story of former Special Forces operative turned mercenary Wade Wilson, who, after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/deadpool.jpg",
    age_rating: 8, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "My Spy The Eternal City",
    description:
      "JJ, a veteran CIA agent, reunites with his protégé Sophie, in order to prevent a catastrophic nuclear plot targeting the Vatican.",
    release_date: new Date("2024-07-31"),
    poster_url:"/poster/my_spy.jpg",
    age_rating: 7, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Kingdom of the Planet of the Apes",
    description:
      "Several generations following Caesar's reign, apes – now the dominant species – live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all he's known about the past and to make choices that will define a future for apes and humans alike.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/kingdom_apes.jpg",
    age_rating: 7, // Approximate average rating

    price: 6, // Placeholder
  },
  {
    title: "Furiosa: A Mad Max Saga",
    description:
      "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials as she puts together the means to find her way home.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/furiosa.jpg",
    age_rating: 8, // Approximate average rating

    price: 12, // Placeholder
  },
  {
    title: "Descendants: The Rise of Red",
    description:
      "After the Queen of Hearts incites a coup on Auradon, her rebellious daughter Red and Cinderella's perfectionist daughter Chloe join forces and travel back in time to try to undo the traumatic event that set Red's mother down her villainous path.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/descendants.jpg",
    age_rating: 7, // Approximate average rating

    price: 10, // Placeholder
  },

  {
    title: "Beverly Hills Cop: Axel F",
    description:
      "Forty years after his unforgettable first case in Beverly Hills, Detroit cop Axel Foley returns to do what he does best: solve crimes and cause chaos.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/beverly_cop.jpg",
    age_rating: 17, // Approximate average rating
    price: null, // Placeholder; adjust based on available data
  },
  {
    title: "Monkey Man",
    description:
      "Kid is an anonymous young man who ekes out a meager living in an underground fight club where, night after night, wearing a gorilla mask, he is beaten bloody by more popular fighters for cash. After years of suppressed rage, Kid discovers a way to infiltrate the enclave of the city’s sinister elite. As his childhood trauma boils over, his mysteriously scarred hands unleash an explosive campaign of retribution to settle the score with the men who took everything from him.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/monkey_man.jpg",
    age_rating: 7, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Once Upon a Deadpool",
    description:
      "A kidnapped Fred Savage is forced to endure Deadpool's PG-13 rendition of Deadpool 2 as a Princess Bride-esque story that's full of magic, wonder & zero F's.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/once_deadpool.jpg",
    age_rating: 7.1, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Underground Monster",
    description:
      "Near a remote town, the repeated dumping of toxic waste causes an underground cave dweller to mutate into a hideous monster. A construction team that is digging a tunnel accidentally disturb the creature's habitat causing it to attack.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/underground_monster.jpg",
    age_rating: 3.7, // Approximate average rating

    price: 10, // Placeholder
  },
  
  {
    title: "Handling the Undead",
    description:
      "On a hot summer day in Oslo, the dead mysteriously awaken, and three families are thrown into chaos when their deceased loved ones come back to them. Who are they, and what do they want?",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/handling_undead.jpg",
    age_rating: 7, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "The Convert",
    description:
      "Munro, a soldier turned lay preacher, comes to New Zealand to minister to the first British colonists, but he is converted by the powerful chief Maianui to serve a different purpose.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/convert.jpg",
    age_rating: 7, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Horizon: An American Saga - Chapter 1",
    description:
      "Follow the story of how the Old West was won—and lost—through the blood, sweat and tears of many. Spanning 15 years before, during and following the Civil War from 1859 to 1874, embark on an emotional journey across a country at war with itself, experienced through the lens of families, friends and foes all attempting to discover what it truly means to be the United States of America.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/horizon.jpg",
    age_rating: 7, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Logan",
    description:
      "In the near future, a weary Logan cares for an ailing Professor X in a hideout on the Mexican border. But Logan's attempts to hide from the world and his legacy are upended when a young mutant arrives, pursued by dark forces.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/logan.jpg",
    age_rating: 8, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Kleks Academy",
    description:
      "A seemingly ordinary girl finds her way into the eponymous Academy to explore the world of fairy tales, imagination and creativity. With the help of a crazy, talented teacher, she develops her unique abilities and also stumbles upon a clue that will help her unravel the biggest secret of the family...",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/kleks_academy.jpg",
    age_rating: 6, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Coraline",
    description:
      "Wandering her rambling old house in her boring new town, 11-year-old Coraline discovers a hidden door to a strangely idealized version of her life. In order to stay in the fantasy, she must make a frighteningly real sacrifice.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/coraline.jpg",
    age_rating: 8, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Ultraman: Rising",
    description:
      "A star athlete reluctantly returns home to take over his father's duties as Ultraman, shielding Tokyo from giant monsters as he becomes a legendary hero.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/ultraman.jpg",
    age_rating: 8, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Despicable Me",
    description:
      "Villainous Gru lives up to his reputation as a despicable, deplorable and downright unlikable guy when he hatches a plan to steal the moon from the sky. But he has a tough time staying on task after three orphans land in his care.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/despicable.jpg",
    age_rating: 7, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Late Night with the Devil",
    description:
      "A live broadcast of a late-night talk show in 1977 goes horribly wrong, unleashing evil into the nation's living rooms.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/late_devil.jpg",
    age_rating: 7, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Damsel",
    description:
      "A young woman's marriage to a charming prince turns into a fierce fight for survival when she's offered up as a sacrifice to a fire-breathing dragon.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/damsel.jpg",
    age_rating: 7, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Oppenheimer",
    description:
      "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/oppenheimer.jpg",
    age_rating: 8, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Wish",
    description:
      "Asha, a sharp-witted idealist, makes a wish so powerful that it is answered by a cosmic force – a little ball of boundless energy called Star. Together, Asha and Star confront a most formidable foe - the ruler of Rosas, King Magnifico - to save her community and prove that when the will of one courageous human connects with the magic of the stars, wondrous things can happen.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/wish.jpg",
    age_rating: 6, // Approximate average rating

    price: 10, // Placeholder
  },
  {
    title: "Godzilla Minus One",
    description:
      "In postwar Japan, Godzilla brings new devastation to an already scorched landscape. With no military intervention or government help in sight, the survivors must join together in the face of despair and fight back against an unrelenting horror.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/godzilla1.jpg",
    age_rating: 17, // Approximate average rating
    price: 11,
  },
  {
    title: "Canceled",
    description:
      "Gone Ghosting is a popular ghost hunting team that earned millions from live broadcasts and selling merch. Lise, Catta, Sandro, and Polly join the group to live-stream a ghost hunt to prove that everything is real. They break into a place where legend says everyone has died and do the craziest broadcast ever live.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/canceled.jpg",
    age_rating: 17, // Approximate average rating
    price: 11,
  },
  {
    title: "No Way Up",
    description:
      "Characters from different backgrounds are thrown together when the plane they're travelling on crashes into the Pacific Ocean. A nightmare fight for survival ensues with the air supply running out and dangers creeping in from all sides.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/noway.jpg",
    age_rating: 17, // Approximate average rating
    price: 11,
  },
  {
    title: "John Wick: Chapter 4",
    description:
      "With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/jwick.jpg",
    age_rating: 17, // Approximate average rating
    price: 11,
  },
  {
    title: "Young Woman and the Sea",
    description:
      "This is the extraordinary true story of Trudy Ederle, the first woman to successfully swim the English Channel. Through the steadfast support of her older sister and supportive trainers, she overcame adversity and the animosity of a patriarchal society to rise through the ranks of the Olympic swimming team and complete the 21-mile trek from France to England.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/youngwoman.jpg",
    age_rating: 17, // Approximate average rating
    price: 11,
  },
  {
    title: "Elemental",
    description:
      "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/elementa;.jpg",
    age_rating: 17, // Approximate average rating
    price: 11,
  },
  {
    title: "The First Omen",
    description:
      "When a young American woman is sent to Rome to begin a life of service to the church, she encounters a darkness that causes her to question her own faith and uncovers a terrifying conspiracy that hopes to bring about the birth of evil incarnate.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/omen.jpg",
    age_rating: 17, // Approximate average rating
    price: 11,
  },
  {
    title: "Fast X",
    description:
      "Over many missions and against impossible odds, Dom Toretto and his family have outsmarted, out-nerved and outdriven every foe in their path. Now, they confront the most lethal opponent they've ever faced: A terrifying threat emerging from the shadows of the past who's fueled by blood revenge, and who is determined to shatter this family and destroy everything—and everyone—that Dom loves, forever.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/fast.jpg",
    age_rating: 17, // Approximate average rating
    price: 11,
  },
  {
    title: "Spider-Man: No Way Home",
    description:
      "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/spiderman.jpg",
    age_rating: 17, // Approximate average rating
    price: 11,
  },
  {
    title: "The Roundup: No Way Out",
    description:
      "Detective Ma Seok-do changes his affiliation from the Geumcheon Police Station to the Metropolitan Investigation Team, in order to eradicate Japanese gangsters who enter Korea to commit heinous crimes.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/roundup.jpg",
    age_rating: 17, // Approximate average rating
    price: 11,
  },
  {
    title: "Bad Boys for Life",
    description:
      "Marcus and Mike are forced to confront new threats, career changes, and midlife crises as they join the newly created elite team AMMO of the Miami police department to take down the ruthless Armando Armas, the vicious leader of a Miami drug cartel.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/bad_boys_2.jpg",
    age_rating: 10,
    price: 31,
  },
  {
    title: "The Super Mario Bros. Movie",
    description:
      "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/super_mario.jpg",
    age_rating: 12,
    price: 21,
  },
  {
    title: "Madame Web",
    description:
      "Forced to confront revelations about her past, paramedic Cassandra Webb forges a relationship with three young women destined for powerful futures...if they can all survive a deadly present.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/madame_web.jpg",
    age_rating: 8,
    price: 11,
  },
  {
    title: "Wonka",
    description:
      "Willy Wonka – chock-full of ideas and determined to change the world one delectable bite at a time – is proof that the best things in life begin with a dream, and if you’re lucky enough to meet Willy Wonka, anything is possible.",
    release_date: new Date("2024-07-31"),
    poster_url:
    "/poster/poster_2/wonka.jpg",
    age_rating: 17, // Approximate average rating
    price: 11,
  },

];
async function createSeatsForMovie(movieId : string) {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 5;

  const seats = rows.flatMap(row =>
    Array.from({ length: seatsPerRow }, (_, index) => ({
      label: `${row}${index + 1}`,
      occupied: false,
      movieId: movieId
    }))
  );

  await prisma.seat.createMany({ data: seats });
}

async function main() {
  for (const movie of movieData) {
    const createdMovie = await prisma.movie.create({ data: movie });
    await createSeatsForMovie(createdMovie.id);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
