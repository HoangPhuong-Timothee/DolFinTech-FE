import { SyntheticEvent } from "react";
import { FavoriteGet } from "../../../Models/Favorite";
import CardFavorite from "../CardFavorite/CardFavorite";

interface Props {
  favoriteValues: FavoriteGet[];
  onFavoriteDelete: (e: SyntheticEvent) => void;
}

const ListFavorite = ({ favoriteValues, onFavoriteDelete }: Props) => {
  return (
    <section id="favorite">
      <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
        My favorites
      </h2>
      <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
        <>
          {favoriteValues.length > 0 ? (
            favoriteValues.map((favoriteValue) => {
              return (
                <CardFavorite
                  favoriteValue={favoriteValue}
                  onFavoriteDelete={onFavoriteDelete}
                />
              );
            })
          ) : (
            <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
              Your favorite list is empty.
            </h3>
          )}
        </>
      </div>
    </section>
  );
};

export default ListFavorite;