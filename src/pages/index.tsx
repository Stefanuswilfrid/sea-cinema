import Image from 'next/image'
import Container from '../components/Container'
import ListingCard from '../components/ListingCard/ListingCard'
import SEO from '@/components/SEO';
import useSWR from 'swr';
import { fetcher } from '@/libs';
import { LoadingPlaceholder } from '@/components/LoadingProvider';
import { Pagination } from '@/components/Pagination';
import LastViewedMovie from '@/components/LastViewedMovie';
import { useUser } from '@/hooks/useUser';
import LoadingModal from '@/components/Modal/LoadingModal';
// import { useOptimistic } from "react";
// import getCurrentUser from '@/actions/getCurrentUser';

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

const Home =  () => {
  const { data: listings, error } = useSWR<any>('/movie/', fetcher);
  // const currentUser = await getCurrentUser();
  const { user : currentUser} = useUser()


  if (error) return <div>Failed to load</div>;
  if (!listings) return <LoadingModal/>;

  return (
    <main>
      <SEO
        title="SEA Cinema | Movie ticket booking app"
        desc="SEA Cinema is a rising star in the movie theater industry known for
        its affordable ticket prices and wide range of movie genres."
      />
      <Container>
        <LastViewedMovie/>
        
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
            <ListingCard key={id} id={listing.id} 
            currentUser={currentUser}

            description={listing.description} 
            title={listing.title} 
            url={listing.poster_url} 
            price={listing.price} />
          ))}
          

        </div>
        {/* <div className="fixed w-full left-0 max-w-[1440px] mx-auto max-sm:border-t border-t-secondary/10 p-1 max-sm:bg-stone-100 bottom-0 md:right-4 md:px-4 flex justify-end mt-8 gap-1">

          <Pagination
            
          />
        </div> */}
        </Container>
        
    </main>
  )
}

export default Home;