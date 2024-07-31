import Image from 'next/image'
import Container from '../components/Container'
import ListingCard from '../components/ListingCard/ListingCard'
import SEO from '@/components/SEO';
import useSWR from 'swr';
import { fetcher } from '@/libs';
import { LoadingPlaceholder } from '@/components/LoadingProvider';

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

const Home = () => {
  const { data: listings, error } = useSWR<any>('api/movie/', fetcher);
  console.log("movies",listings)

  if (error) return <div>Failed to load</div>;
  if (!listings) return <LoadingPlaceholder/>;

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
          
          {listings.map((listing : any,id : any) => (
            <ListingCard key={id} id={listing.id} description={listing.description} title={listing.title} url={listing.poster_url} price={listing.price} />
          ))}
          

        </div>
        </Container>

    </main>
  )
}

export default Home;