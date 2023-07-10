import React from "react";
import { Pagination } from "antd";

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
