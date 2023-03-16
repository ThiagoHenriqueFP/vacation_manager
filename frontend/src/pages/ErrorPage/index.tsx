import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import './style.css';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <br />
      <Link to='/'>Return to ligth side!</Link>
    </div>
  );
}
