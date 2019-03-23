export type SortOptions = "Vote" | "Date";

export interface ISortValue {
  value: SortOptions;
  label: SortOptions;
}

export const sortValues: ISortValue[] = [
  { value: "Vote", label: "Vote" },
  { value: "Date", label: "Date" }
];

export const CHANGE_SORT = "CHANGE_SORT";

export interface ISortAction {
  type: string;
  sort: ISortValue;
}

export const changeSort = (sort: ISortValue): ISortAction => {
  return {
    sort,
    type: CHANGE_SORT
  };
};
