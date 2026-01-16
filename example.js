// SLIDER 1 - no bootstrap
const slider1 = new Slider({
  targetSelector: "#slider1",
  scrollBy: 250,
});

const cardsInfo = [
  {
    imgSrc: "https://placedog.net/300/150",
  },
    {
    imgSrc: "https://placedog.net/300/150",
  },
    {
    imgSrc: "https://placedog.net/300/150",
  },
    {
    imgSrc: "https://placedog.net/300/150",
  },
    {
    imgSrc: "https://placedog.net/300/150",
  },
    {
    imgSrc: "https://placedog.net/300/150",
  },
];

slider1.appendCards(cardsInfo);


// SLIDER 2 - with bootstrap
new Slider({
  targetSelector: "#slider2",
  scrollBy: 600
});
