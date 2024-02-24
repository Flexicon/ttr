import type { Album } from '../types/Album';

export type AlbumBoardProps = {
  album: Album;
};

export const AlbumBoard = (props: AlbumBoardProps) => {
  return (
    <div className="py-4 px-8 mb-4">
      <img className="max-w-full w-[320px] mb-4" src={`/${props.album.cover}`} title={props.album.title} />
      <ul className="w-[320px] max-w-full">
        {props.album.tracklist.map((track) => (
          <li className="px-2 py-1 mb-3 text-sm cursor-pointer rounded border border-pink-300 bg-pink-200 hover:bg-pink-300">
            {track}
          </li>
        ))}
      </ul>
    </div>
  );
};

export type RankingBoardProps = {
  albums: Album[];
};

export function RankingBoard(props: RankingBoardProps) {
  return (
    <div>
      {props.albums.map((album) => (
        <AlbumBoard album={album} />
      ))}
    </div>
  );
}
