import Togglable from '../components/Togglable';
import NewBlogForm from '../components/NewBlogForm';
import Blogs from '../components/Blogs';

const BlogList = () => {
  return (
    <>
      <Togglable text="Add New Blog">
        <NewBlogForm />
      </Togglable>
      <Blogs />
    </>
  );
};
export default BlogList;
