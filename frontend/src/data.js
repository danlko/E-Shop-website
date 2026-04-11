import campImg from './assets/campus.jpg';
import conImg from './assets/converse.jpg';
import tigerImg from './assets/tiger.jpg';

export const productsData = [
  {
    id: 1,
    name: "Adidas Campus",
    price: 150,
    imageUrl: campImg,
    color: "Grey",
    size: "43"
  },
  {
    id: 2,
    name: "Converse Chuck 70",
    price: 100,
    imageUrl: conImg,
    color: "Black",
    size: "42"
  },
  {
    id: 3,
    name: "Asics Tiger",
    price: 120,
    imageUrl: tigerImg,
    color: "Black",
    size: "46"
  }
];
            
export const priceOptions = 
  [
    { value: "lt150", label: "до 50" },
    { value: "lt150", label: "до 100" },
    { value: "lt150", label: "до 150" },
    { value: "lt150", label: "до 200" },
    { value: "lt150", label: "до 250" },
    { value: "lt150", label: "до 350" },
  ];