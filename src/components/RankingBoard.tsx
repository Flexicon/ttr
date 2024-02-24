import { useState } from 'react';
import cn from 'classnames';

import type { Album } from '../types/Album';

export type AlbumBoardProps = {
  album: Album;
};

export const AlbumBoard = (props: AlbumBoardProps) => {
  const [ranking, setRanking] = useState<string[]>([]);

  const rankTrack = (track: string) => {
    setRanking((ranking) => {
      if (ranking.includes(track)) {
        return ranking.filter((t) => t !== track);
      }
      return [...ranking, track];
    });
  };

  const sortByRanking = (a: string, b: string): number => {
    const aIdx = ranking.indexOf(a);
    const bIdx = ranking.indexOf(b);

    if (aIdx === -1 && bIdx === -1) return 0;
    if (aIdx === -1) return 1;
    if (bIdx === -1) return -1;
    return aIdx < bIdx ? 1 : -1;
  };

  return (
    <div>
      <img className="max-w-full w-[320px] mb-4" src={`/${props.album.cover}`} title={props.album.title} />
      <ul className="w-[320px] max-w-full">
        {props.album.tracklist.sort(sortByRanking).map((track) =>
          ranking.length < 3 || ranking.includes(track) ? (
            <li
              key={track}
              className={cn(
                'px-2 py-1 mb-3 text-sm cursor-pointer rounded border border-pink-300 bg-pink-200 hover:bg-pink-300 transition-colors',
                ranking.indexOf(track) === 0 && 'bg-amber-800 hover:bg-amber-900 border-amber-900 text-white',
                ranking.indexOf(track) === 1 && 'bg-stone-100 hover:bg-stone-300 border-stone-300',
                ranking.indexOf(track) === 2 && 'bg-yellow-300 hover:bg-yellow-400 border-yellow-400'
              )}
              onClick={() => rankTrack(track)}
              role="button"
            >
              {ranking.indexOf(track) === 0 && '🥉 '}
              {ranking.indexOf(track) === 1 && '🥈 '}
              {ranking.indexOf(track) === 2 && '🥇 '}
              {track}
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export type RankingBoardProps = {
  albums: Album[];
};

export function RankingBoard(props: RankingBoardProps) {
  return (
    <div className="flex px-8 py-4 gap-8">
      {props.albums.map((album) => (
        <AlbumBoard album={album} />
      ))}
    </div>
  );
}
