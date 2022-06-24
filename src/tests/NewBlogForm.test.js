import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import NewBlogForm from '../components/NewBlogForm';

test('<NewBlogForm /> calls handleCreate with the right details', async () => {
  const handleCreate = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<NewBlogForm handleCreate={handleCreate} />);

  const title = container.querySelector('#title');
  const author = container.querySelector('#author');
  const url = container.querySelector('#url');

  const sendButton = screen.getByText('Submit');

  await user.type(title, 'Test Blog');
  await user.type(author, 'Tester');
  await user.type(url, 'testblog.com');

  await user.click(sendButton);

  expect(handleCreate.mock.calls).toHaveLength(1);
  expect(handleCreate.mock.calls[0][0].title).toBe('Test Blog');
  expect(handleCreate.mock.calls[0][0].author).toBe('Tester');
  expect(handleCreate.mock.calls[0][0].url).toBe('testblog.com');
});
