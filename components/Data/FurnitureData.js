
// import front from '../../assets/Furniture/table.png';
// import left from '../../assets/Furniture/left.png';
// import right from '../../assets/Furniture/right.png';
// import back from '../../assets/Furniture/back.png';

  export default FurnitureData = [   {
    id: "1",
    title: "Nashville",
    price:'$349.00',
    category:"sofa",
    rating:4,
    colors: ["gray", "brown", "yellow" ],
    img: require("../../assets/Furniture/sofa2.png") ,
    images: [
        require("../../assets/Furniture/sofa2.png") ,
        require("../../assets/Furniture/left.png") ,
        require("../../assets/Furniture/right.png") ,
        require("../../assets/Furniture/back.png"),
    // left,right,back
    // "alpha","beta","chnrlie"
    ],
    description: "There are many variations of passages of Lorem Ipsum available, but the majority ",
  },
  {
    id: "2",
    title: "Floor Lamp",
    price:'$129.00',
    rating:2,
    colors: ["gray", "brown", "yellow" ],
    img: require("../../assets/Furniture/sofa.png") ,
    images: [
      require("../../assets/Furniture/sofa.png") ,
      require("../../assets/Furniture/left.png") ,
      require("../../assets/Furniture/right.png") ,
      require("../../assets/Furniture/back.png"),
      // left,right,back
      // "alpha1","beta1","chmrlie1"
      ],
    description: "All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary,",
    category:"sofa",
  },

  {
    id: "3",
    title: "Tripod Lamp",
    price:'$119.00',
    rating:4,
    colors: ["gray", "brown", "yellow" ],
    img:  require("../../assets/Furniture/chair.png"),
    images: [ 
      require("../../assets/Furniture/chair.png") ,
      require("../../assets/Furniture/left.png") ,
      require("../../assets/Furniture/right.png") ,
      require("../../assets/Furniture/back.png") ,
      ],
    description: "There are many variations of passages of Lorem Ipsum available, but the majority ",
    category:"sofa",
  },
  {
    id: "4",
    title: "Accent Chair",
    price:'$89.00',
    rating:5,
    colors: ["gray", "brown", "yellow" ],
    img:  require("../../assets/Furniture/chair2.png"),
    images: [
      require("../../assets/Furniture/chair2.png") ,
      require("../../assets/Furniture/left.png") ,
      require("../../assets/Furniture/right.png") ,
      require("../../assets/Furniture/back.png") ,
      ],
    description: "There are many variations of passages of Lorem Ipsum available, but the majority ",
    category:"chair",
  },
  {
    id: "5",
    title: "Table Bar Stool",
    price:'$97.00',
    rating:4,
    colors: ["gray", "brown", "yellow" ],
    img:   require("../../assets/Furniture/stool.png"),
    images: [
      require("../../assets/Furniture/stool.png"),
      require("../../assets/Furniture/left.png") ,
      require("../../assets/Furniture/right.png") ,
      require("../../assets/Furniture/back.png") ,
      ],
    description: "There are many variations of passages of Lorem Ipsum available, but the majority ",
    category:"chair",
  },
  {
    id: "6",
    title: "Bubble Chair",
    price:'$176.00',
    rating:3,
    colors: ["gray", "brown", "yellow" ],
    img:   require("../../assets/Furniture/bubble.png"),
    images: [
      require("../../assets/Furniture/bubble.png"),
      require("../../assets/Furniture/left.png") ,
      require("../../assets/Furniture/right.png") ,
      require("../../assets/Furniture/back.png") ,
      ],
    description: "There are many variations of passages of Lorem Ipsum available, but the majority ",
    category:"sofa",
  },
];

// export default FurnitureData;
// export default DATA ;