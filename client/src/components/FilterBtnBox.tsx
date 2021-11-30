import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { filtersState } from "../state";
import FilterBtn from "./FilterBtn";

function FilterBtnBox() {
  const setFilters = useSetRecoilState(filtersState);

  return (
    <>
      <section className="flex flex-row mt-2">
        <FilterBtn condition="Top" setFilters={setFilters} />
        <FilterBtn condition="Jg" setFilters={setFilters} />
        <FilterBtn condition="Mid" setFilters={setFilters} />
        <FilterBtn condition="Adc" setFilters={setFilters} />
        <FilterBtn condition="Sup" setFilters={setFilters} />
      </section>
      <section className="flex flex-row mt-2">
        <FilterBtn condition="I" setFilters={setFilters} />
        <FilterBtn condition="B" setFilters={setFilters} />
        <FilterBtn condition="S" setFilters={setFilters} />
        <FilterBtn condition="G" setFilters={setFilters} />
        <FilterBtn condition="P" setFilters={setFilters} />
        <FilterBtn condition="D" setFilters={setFilters} />
        <FilterBtn condition="M" setFilters={setFilters} />
        <FilterBtn condition="GM" setFilters={setFilters} />
        <FilterBtn condition="C" setFilters={setFilters} />
      </section>
    </>
  );
}

export default FilterBtnBox;
