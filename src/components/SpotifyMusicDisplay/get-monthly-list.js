import people from "./people.json";

export default function SpotifyHorizonSongList() {
  return (
    <>
      <div>
        <ul
          className="flex divide-x divide-gray-100 space-x-2 h-80 overflow-x-scroll max-w-xl"
        >
          {people.map((person) => (
            <ul key={person.email} className="gap-x-6 py-2 w-72 border">
              <li>
                <img
                  className="aspect-square bg-gray-50"
                  src={person.imageUrl}
                  alt=""
                />
              </li>

              <li>
                <p className="text-sm font-semibold leading-6 text-gray-900 ">
                  {person.name}
                </p>
                <p className="truncate text-xs leading-5 text-gray-500">
                  {person.email}
                </p>
              </li>
            </ul>
          ))}
        </ul>
      </div>
    </>
  );
}
