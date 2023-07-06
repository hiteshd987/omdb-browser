import React from 'react';
import { Pagination } from 'antd';

type PaginationProps = {
    current: number;
    total: number;
    // pageSize: number;
    handlePageChange: any;
}


const ShowPagination: React.FC<PaginationProps> = (props) => {
    return (
<Pagination current={props.current} total={props.total} 
// pageSize={props.pageSize} 
onChange={props.handlePageChange}
/>
    )
}

export default ShowPagination;