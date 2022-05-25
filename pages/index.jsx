import Head from "next/head";
import dbConnect from "../lib/dbConnect";
import Movie from "../models/Movie";

export default function Home({ movies }) {
  console.log("this is from db" + movies);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1>Movies</h1>
        {movies.map(({ _id, title, plot }) => (
          <div className="card mb-2" key={_id}>
            <div className="card-body">
              <div className="h5 text-uppercase">{title}</div>
              <p className="fw-light">{plot} </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  await dbConnect();
  const res = await Movie.find({});
  console.log(res);

  const result = await Movie.find({});
  const movies = result.map((doc) => {
    const movie = doc.toObject();
    movie._id = movie._id.toString();
    return movie;
  });

  return { props: { movies: movies } };
}
