import React, { useState, useEffect, useMemo } from "react";

import ReactPaginate from "react-paginate";

function ReactPagination({
  currentItems, setCurrentItems, allDataArray, itemsPerPage, allData,
}) {
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % allData?.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(allDataArray?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(allDataArray?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, allDataArray]);
  return (
    <ReactPaginate
        // nextLabel={`${t("Body19")} >`}
      previousLabel=""
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      nextLabel=""
        // previousLabel={`< ${t("Body18")}`}
        // pageClassName="page-item"
        // pageLinkClassName="page-link"
        // previousClassName="page-item"
        // previousLinkClassName="page-link"
      nextClassName="nextClassName"
        // nextLinkClassName="page-link"
      breakLabel="__"
        // breakClassName="page-item"
        // breakLinkClassName="page-link"
        // containerClassName="pagination "
      activeClassName="activeclassname"
      renderOnZeroPageCount={null}
    />
  );
}

export default ReactPagination;
