import { Alert } from "antd";
import UsersResult from "./ui/UsersResult";
import TasksResult from "./ui/TasksResult";
import CommentsResult from "./ui/CommentsResult";
import BlogsResult from "./ui/BlogsResult";
import ProductsResult from "./ui/ProductsResult";
import AdminsResult from "./ui/AdminsResult";

const SearchResults = ({ error, result, closeModal }) => {
  if (error && error?.length !== 0) {
    return <Alert message={error} type="error" showIcon />;
  } else if (result !== null) {
    return (
      <div>
        {result?.admins?.length === 0 &&
        result?.blogs?.length === 0 &&
        // result?.comments?.length === 0 &&
        // result?.users?.length === 0 &&
        result?.products?.length === 0 &&
        result?.tasks?.length === 0 ? (
          <div className="text-center">
            <h1 className="font-medium text-h4">Not found</h1>
            <p className="text-p1">
              No results found for
              <span className="font-medium">
                &quot;{result?.searchQuery}&quot;
              </span>
            </p>
            <p className="text-p1">
              Try checking for typos or using complete words.
            </p>
          </div>
        ) : (
          <>
            <p>
              Results for
              <span className="font-medium">
                &quot;{result?.searchQuery}&quot;
              </span>
            </p>
            <hr className="mt-2 mb-5" />
            <div className="space-y-5">
              {result?.admins?.length !== 0 && (
                <AdminsResult admins={result?.admins} closeModal={closeModal} />
              )}
              {result?.products?.length !== 0 && (
                <ProductsResult
                  products={result?.products}
                  closeModal={closeModal}
                />
              )}
              {result?.blogs?.length !== 0 && (
                <BlogsResult blogs={result?.blogs} closeModal={closeModal} />
              )}
              {/* {result?.comments?.length !== 0 && (
                <CommentsResult
                  comments={result?.comments}
                  closeModal={closeModal}
                />
              )} */}
              {result?.tasks?.length !== 0 && (
                <TasksResult tasks={result?.tasks} closeModal={closeModal} />
              )}
              {/* {result?.users?.length !== 0 && (
                <UsersResult users={result?.users} closeModal={closeModal} />
              )} */}
            </div>
          </>
        )}
      </div>
    );
  } else {
    return;
  }
};

export default SearchResults;
