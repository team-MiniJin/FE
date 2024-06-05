import Link from 'next/link';
import Image from 'next/image';
import { PlaceT } from '@/widgets/travel-info/types/Place';

export default function PlacesList({ apiData }: { apiData: PlaceT[] | null }) {
  return (
    <section className="space-y-4">
      {apiData &&
        apiData.map((place: PlaceT) => (
          <Link
            key={place.contentid}
            href="/place-info"
            className="flex h-52 w-full border-t border-gray-200"
          >
            <figure className="relative m-4 h-44 w-44">
              <Image
                src={
                  place.firstimage ||
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB9UlEQVR4nO3av0rDUBTH8a8iBR8gQV1duwtO4uDm4OzgIzg4uLpZR8EHcHBzc3bSQdBOVuggONk6dRAsCoJHAmco7W1vbnKT3EB/ENomoemn5/5J0sI84eYOaAMxNc8jIECn7pgIeFZMF1ilxonmmIAyBLYNlQl9mYjUFDMR04aQ+4y4QELGiCskVIxkgYSIkayQ0DCSBxISRvJC0HOxjqdzswZwBvSBHtDSdaVAfGJahrmhVSbEVzPrGyAfZUN8YHoGyHvZkCUPzczUtE7LhDSBV2ArJ6ahmKQypXf2DWCg+98UNJoVDkkq8DmCWK5onpE8kF3gW/e7GukjVICRrJB94Ff3uQAWLQcqGiNZIIfAn24/cThYmj4T622oJ8c+5Qw51vUJ5Aj3zKrM+FVo16FyqSELwLmuS5rUAdljqsz4OtfRLhUk6cSX+voH2MuBmIaxweK8kGQyutbnX8AO/mJqSitTtnctzcwKudXHgU58vmP75uOUlbFCRM9ImwUANj1ixAZ5A9YLQHS0qfrCiA2yhv+09b1fxj5QHoz4vh5Jk/sZE15WjFQBscU2WkWG7UFCslRGQoUkcalM0JAsmGAhaZtZLSBpKpNqZq9yGTr+2BQsRBwxtUoUyI1zL4nmmEATjwzNyd9Oap1Yz6gfqv4g8zAl/0R5DjHsGdTIAAAAAElFTkSuQmCC'
                }
                alt={place.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              />
            </figure>
            <article className="m-4 flex flex-col">
              <header className="text-xl font-bold">{place.title}</header>
              <p className="text-lg font-normal">{place.addr1}</p>
            </article>
          </Link>
        ))}
    </section>
  );
}

// import Link from 'next/link';
// import { PlaceT } from '@/widgets/travel-info/types/Place';

// export default function PlacesList({ apiData }: { apiData: PlaceT[] }) {
//   return (
//     <section className="space-y-4">
//       {apiData &&
//         apiData.map((place: PlaceT) => (
//           <Link
//             key={place.contentid}
//             href="/place-info"
//             className="flex h-52 w-full border-t border-gray-200"
//           >
//             <figure className="m-4 h-44 w-44 bg-gray-300">
//               <img src={place.firstimage} alt={place.title} />
//             </figure>
//             <article className="m-4 flex flex-col">
//               <header className="text-xl font-bold">{place.title}</header>
//               <p className="text-lg font-normal">{place.addr1}</p>
//             </article>
//           </Link>
//         ))}
//     </section>
//   );
// }
