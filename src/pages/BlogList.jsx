import Togglable from '../components/Togglable';
import NewBlogForm from '../components/NewBlogForm';
import Blogs from '../components/Blogs';
import AddNew from '../components/AddNew';

const BlogList = () => {
  return (
    <>
      <Togglable text="Add New Blog">
        <NewBlogForm />
      </Togglable>
      <Blogs />
      <AddNew />
    </>
  );
};
export default BlogList;
