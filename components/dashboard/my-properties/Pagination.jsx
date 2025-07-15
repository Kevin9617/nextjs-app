'use client'
const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages < 1) return null;

  const getPages = () => {
    const pages = [];
    // Always show first page
    pages.push(1);
    // If current page is not 1 or last, show current page
    if (page !== 1 && page !== totalPages) {
      if (page !== 2) {
        // If not adjacent to first, show current page
        if (page > 3) pages.push('...');
        pages.push(page);
      } else {
        pages.push(2);
      }
    }
    // Show next page if it's not last and not current
    if (page + 1 < totalPages) {
      if (page + 1 !== 2 && page + 1 !== totalPages) {
        if (page + 1 > 3 && page + 1 < totalPages - 1) pages.push('...');
        pages.push(page + 1);
      } else if (page + 1 === 2) {
        pages.push(2);
      }
    }
    // Always show last page if more than 1
    if (totalPages > 1) {
      if (totalPages - page > 2) pages.push('...');
      pages.push(totalPages);
    }
    // Remove duplicates and sort
    return [...new Set(pages)].sort((a, b) => (a === '...' ? 1 : b === '...' ? -1 : a - b));
  };

  const pages = getPages();

  return (
    <ul className="page_navigation">
      <li className={`page-item${page === 1 ? ' disabled' : ''}`}
          onClick={() => page > 1 && onPageChange(page - 1)}>
        <a className="page-link" href="#" tabIndex="-1" aria-disabled={page === 1}>
          <span className="flaticon-left-arrow"></span>
        </a>
      </li>
      {pages.map((p, idx) =>
        p === '...'
          ? <li key={idx} className="page-item disabled"><span className="page-link">...</span></li>
          : <li key={idx} className={`page-item${p === page ? ' active' : ''}`}
                onClick={() => p !== page && onPageChange(p)}>
              <a className="page-link" href="#">{p}</a>
            </li>
      )}
      <li className={`page-item${page === totalPages ? ' disabled' : ''}`}
          onClick={() => page < totalPages && onPageChange(page + 1)}>
        <a className="page-link" href="#" aria-disabled={page === totalPages}>
          <span className="flaticon-right-arrow"></span>
        </a>
      </li>
    </ul>
  );
};

export default Pagination;

