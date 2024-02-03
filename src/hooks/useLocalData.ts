import { useContext } from "react";

import { LocalDataContext } from "@/contexts/localData";

import { ILocalDataContext } from "../../global";

const useLocalData = () => useContext<ILocalDataContext>(LocalDataContext);
export default useLocalData;
