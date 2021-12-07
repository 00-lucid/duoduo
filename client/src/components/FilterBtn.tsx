import { useState } from "react";
import styled from "styled-components";

function FilterBtn({ condition, setFilters }: any) {
  const [isClick, setIsClick] = useState<boolean>(false);
  return (
    <>
      {!isClick ? (
        <button
          className="w-12 h-6 border border-gray-200 bg-gray-50 rounded-md flex justify-center items-center mr-1 shadow-md hover:bg-white"
          style={{ color: "#333d4b" }}
          onClick={() => {
            setIsClick((old) => !old);
            setFilters((old: any[]) => {
              if (condition.length > 1 && condition[0] !== "G") {
                const result = [...old[0], condition.toLowerCase()];
                return [result, old[1]];
              } else {
                const result = [...old[1], condition];
                return [old[0], result];
              }
            });
          }}
        >
          <p className="text-sm opacity-40">{condition}</p>
        </button>
      ) : (
        <button
          className="w-12 h-6 border border-gray-200 bg-green-400 rounded-md flex text-white justify-center items-center mr-1 shadow-md"
          onClick={() => {
            setIsClick((old) => !old);
            setFilters((old: any[]) => {
              if (condition.length > 1 && condition[0] !== "G") {
                const idxTarget = old[0].indexOf(condition.toLowerCase());
                const result = [
                  ...old[0].slice(0, idxTarget),
                  ...old[0].slice(idxTarget + 1),
                ];
                return [result, old[1]];
              } else {
                const idxTarget = old[1].indexOf(condition);
                const result = [
                  ...old[1].slice(0, idxTarget),
                  ...old[1].slice(idxTarget + 1),
                ];
                return [old[0], result];
              }
            });
          }}
        >
          <p className="text-sm">{condition}</p>
        </button>
      )}
    </>
  );
}

export default FilterBtn;
