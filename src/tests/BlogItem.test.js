import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogItem from '../components/BlogItem';

describe('<BlogItem/>', () => {
  let container;
  const blog = {
    title: 'Promises chaining',
    author: 'The Modern JavaScript Tutorial',
    url: 'https://javascript.info/promise-chaining',
    likes: 11,
    user: '62b18c6ad7d80f11a6e8434f',
  };
  const user = {
    id: '62b18c6ad7d80f11a6e8434f',
    name: 'Test User',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0YXIiLCJpZCI6IjYyYjE4YzZhZDdkODBmMTFhNmU4NDM0ZiIsImlhdCI6MTY1NTg4MjUzMSwiZXhwIjoxNjU1OTY4OTMxfQ.2E5KuWUbkWB3QNClZJyTPRU2o9KkcJZtFDoZYFmjPI8',
    username: 'testuser',
  };
  const mockHandler = jest.fn();

  beforeEach(() => {
    container = render(
      <BlogItem blog={blog} user={user} handleDelete={mockHandler} handleLike={mockHandler} />
    ).container;
  });

  test('renders only title and author by default', () => {
    const detailsDiv = container.querySelector('.detailsDiv');
    expect(detailsDiv).toHaveStyle('display: none');

    expect(screen.getAllByText('Promises chaining')[0]).toBeVisible();
    expect(screen.getAllByText('The Modern JavaScript Tutorial')[0]).toBeVisible();
    expect(screen.getAllByText('https://javascript.info/promise-chaining')[0]).not.toBeVisible();
    expect(screen.getAllByText('Likes: 11')[0]).not.toBeVisible();
  });

  test('after clicking the button, details are displayed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('Show');
    await user.click(button);

    const div = container.querySelector('.detailsDiv');
    expect(div).not.toHaveStyle('display: none');

    expect(screen.getAllByText('Promises chaining')[1]).toBeVisible();
    expect(screen.getAllByText('By The Modern JavaScript Tutorial')[0]).toBeVisible();
    expect(screen.getAllByText('https://javascript.info/promise-chaining')[0]).toBeVisible();
    expect(screen.getAllByText('Likes: 11')[0]).toBeVisible();
  });

  test('toggled content can be closed', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('Show');
    await user.click(button);

    const closeButton = screen.getByText('Hide');
    await user.click(closeButton);

    const div = container.querySelector('.detailsDiv');
    expect(div).toHaveStyle('display: none');
  });

  test('multiple clicks to the like button are registered by the event handler', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('Show');
    await user.click(button);

    const likeButton = screen.getByText('Like');
    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
