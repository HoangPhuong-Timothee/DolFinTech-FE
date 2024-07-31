import { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import DeleteFavorite from "../DeleteFavorite/DeleteFavorite";
import { FavoriteGet } from "../../../Models/Favorite";

interface Props {
  favoriteValue: FavoriteGet;
  onFavoriteDelete: (e: SyntheticEvent) => void;
}

const CardFavorite = ({ favoriteValue, onFavoriteDelete }: Props) => {
  return (
    <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
      <Link
        to={`/company/${favoriteValue.symbol}/company-profile`}
        className="pt-6 text-xl font-bold"
      >
        {favoriteValue.symbol}
      </Link>
      <DeleteFavorite
        favoriteValue={favoriteValue.symbol}
        onFavoriteDelete={favoriteValue.symbol}
      />
    </div>
  );
};

export default CardFavorite;