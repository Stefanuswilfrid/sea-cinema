import Image from 'next/image'
import Container from '../components/Container'
import ListingCard from '../components/ListingCard/ListingCard'
import SEO from '@/components/SEO';

export interface ListingCardProps {
  listing: Listing;
}

export interface Listing {
  id: number;
  title: string;
  description: string;
  release_date: string;
  poster_url: string;
  age_rating: number;
  ticket_price: number;
}

export interface HomeProps {
  listings: Listing[];
}

export async function getServerSideProps() {
  // Fetch your data from an API or any other source
  const response = await fetch('https://seleksi-sea-2023.vercel.app/api/movies');
  const data = await response.json();

  return {
    props: {
      listings: data, // Pass the fetched data as props to the Home component
    },
  };
}



const Home: React.FC<HomeProps> = ({ listings }) => {
  return (
    <main>
      <SEO
        title="SEA Cinema | Movie ticket booking app"
        desc="SEA Cinema is a rising star in the movie theater industry known for
        its affordable ticket prices and wide range of movie genres."
      />
      <Container>
        <h1  className='mt-12 text-3xl font-extrabold '>Currently Playing Movies</h1>

        <div 
          className="
            pt-12
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4
            
            gap-8
          "
        >
          
          {listings.map((listing,id) => (
            <ListingCard key={id} id={listing.id} description={listing.description} title={listing.title} url={listing.poster_url} price={listing.ticket_price} />
          ))}
          

        </div>
        </Container>

    </main>
  )
}

export default Home;