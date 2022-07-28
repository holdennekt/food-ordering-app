const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env")});
const { sequelize } = require("./models/db");
const bcrypt = require("bcryptjs");
const { marketsProvider } = require("./providers/markets");
const { adminsProvider } = require("./providers/admins");

const admins = [{ name: "admin", password: "admin" }];

const markets = [
  {
    name: "McDonald's",
    products: [
      {
        name: "Big Mac",
        img: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Big-Mac-1:product-header-desktop?wid=830&hei=456&dpr=off",
        price: 100,
        description: "classic burger big mac",
      },
      {
        name: "Big Tasty",
        img: "https://www.mcdonalds.com.mt/wp-content/uploads/2018/05/BigTasty-Classic.jpg",
        price: 120,
        description: "big classic burger",
      },
      {
        name: "Mc Chicken",
        img: "https://www.mcdonalds.com/is/image/content/dam/ua/nutrition/nfl-product/product/regular/Sdwch_McChicken.png?$Category_Desktop$",
        price: 60,
        description: "chicken bUrger",
      },
      {
        name: "Fish roll",
        img: "https://www.mcdonalds.com/is/image/content/dam/ua/nutrition/nfl-product/product/regular/RollFish.png?$Category_Desktop$",
        price: 74,
        description: "shaurma with fish",
      },
    ],
  },
  {
    name: "KFC",
    products: [
      {
        name: "Wings Bucket",
        img: "https://media.kfc.it/app/uploads/public/626/a6e/e4b/thumb_466_500_500_0_0_crop.png",
        price: 150,
        description: "tasty bucket of spicy wings",
      },
      {
        name: "KFC burger",
        img: "https://pro-dostavku.ru/wp-content/uploads/2019/11/rozhdestvenskij-temnyj-burger.png",
        price: 80,
        description: "simple kfc burger",
      },
      {
        name: "Chicken burger",
        img: "https://www.kfc-ukraine.com/admin/files/medium/medium_4064.jpg",
        price: 75,
        description: "kfc burger with fried chicken",
      },
      {
        name: "Duet bucket",
        img: "https://www.kfc-ukraine.com/admin/files/medium/medium_4093.png",
        price: 255,
        description: "fries, chicken",
      },
    ],
  },
  {
    name: "Burger King",
    products: [
      {
        name: "Ljubljana",
        img: "https://dobregostilne.si/image/burger-king-n-750-750-1277.jpg",
        price: 90,
        description: "one more simple kfc bUrger",
      },
      {
        name: "Wopper",
        img: "https://w1.pngwing.com/pngs/594/423/png-transparent-junk-food-cheeseburger-hamburger-fast-food-menu-patty-sandwich-burger-king.png",
        price: 110,
        description: "whopper haha",
      },
      {
        name: "Southwest Bacon Whopper",
        img: "https://cdn.sanity.io/images/czqk28jt/prod_bk_us/6c51b29977dc5bead4b9fe15b2c079ce85a379c7-1333x1333.png?w=750&q=40&fit=max&auto=format",
        price: 115,
        description: "bacon whopper haha",
      },
      {
        name: "Bacon King",
        img: "https://cdn.sanity.io/images/czqk28jt/prod_bk_us/60712f81a07316d3300b65823ab68b59def70c8e-1333x1333.png?w=750&q=40&fit=max&auto=format",
        price: 155,
        description: "big bacon bURGErrr haha",
      },
    ],
  },
  {
    name: "Ninja Sushi",
    products: [
      {
        name: "Sushi set 1",
        img: "https://ninjasushi.com.ua/img/1010.png",
        price: 260,
        description: "simple give me some philadelphia",
      },
      {
        name: "Sushi set 2",
        img: "https://ninjasushi.com.ua/img/cat1.png",
        price: 160,
        description: "and maybe some more, aleksey",
      },
    ],
  },
  {
    name: "Domino's Pizza",
    products: [
      {
        name: "Parma",
        img: "https://media.dominos.ua/menu/product_osg_image/2020/12/28/Vetchina_i_griby_1.jpg",
        price: 170,
        description: "some meat and flour idk",
      },
      {
        name: "5 cheese",
        img: "https://media.dominos.ua/__sized__/menu/product_osg_image/2019/10/03/%D1%81%D0%BF%D0%B0%D0%B9%D1%81%D0%B8-min-thumbnail-480x480-70.jpg",
        price: 175,
        description: "flour and cheese cheese cheese cheese cheese",
      },
    ],
  },
];

const insert = async () => {
  await sequelize.sync({ force: true });
  for (const admin of admins) {
    const hashedPassword = await bcrypt.hash(admin.password, 5);
    await adminsProvider.create(admin.name, hashedPassword);
  }
  for (const market of markets) {
    await marketsProvider.create(market.name, market.products);
  }
  process.exit();
};

insert();
