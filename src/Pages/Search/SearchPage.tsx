import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { CompanySearch } from "../../company";
import { searchCompanies } from "../../API";
import Search from "../../Components/Search/Search";
import ListFavorite from "../../Components/Favortite/ListFavorite/ListFavorite";
import CardList from "../../Components/CardList/CardList";
import { FavoriteGet } from "../../Models/Favorite";
import {
  favoriteAddAPI,
  favoriteDeleteAPI,
  favoriteGetAPI,
} from "../../Services/FavoriteService";
import { toast } from "react-toastify";

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [favoriteValues, setFavoriteValues] = useState<FavoriteGet[] | null>(
    []
  );
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    getFavorite();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getFavorite = () => {
    favoriteGetAPI()
      .then((res : any) => {
        if (res?.data) {
          setFavoriteValues(res?.data);
        }
      })
      .catch((e : any) => {
        setFavoriteValues(null);
      });
  };

  const onFavoriteCreate = (e: any) => {
    e.preventDefault();
    favoriteAddAPI(e.target[0].value)
      .then((res : any) => {
        if (res?.status === 204) {
          toast.success("Stock has been added to favorite list!");
          getFavorite();
        }
      })
      .catch((e : any) => {
        toast.warning("Could not add stock to favorite list!");
      });
  };

  const onFavoriteDelete = (e: any) => {
    e.preventDefault();
    favoriteDeleteAPI(e.target[0].value).then((res : any) => {
      if (res?.status == 200) {
        toast.success("Stock has been deleted from favorite list!");
        getFavorite();
      }
    });
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
  };
  return (
    <>
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListFavorite
        favoriteValues={favoriteValues!}
        onFavoriteDelete={onFavoriteDelete}
      />
      <CardList
        searchResults={searchResult}
        onFavoriteCreate={onFavoriteCreate}
      />
      {serverError && <div>Unable to connect to API</div>}
    </>
  );
};

export default SearchPage;