import { useEffect } from 'react';

const Redirect = () => {
  useEffect(() => {
    const externalLink = `https://open.spotify.com/playlist/2On9Qqg6sunRFYP5lhCoSv?si=V79Fv3YeS9iU2fM0qD9Pqw&nd`;

    window.location.href = externalLink;
  }, []);

  return null;
};

export default Redirect;
