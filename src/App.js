import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

const App = () => {
  const [image, setImage] = useState(null);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchData = async () => {
    const imageAPI = 'https://picsum.photos/1100/550';
    const quoteAPI = 'https://random-math-quote-api.herokuapp.com/ ';

    const fetchImage = await Axios.get(imageAPI);
    const fetchQuote = await Axios.get(quoteAPI);

    await Axios.all([fetchImage, fetchQuote])
      .then(Axios.spread((...allData) => {
          const getImage = allData[ 0 ].config.url;
          const getQuote = allData[ 1 ].data.quote;
          const getAuthor = allData[1].data.author;
          setImage(getImage)          
          setQuote(getQuote)          
          setAuthor(getAuthor)       
        }),
      )
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>A MATH QUOTE</h1>
      <div className='image'>
        <img src={image} alt=''></img>
        <div className='quote'>
          <h1>{quote}</h1>
          <p>- {author}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
