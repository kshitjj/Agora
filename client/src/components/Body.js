// Sample product data
let productCatalogue = [
  {
    Name: "Product 1",
    price: "$10.00",
    ImgSrc: "path/to/image1.jpg",
    Desc: "This is a description of Product 1."
  },
  {
    Name: "Product 2",
    price: "$20.00",
    ImgSrc: "path/to/image2.jpg",
    Desc: "This is a description of Product 2."
  },
  {
    Name: "Product 3",
    price: "$30.00",
    ImgSrc: "path/to/image3.jpg",
    Desc: "This is a description of Product 3."
  },
  // Add more products as needed
];

function IndividualProduct(brah) {
  return (
    <div className="singularProduct">
      <img src={brah.ImgSrc} alt={`${brah.Name}'s photo`} />
      <h6 className="singularProductPrice">{brah.Name}</h6>
      <div className="singularProductPrice">{brah.price}</div>
      <p>{brah.Desc}</p>
    </div>
  );
}

function ProductCatalogue() {
  return (
    <div className="productCatalogue">
      {
        productCatalogue.map((product, index) => (
          <IndividualProduct key={index} {...product} />
        ))
      }
    </div>
  );
}

function Body() {
  return (
    <div>
      <button>Filter Products</button>
      <ProductCatalogue />
    </div>
  );
}

export default Body;

