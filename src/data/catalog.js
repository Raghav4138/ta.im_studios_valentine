export const VALENTINE_DAYS = [
  {
    id: "rose-day",
    name: "Rose Day",
    date: "Feb 7",
    options: [
      { id: "r1", name: "Single Satin Rose Bouquet", price: 149, image: "/products/rose_single_crochet_149.jpeg" },
      { id: "r2", name: "Single Crochet Rose with Card", price: 199, image: "/products/rose_single_crochet_199.jpeg" },
      { id: "r3", name: "Single Crochet Tulip Bouquet", price: 299, image: "/products/tulip_single_crochet_299.png" },
      { id: "r4", name: "Handmade Crochet Rose Trio Bouquet", price: 499, image: "/products/rose_crochet_trio_499.jpeg" },
      { id: "r5", name: "Luxury Satin Rose Bouquet (8 Roses)", price: 799, image: "/products/rose_satin_bouquet_8_799.jpeg" },
    ],
  },
  {
    id: "propose-day",
    name: "Propose Day",
    date: "Feb 8",
    options: [
      { id: "p1", name: "Proposal Card with Ring Slot", price: 99, image: "/products/propose_card_ring_99.png" },
      { id: "p2", name: "Classic Ring Box", price: 149, image: "/products/propose_basic_ringbox_149.png" },
      { id: "p3", name: "Handmade Crochet Ring Box", price: 299, image: "/products/propose_crochet_ringbox_299.png" },
    ],
  },
  {
    id: "chocolate-day",
    name: "Chocolate Day",
    date: "Feb 9",
    options: [
      { id: "c1", name: "Chocolate Bouquet", price: 149, image: "/products/choco_basic_bouquet_149.png" },
      { id: "c2", name: "Cadbury Valentine Pack with Card", price: 349, image: "/products/choco_cadbury_card_349.png" },
      { id: "c3", name: "Chocolate Cake Surprise Hamper", price: 599, image: "/products/choco_cake_hamper_599.png" },
    ],
  },
  {
    id: "teddy-day",
    name: "Teddy Day",
    date: "Feb 10",
    options: [
      { id: "t1", name: "Cute Teddy (6\")", price: 299, image: "/products/teddy_6inch_299.jpg" },
      { id: "t2", name: "Premium Teddy (12\")", price: 499, image: "/products/teddy_12inch_499.jpg" },
      { id: "t3", name: "Luxury Teddy (18\")", price: 1199, image: "/products/teddy_18inch_1199.jpg" },
    ],
  },
  {
    id: "promise-day",
    name: "Promise Day",
    date: "Feb 11",
    options: [
      { id: "pr1", name: "Couple Bracelets Set", price: 99, image: "/products/promise_bracelets_99.jpeg" },
      { id: "pr2", name: "Couple Keychain Set", price: 199, image: "/products/promise_keychain_199.jpeg" },
      { id: "pr3", name: "Silver Couple Rings", price: 2499, image: "/products/promise_silver_rings_2499.jpeg" },
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
      { id: "k1", name: "Kiss Chocolate Jar", price: 199, image: "/products/kiss_choco_jar_199.jpeg" },
      { id: "k2", name: "Lip Care Mini Hamper", price: 299, image: "/products/kiss_lipcare_299.jpeg" },
      { id: "k3", name: "Kiss-Themed Painted Top", price: 599, image: "/products/kiss_painted_top_599.jpeg" },
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
        category: "Bouquets",
        items: [
          { id: "vb1", name: "Mini Bouquet", price: 299, image: "/products/val_bouquet_299.jpeg" },
          { id: "vb2", name: "Standard Bouquet", price: 599, image: "/products/val_bouquet_599.jpeg" },
          { id: "vb3", name: "Premium Bouquet", price: 1199, image: "/products/val_bouquet_1199.jpeg" },
          { id: "vb4", name: "Luxury Bouquet", price: 1499, image: "/products/val_bouquet_1499.jpeg" },
        ],
      },
      {
        category: "Hampers",
        items: [
          { id: "vh1", name: "Basic Valentine Hamper", price: 299, image: "/products/val_hamper_basic_299.png" },
          { id: "vh2", name: "Standard Valentine Hamper", price: 499, image: "/products/val_hamper_standard_499.png" },
          { id: "vh3", name: "Premium Valentine Hamper", price: 1099, image: "/products/val_hamper_premium_1099.png" },
        ],
      },
    ],
  },
];

export const DELIVERY_CHARGE = 250;
