import React from "react";
import { Pagination } from "antd";

// Get the Pagination props from the home page and assign it to actual pagination properties
type PaginationProps = {
  current: number;
  total: number;
  // pageSize: number;
  onChange: (page: number) => void;
  hideOnSinglePage: boolean;
};

const ShowPagination: React.FC<PaginationProps> = (props) => {
  return (
    <Pagination
      current={props.current}
      total={props.total}
      onChange={props.onChange}
      hideOnSinglePage={props.hideOnSinglePage}
    />
  );
};

export default ShowPagination;
