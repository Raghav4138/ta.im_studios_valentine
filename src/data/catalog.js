export const DELIVERY_CHARGE = 250;

// VALENTINE HAMPER BUILDER CATALOG DATA
export const VALENTINE_DAYS = [
  {
    id: "rose-day",
    name: "Rose Day",
    date: "Feb 7",
    options: [
      // { id: "r1", name: "Single Satin Rose Bouquet", price: 99, image: "/products/val_hamper_builder/rose_day/rose_single_crochet_149.webp" },
      { id: "r1", name: "Crochet Rose Keychain", price: 99, image: "/products/val_hamper_builder/1rose_day/crochet-rose-keychain-99.webp" },
      { id: "r2", name: "Single Crochet Rose with Card", price: 179, image: "/products/val_hamper_builder/1rose_day/rose_single_crochet2.webp" },
      { id: "r3", name: "Single Crochet Tulip", price: 179, image: "/products/val_hamper_builder/1rose_day/tulip_single_crochet_299.webp" },
      { id: "r4", name: "Large Size Crochet Flower", price: 299, image: "/products/val_hamper_builder/1rose_day/large-crochet-flower-299.jpeg" },
      // { id: "r5", name: "Luxury Satin Rose Bouquet (8 Roses)", price: 799, image: "/products/flowers/rose_satin_bouquet_8_799.webp" },
    ],
  },
  {
    id: "propose-day",
    name: "Propose Day",
    date: "Feb 8",
    options: [
      { id: "p1", name: "Proposal Card with Ring", price: 99, image: "/products/val_hamper_builder/2propose_day/propose_card_ring_99.webp" },
      { id: "p2", name: "Classic Ring Box", price: 149, image: "/products/val_hamper_builder/2propose_day/propose_basic_ringbox_149_2.webp" },
      { id: "p3", name: "Handmade Crochet Ring Box", price: 249, image: "/products/val_hamper_builder/2propose_day/propose_crochet_ringbox_299.webp" },
    ],
  },
  {
    id: "chocolate-day",
    name: "Chocolate Day",
    date: "Feb 9",
    options: [
      { id: "c1", name: "KitKat", priceOptions: [25, 35], image: "/products/val_hamper_builder/3chocolate_day/choco-kitkat.webp" },
      { id: "c2", name: "Cadbury", priceOptions: [20, 80, 100], image: "/products/val_hamper_builder/3chocolate_day/choco-cadbury.webp" },
      { id: "c3", name: "Cadbury Silk Heart", priceOptions: [370], image: "/products/val_hamper_builder/3chocolate_day/choco-cadbury-silk-heart.webp" },
      { id: "c4", name: "Munch Mini", priceOptions: [90], image: "/products/val_hamper_builder/3chocolate_day/choco-munch-mini.webp" },
    ],
  },
  {
    id: "teddy-day",
    name: "Teddy Day",
    date: "Feb 10",
    options: [
      { id: "t0", name: "Scented Teddy Candle", price: 59, image: "/products/val_hamper_builder/4teddy_day/scented-teddy-candle-59.webp" },
      { id: "t1", name: "Teddy Keychain", price: 79, image: "/products/val_hamper_builder/4teddy_day/teddy-keychain.webp" },
      { id: "t2", name: "Cute Teddy", price: 199, image: "/products/val_hamper_builder/4teddy_day/cute-teddy.webp" },
      { id: "t3", name: "Medium Teddy Bear", price: 449, image: "/products/val_hamper_builder/4teddy_day/medium-side-teddy-450.webp" },
      { id: "t4", name: "Large Teddy Bear", price: 549, image: "/products/val_hamper_builder/4teddy_day/large-teddy-bear-550.webp" },
      { id: "t5", name: "Couple Teddy Bear", price: 549, image: "/products/val_hamper_builder/4teddy_day/couple-teddy-bear-550.webp" },
    ],
  },
  {
    id: "promise-day",
    name: "Promise Day",
    date: "Feb 11",
    options: [
      { id: "pr3", name: "Handwritten Promise Letter", price: 79, image: "/products/val_hamper_builder/5promise_day/promise_letter.webp" },
      { id: "pr1", name: "Couple Bracelets Set", price: 99, image: "/products/val_hamper_builder/5promise_day/promise_bracelets_99.webp" },
      { id: "pr2", name: "Couple Keychain Set", price: 199, image: "/products/val_hamper_builder/5promise_day/promise_keychain_199.webp" },
      // { id: "pr3", name: "Silver Couple Rings", price: 2499, image: "/products/val_hamper_builder/valentine_day/promise_silver_rings_2499.webp" },
    ],
  },
  {
    id: "hug-day",
    name: "Hug Day",
    date: "Feb 12",
    options: [
      { id: "h1", name: "Pocket Hug Token", price: 79, image: "/products/val_hamper_builder/6hug_day/hug_pocket_79.webp" },
      { id: "h2", name: "Hug Pillow", price: 299, image: "/products/val_hamper_builder/6hug_day/hug_pillow_299.webp" },
      { id: "h3", name: "\"Hug Me\" Oversized T-Shirt", price: 799, image: "/products/val_hamper_builder/6hug_day/hug_tshirt_799.webp" },
    ],
  },
  {
    id: "kiss-day",
    name: "Kiss Day",
    date: "Feb 13",
    options: [
      { id: "k2", name: "Kiss Coupons", price: 99, image: "/products/val_hamper_builder/7kiss_day/kiss_coupons_99.webp" },
      { id: "k1", name: "Kiss Chocolate Jar", price: 199, image: "/products/val_hamper_builder/7kiss_day/kiss_choco_jar_199.webp" },
      // { id: "k2", name: "Lip Care Mini Hamper", price: 299, image: "/products/val_hamper_builder/7kiss_day/kiss_lipcare_299.webp" },
      { id: "k3", name: "Kiss-Themed Painted Top", price: 799, image: "/products/val_hamper_builder/7kiss_day/kiss_painted_top_599.webp" },
    ],
  },
  {
    id: "valentines-day",
    name: "Valentine's Day",
    date: "Feb 14",
    isMultiSelect: true,
    options: [
      {
        category: "Photo Frames",
        items: [
          { id: "vf1", name: "Mini Photo Frame (4x4)", price: 99, image: "/products/val_hamper_builder/8valentine_day/frame_4x4_99.webp" },
          { id: "vf2", name: "A5 Photo Frame", price: 299, image: "/products/val_hamper_builder/8valentine_day/frame_a5_299.webp" },
          { id: "vf3", name: "A4 Photo Frame", price: 399, image: "/products/val_hamper_builder/8valentine_day/frame_a4_399.webp" },
        ],
      },
      {
        category: "Couple Mini Statues",
        items: [
          { id: "vs1", name: "Couple Statue 1", price: 239, image: "/products/val_hamper_builder/8valentine_day/couple-statue1.webp" },
          { id: "vs2", name: "Couple Statue 2", price: 239, image: "/products/val_hamper_builder/8valentine_day/couple-statue2.webp" },
          { id: "vs3", name: "Couple Statue 3", price: 239, image: "/products/val_hamper_builder/8valentine_day/couple-statue3.webp" },
        ],
      },
      {
        category: "Others Products",
        items: [
          { id: "vo2", name: "DIY Ceramic Mug", price: 99, image: "/products/val_hamper_builder/8valentine_day/diy_ceramic_mug_99.webp" },
          // { id: "vo3", name: "Couple Statue", price: 239, image: "/products/val_hamper_builder/8valentine_day/couple-statue1.webp" },
          // { id: "vo4", name: "Couple Statue", price: 239, image: "/products/val_hamper_builder/8valentine_day/couple-statue2.webp" },
          // { id: "vo5", name: "Couple Statue", price: 239, image: "/products/val_hamper_builder/8valentine_day/couple-statue3.webp" },
          // { id: "vo6", name: "Couple Statue", price: 239, image: "/products/val_hamper_builder/8valentine_day/couple-statue4.webp" },
          // { id: "vo0", name: "Kissing Couple", price: 249, image: "/products/val_hamper_builder/8valentine_day/kissing-couple-price-249.webp" },
          { id: "vo1", name: "Silver Couple Rings", price: 2499, image: "/products/val_hamper_builder/8valentine_day/promise_silver_rings_2499.webp" },
        ],
      },
      
      // {
      //   category: "Bouquets",
      //   items: [
      //     { id: "vb1", name: "Mini Bouquet", price: 299, image: "/products/bouquets/val_bouquet_299.webp" },
      //     { id: "vb2", name: "Standard Bouquet", price: 599, image: "/products/bouquets/val_bouquet_599.webp" },
      //     { id: "vb3", name: "Premium Bouquet", price: 1199, image: "/products/bouquets/val_bouquet_1199.webp" },
      //     { id: "vb4", name: "Luxury Bouquet", price: 1499, image: "/products/bouquets/val_bouquet_1499.webp" },
      //   ],
      // },
      // {
      //   category: "Hampers",
      //   items: [
      //     { id: "vh1", name: "Basic Valentine Hamper", price: 299, image: "/products/hampers/val_hamper_basic_299.webp" },
      //     { id: "vh2", name: "Standard Valentine Hamper", price: 499, image: "/products/hampers/val_hamper_standard_499.webp" },
      //     { id: "vh3", name: "Premium Valentine Hamper", price: 1099, image: "/products/hampers/val_hamper_premium_1099.webp" },
      //   ],
      // },
    ],
  },
];

// HANDMADE BOUQUETS
export const BOUQUETS = [
  { id: "vb0", name: "Chocolate Bouquet", price: 199, height: 12, image: "/products/bouquets/chocolate-bouquet-199.jpeg" },
  { id: "vb1", name: "Polaroid Bouquet", price: 299, height: 12, image: "/products/bouquets/polaroid-bouquet-299.jpeg" },
  { id: "vb2", name: "Claw Clip Bouquet", price: 499, height: 14, image: "/products/bouquets/claw-clip-bouquet-499.jpeg" },
  { id: "vb6", name: "Basic Bouquet Hamper", price: 599, height: 16, image: "/products/bouquets/basic-bouquet-hamper-599.jpeg" },
  { id: "vb5", name: "Standard Bouquet Hamper", price: 999, height: 18, image: "/products/bouquets/standard-boquet-999.jpeg" },
  { id: "vb3", name: "Crochet Heart Bouquet", price: 1199, height: 20, image: "/products/bouquets/val_bouquet_1199.jpeg" },
  { id: "vb4", name: "Premium Bouquet Hamper", price: 1499, height: 22, image: "/products/bouquets/val_bouquet_1499.jpeg" },
];

// READYMADE HAMPERS
export const READYMADE_HAMPERS = [
  {
    id: "rh1",
    name: "Valentine's Standard Hamper",
    description: "A perfect gift with 7 handpicked items for your loved one",
    price: 699,
    image: "/products/readymade_hamper/valentines-standard-hamper.webp",
    includedItems: [
      "Crochet Tulip Stick",
      "Kisses Jar",
      "Teddy Bear Keychain",
      "Promise Card with Ring",
      "Free Kiss Coupons",
      "Pocket Hug",
      "KitKat Chocolate",
    ],
  },
  {
  id: "vah1",
  name: "Valentine's Acrylic Box Hamper",
  description: "A beautifully curated Valentine's acrylic box hamper with customizable couple photo and premium self-care & accessory items.",
  price: 799,
  place: "Readymade Hampers",
  image: "/products/readymade_hamper/valentines-acrylic-box-hamper.webp",
  includedItems: [
    "Claw Clip (1)",
    "Scrunchies (1)",
    "Mug (1)",
    "KitKat Chocolate (1)",
    "Couple Photo – Customisable (1)",
    "Lip Balm (1)",
    "Glow Sheet Mask (1)",
    "DIY Accessories (2)"
  ],
},
  // Add more hampers here by copying the structure above
];

// ADD-ONS
export const ADDONS = [
  { id: 'polaroid_photo_strip', name: 'Polaroid Photo Strip', price: 19, image: 'https://m.media-amazon.com/images/I/71FSgdS0lgL._AC_UF894,1000_QL80_.jpg' },
  { id: 'scrunchie', name: 'Scrunchie', price: 29, image: '/products/val_hamper_builder/addons/scrunchie.png' },
  { id: 'claw_clip', name: 'Claw Clip', price: 35, image: '/products/val_hamper_builder/addons/claw.png' },
  { id: 'furry_clutch', name: 'Furry Clutch', price: 39, image: '/products/val_hamper_builder/addons/furry-clutch.jpg' },
  { id: 'candle', name: 'Scented Candle', price: 149, image: '/products/val_hamper_builder/addons/scented-candle.webp' },
];

// SURPRISE FREEBIE ITEM
export const SURPRISE_FREEBIE = {
  id: 'freebie-love14',
  name: '🎁 Mystery Gift',
  price: 0,
  isFreebie: true,
};


