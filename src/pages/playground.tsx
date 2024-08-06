import React from 'react'

// import Header from "../components/Header/Header";
// import TextLink from "../components/TextLink";
// import React from 'react';
import { X } from 'react-feather';
// import Link from "../components/Link";
// import { COLORS } from "../constants";
// import { search } from 'react-icons-kit/fa/search'
// import { Icon } from 'react-icons-kit'
// import { SEATSET, dummyShowTime, movieTheatres, availableShowTime } from "../data";
export const CITY = {
    country:"coimbatore"
} 


export const WEEKS = [
    {
        
    }
]

export const SEATSET = [
    {
      id: '001',
      label: 'Available',
      color: '#48a748',
    },
    {
      id: '002',
      label: 'Filing Fast',
      color: '#dd932b',
    },
    {
      id: '003',
      label: 'Sold Out',
      color: '#e7352f',
    },
    {
      id: '004',
      label: 'Lapsed',
      color: '#837a7a',
    },
  ];

export const availableShowTime = [
    {
        id: 1,
        showtime: '11.20 AM',
        language: 'English'
    }, 
    {
        id: 2,
        showtime: '13.20 AM',
        language: 'English'
    }
]

export const movieTheatres = [
    // {
    //     id: 1,
    //     name: "INOX Prozone Mall,Saravanampatty, Sathy Road Coimbatore",
    //     subtitle:"PVR INOX Limited., 1st Floor, Prozone Mall, Saravanampatty, Sathy Road, Coimbatore - 641035, Tamil Nadu",
    //     kms:"50"
    // },
    {
        id: 2,
        name: "PVR Brookefields Mall Coimbatore",
        subtitle:"4th Floor,Brookefields Mall, 641001",
        kms:"50"
    },
]  

export const dummyShowTime = [
    {
        day: 'Today',
        date: "26",
        week: 'Mon',
        morningshow: '10.00 AM',
        movierunning: true,
        noonshow: '02.00 PM'
    },
    {
        day: 'Tomorrow',
        date: "27",
        week: 'Tues',
        morningshow: '10.00 AM',
        movierunning: true,
        noonshow: '02.00 PM'
    },
    {
        day: 'Mon',
        date: "01",
        week: 'Tues',
        morningshow: '10.00 AM',
        movierunning: true,
        noonshow: '02.00 PM'
    },
    {
        day: 'Tue',
        date: "02",
        week: 'Tues',
        movierunning: false,
        morningshow: '10.00 AM',
        noonshow: '02.00 PM'
    },
    {
        day: 'Fri',
        date: "03",
        week: 'Tues',
        movierunning: false,
        morningshow: '10.00 AM',
        noonshow: '02.00 PM'
    },
];

let test = [];

for(let i = 0; i < 20; i++){
 test.push(i);
}
export const seatNumber = [
    {
        id:1,
        seat: "a",
        seatno: ['1','2','3','4','5','6','7','8','9','10','11',' 12','13','14','15','16','17','18','19','20']
    },
    {
        id:2,
        seat: "b",
        seatno: ['1','2','3','4','5','6','7','8','NULL','NULL','9','10','12','13','14','15','16','17']
    },
    {
        id:3,
        seat: "C",
        seatno: ['1','2','3','4','5','6','7','8','NULL','NULL','9','10','12','13','14','15','16','17']
    },
    {
        id:4,
        seat: "D",
        seatno: ['1','2','3','4','5','6','7','8','NULL','NULL','9','10','12','13','14','15','16','17']
    },
    {
        id:5,
        seat: "E",
        seatno: ['1','2','3','4','5','6','7','8','NULL','NULL','9','10','12','13','14','15','16','17']
    }
]

export const alphabets = ['A','B','C','D','E','F','G'];


export const getMoviePosters = [
    {
        id: 1,
        img: 'assets/movie1.jpg',
        title: "Extaction 2"
    },
    {
        id: 2,
        img: 'assets/movie2.jpg',
        title: "Fast and Furious"
    },
    {
        id: 3,
        img: 'assets/movie3.jpg',
        title: "Batman"
    }
]

export const nowShowingMovie = [
    {
        id: 1,
        movieName: "Kunfu Panda",
        movieRunningLanguage: ["Tamil","Hinid","Telegu"],
        newRelease: false,
        releaseDate: "Fri Sept 14",
        moviePoster: "assets/kufu1.webp",
        likesCount: 30,
        genre: "Adventure",
        language: 'Hindi'
    },
    {
        id: 2,
        movieName: "One Pieces",
        movieRunningLanguage: ["Tamil","Hinid","Telegu"],
        moviePoster: "assets/onepiece.jpg",
        newRelease: true,
        releaseDate: "Fri Nov 14",
        likesCount: 60,
        genre: "Drama",
        language: 'Tamil'
    },
    {
        id: 3,
        movieName: "One Pieces",
        movieRunningLanguage: ["Tamil","Hinid","Telegu"],
        moviePoster: "assets/onepiece.jpg",
        newRelease: true,
        releaseDate: "Fri Dec 14",
        likesCount: 20,
        genre: "Drama",
        language: 'Tamil'
    },
    {
        id: 4,
        movieName: "One Pieces",
        movieRunningLanguage: ["Tamil","Hinid","Telegu"],
        moviePoster: "assets/onepiece.jpg",
        newRelease: true,
        releaseDate: "Fri Sept 14",
        likesCount: 10,
        genre: "Drama",
        language: 'Tamil'
    },
    {
        id: 5,
        movieName: "One Pieces",
        movieRunningLanguage: ["Tamil","Hinid","Telegu"],
        moviePoster: "assets/leo.jpg",
        newRelease: false,
        releaseDate: "Fri Sept 14",
        likesCount: 40,
        genre: "Drama",
        language: 'Tamil'
    },
    {
        id: 6,
        movieName: "One Pieces",
        movieRunningLanguage: ["Tamil","Hinid","Telegu"],
        moviePoster: "assets/onepiece.jpg",
        newRelease: true,
        releaseDate: "Fri Nov 20",
        likesCount: 30,
        genre: "Drama",
        language: 'Tamil'
    },
    {
        id: 7,
        movieName: "One Pieces",
        movieRunningLanguage: ["Tamil","Hinid","Telegu"],
        moviePoster: "assets/onepiece.jpg",
        newRelease: true,
        releaseDate: "Fri Sept 14",
        likesCount: 30,
        genre: "Drama",
        language: 'Tamil'
    },
    {
        id: 8,
        movieName: "One Pieces",
        movieRunningLanguage: ["Tamil","Hinid","Telegu"],
        moviePoster: "assets/onepiece.jpg",
        newRelease: true,
        releaseDate: "Fri Sept 14",
        likesCount: 30,
        genre: "Drama",
        language: 'Tamil'
    },
    
];
export default function MovieCalendar() {
    const [isShowTime, setShowTime] = React.useState(false);
    React.useEffect(() => {
        if (isShowTime) {
            console.log("REACTED", isShowTime);
        }
    }, [isShowTime]);

    return (
        <>
            {/* <Header />
            <TextLink href="/">Go Home</TextLink> */}
            <div className="flex flex-col items-center px-8">
                <div className="absolute top-32 right-5 cursor-pointer">
                    {/* <Link href="/">
                        <X size={32} color="white" />
                    </Link> */}
                </div>
                {/* MOVIE BANNER GOESHERS */}
                <div>
                    <img src="https://originserver-static1-uat.pvrcinemas.com/newweb/movies/big/1460x600/HO00025768.jpg" alt="banner" />
                    <div className="absolute top-80 p-5 text-white">
                        <h1 className="text-lg font-bold">Leo (U/A)</h1>
                        <h4 className="text-sm"> (U/A) • 2h 44m • Thursday, October 19, 2023 • TAMIL • ACTION</h4>
                        <h5 className="text-sm">Thalapathy Vijay, Sanjay Dutt, Trisha</h5>
                    </div>
                </div>
                <div>
                    <ShowTime />
                    <SearchCinemas />
                    <MovieTheatre />
                    <br />
                </div>
            </div>
        </>
    );

    function MovieTheatre() {
        return (
            <>
                {movieTheatres.map((theatre) => (
                    <div className="flex justify-between p-5 bg-gray-800 text-white rounded-lg mt-7">
                        <div className="flex flex-col gap-5 w-4/5">
                            <h4 className="text-lg">{theatre.name}</h4>
                            <h6 className="text-sm">{theatre.subtitle}</h6>
                            <div className="flex gap-5 cursor-pointer">
                                {
                                    availableShowTime.map((show) => (
                                        <a href="/movieseat" className="bg-green-600 py-3 px-2 w-24 flex justify-center items-center rounded-lg text-white text-xs font-bold">
                                            {show.showtime}
                                        </a>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    }

    function SearchCinemas() {
        return (
            <div className="flex flex-col p-5 bg-gray-800 text-white rounded-lg">
                <div className="bg-gray-600 w-3/5 rounded-md h-10 px-3 flex items-center">
                    {/* <Icon style={{ color: 'white' }} size="0.9em" icon={search} /> */}
                    <input
                        id="search-movie"
                        type="text"
                        placeholder="Search movies or theatres"
                        className="outline-none border-gray-700 w-full bg-gray-300 text-white pl-3"
                    />
                </div>
                <div className="flex gap-5 list-none whitespace-nowrap">
                    {SEATSET.map((data) => (
                        <h4 style={{ color: `${data.color}` }} className="text-white">{data.label}</h4>
                    ))}
                </div>
            </div>
        );
    }

    function ShowTime() {
        return (
            <div className="bg-black py-5">
                <div className="flex gap-5">
                    {dummyShowTime.map((data) => (
                        (data.movierunning ? (
                            <div className="flex flex-col items-center gap-5 text-white text-sm">
                                <div className="flex flex-col text-center bg-gray-800 w-48 p-3 cursor-pointer">
                                    <h5 className="text-xl font-bold">{data.date}</h5>
                                    <h5 className="text-base">{data.day}</h5>
                                </div>
                            </div>
                        ) : null)
                    ))}
                </div>
            </div>
        );
    }
}
