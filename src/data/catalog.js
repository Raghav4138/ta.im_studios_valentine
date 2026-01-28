export const VALENTINE_DAYS = [
  {
    id: "rose-day",
    name: "Rose Day",
    date: "Feb 7",
    options: [
      // { id: "r1", name: "Single Satin Rose Bouquet", price: 99, image: "/products/rose_single_crochet_149.jpeg" },
      { id: "r1", name: "Crochet Rose Keychain", price: 99, image: "/products/crochet-rose-keychain-99.jpeg" },
      { id: "r2", name: "Single Crochet Rose with Card", price: 179, image: "/products/rose_single_crochet2.jpeg" },
      { id: "r3", name: "Single Crochet Tulip", price: 179, image: "/products/tulip_single_crochet_299.png" },
      { id: "r4", name: "Large Size Crochet Bouquet", price: 299, image: "/products/large-crochet-flower-299.jpeg" },
      // { id: "r5", name: "Luxury Satin Rose Bouquet (8 Roses)", price: 799, image: "/products/rose_satin_bouquet_8_799.jpeg" },
    ],
  },
  {
    id: "propose-day",
    name: "Propose Day",
    date: "Feb 8",
    options: [
      { id: "p1", name: "Proposal Card with Ring", price: 99, image: "/products/propose_card_ring_99.png" },
      { id: "p2", name: "Classic Ring Box", price: 149, image: "/products/propose_basic_ringbox_149_2.png" },
      { id: "p3", name: "Handmade Crochet Ring Box", price: 249, image: "/products/propose_crochet_ringbox_299.png" },
    ],
  },
  {
    id: "chocolate-day",
    name: "Chocolate Day",
    date: "Feb 9",
    options: [
      { id: "c1", name: "KitKat", priceOptions: [25, 35], image: "/products/choco-kitkat.jpeg" },
      { id: "c2", name: "Cadbury", priceOptions: [20, 80, 100], image: "/products/choco-cadbury.jpeg" },
      { id: "c3", name: "Cadbury Silk Heart", priceOptions: [370], image: "/products/choco-cadbury-silk-heart.webp" },
      { id: "c4", name: "Munch Mini", priceOptions: [90], image: "/products/choco-munch-mini.jpeg" },
    ],
  },
  {
    id: "teddy-day",
    name: "Teddy Day",
    date: "Feb 10",
    options: [
      { id: "t1", name: "Scented Teddy Candle", price: 59, image: "/products/scented-teddy-candle-59.jpeg" },
      { id: "t2", name: "Teddy Keychain", price: 79, image: "/products/teddy-keychain.jpeg" },
      { id: "t3", name: "Medium Teddy Bear", price: 449, image: "/products/medium-side-teddy-450.jpeg" },
      { id: "t4", name: "Large Teddy Bear", price: 549, image: "/products/large-teddy-bear-550.jpeg" },
      { id: "t5", name: "Couple Teddy Bear", price: 549, image: "/products/couple-teddy-bear-550.jpeg" },
    ],
  },
  {
    id: "promise-day",
    name: "Promise Day",
    date: "Feb 11",
    options: [
      { id: "pr3", name: "Handwritten Promise Letter", price: 79, image: "/products/promise_letter.jpeg" },
      { id: "pr1", name: "Couple Bracelets Set", price: 99, image: "/products/promise_bracelets_99.jpeg" },
      { id: "pr2", name: "Couple Keychain Set", price: 199, image: "/products/promise_keychain_199.jpeg" },
      // { id: "pr3", name: "Silver Couple Rings", price: 2499, image: "/products/promise_silver_rings_2499.jpeg" },
    ],
  },
  {
    id: "hug-day",
    name: "Hug Day",
    date: "Feb 12",
    options: [
      { id: "h1", name: "Pocket Hug Token", price: 79, image: "/products/hug_pocket_79.jpeg" },
      { id: "h2", name: "Hug Pillow", price: 299, image: "/products/hug_pillow_299.jpeg" },
      { id: "h3", name: "\"Hug Me\" Oversized T-Shirt", price: 799, image: "/products/hug_tshirt_799.jpeg" },
    ],
  },
  {
    id: "kiss-day",
    name: "Kiss Day",
    date: "Feb 13",
    options: [
      { id: "k2", name: "Kiss Coupons", price: 99, image: "/products/kiss_coupons_99.jpeg" },
      { id: "k1", name: "Kiss Chocolate Jar", price: 199, image: "/products/kiss_choco_jar_199.jpeg" },
      // { id: "k2", name: "Lip Care Mini Hamper", price: 299, image: "/products/kiss_lipcare_299.jpeg" },
      { id: "k3", name: "Kiss-Themed Painted Top", price: 799, image: "/products/kiss_painted_top_599.jpeg" },
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
          { id: "vf1", name: "Mini Photo Frame (4x4)", price: 99, image: "/products/frame_4x4_99.jpeg" },
          { id: "vf2", name: "A5 Photo Frame", price: 299, image: "/products/frame_a5_299.jpeg" },
          { id: "vf3", name: "A4 Photo Frame", price: 399, image: "/products/frame_a4_399.jpeg" },
        ],
      },
      {
        category: "Others Products",
        items: [
          { id: "vo2", name: "DIY Ceramic Mug", price: 99, image: "/products/diy_ceramic_mug_99.jpeg" },
          { id: "vo0", name: "Kissing Couple", price: 249, image: "/products/kissing-couple-price-249.jpeg" },
          { id: "vo1", name: "Silver Couple Rings", price: 2499, image: "/products/promise_silver_rings_2499.jpeg" },
        ],
      },
      
      // {
      //   category: "Bouquets",
      //   items: [
      //     { id: "vb1", name: "Mini Bouquet", price: 299, image: "/products/val_bouquet_299.jpeg" },
      //     { id: "vb2", name: "Standard Bouquet", price: 599, image: "/products/val_bouquet_599.jpeg" },
      //     { id: "vb3", name: "Premium Bouquet", price: 1199, image: "/products/val_bouquet_1199.jpeg" },
      //     { id: "vb4", name: "Luxury Bouquet", price: 1499, image: "/products/val_bouquet_1499.jpeg" },
      //   ],
      // },
      // {
      //   category: "Hampers",
      //   items: [
      //     { id: "vh1", name: "Basic Valentine Hamper", price: 299, image: "/products/val_hamper_basic_299.png" },
      //     { id: "vh2", name: "Standard Valentine Hamper", price: 499, image: "/products/val_hamper_standard_499.png" },
      //     { id: "vh3", name: "Premium Valentine Hamper", price: 1099, image: "/products/val_hamper_premium_1099.png" },
      //   ],
      // },
    ],
  },
];

export const DELIVERY_CHARGE = 250;

export const BOUQUETS = [
  { id: "vb0", name: "Chocolate Bouquet", price: 199, height: 12, image: "/products/chocolate-bouquet-199.jpeg" },
  { id: "vb1", name: "Polaroid Bouquet", price: 299, height: 12, image: "/products/val_bouquet_299.jpeg" },
  { id: "vb2", name: "Claw Clip Bouquet", price: 499, height: 14, image: "/products/val_bouquet_599.jpeg" },
  { id: "vb6", name: "Basic Bouquet Hamper", price: 599, height: 16, image: "/products/basic-bouquet-hamper-599.jpeg" },
  { id: "vb5", name: "Standard Bouquet Hamper", price: 999, height: 18, image: "/products/standard-boquet-999.jpeg" },
  { id: "vb3", name: "Crochet Heart Bouquet", price: 1199, height: 20, image: "/products/val_bouquet_1199.jpeg" },
  { id: "vb4", name: "Premium Bouquet Hamper", price: 1499, height: 22, image: "/products/val_bouquet_1499.jpeg" },
];

/**
 * READYMADE HAMPERS
 * Pre-packaged gift hampers with fixed items included
 * 
 * To add a new hamper:
 * 1. Copy an existing hamper object
 * 2. Update id (use "rh1", "rh2", etc.)
 * 3. Update name, description, price, image path
 * 4. Update includedItems array with items in the hamper
 */
export const READYMADE_HAMPERS = [
  {
    id: "rh1",
    name: "Valentine's Standard Hamper",
    description: "A perfect gift with 7 handpicked items for your loved one",
    price: 699,
    image: "/products/hampers/valentines-standard-hamper.png",
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
  // Add more hampers here by copying the structure above
];

export const SURPRISE_FREEBIE = {
  id: 'freebie-love14',
  name: '🎁 Mystery Gift',
  price: 0,
  isFreebie: true,
};
