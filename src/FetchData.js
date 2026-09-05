import React, { useState, useEffect } from 'react';

export default function FetchData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  return (
    <ul>
      {data.map(item => <li key={item.id}>{item.title}</li>)}
    </ul>
  );
}