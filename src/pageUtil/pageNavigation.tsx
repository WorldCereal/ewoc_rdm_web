import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/solid';
import ReactPaginate from 'react-paginate';

interface PageNavigationProps {
  pageCount: number;
  handlePageClick: (selectedItem: { selected: number }) => void;
}

const PageNavigation = (props: PageNavigationProps) => {
  return (
    <ReactPaginate
      previousLabel={
        <div className="border-t-2 border-b-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
          <ArrowNarrowLeftIcon
            className="mr-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          Previous
        </div>
      }
      nextLabel={
        <div className="-mt-px w-0 flex-1 flex justify-end">
          <div className="border-t-2 border-b-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
            Next
            <ArrowNarrowRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </div>
      }
      breakLabel="..."
      breakClassName="break-me"
      pageCount={props.pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      onPageChange={(data) => props.handlePageClick(data)}
      containerClassName="border-b border-gray-200 px-4 py-4 flex items-center justify-between sm:px-0"
      pageClassName="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 border-b-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
      activeClassName="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 border-b-2 pt-4 px-4 inline-flex items-center text-sm font-medium bg-gray-300"
    />
  );
};

export default PageNavigation;
