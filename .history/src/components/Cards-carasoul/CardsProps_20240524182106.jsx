import React from "react";
import Cards from "./Cards";

const App = () => {
  const cards = [
    {
      title: "Card 1",
      description: "Description for Card 1",
    },
    {
      title: "Card 2",
      description: "Description for Card 2",
    },
    {
      title: "Card 3",
      description: "Description for Card 3",
    },
    {
      title: "Card 4",
      description: "Description for Card 4",
    },
  ];

  return <Cards cards={cards} />;
};

export default App;
