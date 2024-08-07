import {
  Home,
  AddFolder,
  AddUser,
  Bell,
  BlogText,
  BorderHeart,
  Category,
  CircleCheck,
  CircleClose,
  Clock,
  Close,
  Comment,
  CreditCard,
  Dark,
  Date,
  Document,
  Dollar,
  DollarBag,
  DownAngle,
  Edit,
  ExchangeCrypto,
  EyeClosed,
  EyeOpen,
  Filter,
  Gallery,
  Headphone,
  LayerPlus,
  LeftAngle,
  Light,
  Location,
  LockClosed,
  LockOpen,
  MenuBars,
  MenuDots,
  Paragraph,
  Paypal,
  Power,
  Radar,
  RightAngle,
  Search,
  Settings,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  Task,
  Trash,
  TrendDown,
  TrendUp,
  Truck,
  UpAngle,
  User,
  Users,
  Camera,
  Television,
  Printer,
  Mobile,
  Speaker,
  Laptop,
  Gaming,
  Tablet,
  Watch,
  UploadIcon,
  Discount,
  Stock,
  Brand,
} from "@/components/icons/Icon";

export const icons = {
  home: <Home />,
  deliveryTruck: <Truck />,
  layerPlus: <LayerPlus />,
  addUser: <AddUser />,
  dollar: <Dollar />,
  basket: <ShoppingBasket />,
  shoppingBag: <ShoppingBag />,
  status: <Radar />,
  cart: <ShoppingCart />,
  plus: <AddFolder />,
  paper: <Comment />,
  users: <Users />,
  user: <User />,
  textB: <BlogText />,
  tasks: <Task />,
  notification: <Bell />,
  settings: <Settings />,
  power: <Power />,
  search: <Search />,
  close: <Close />,
  moon: <Dark />,
  sun: <Light />,
  trash: <Trash />,
  pen: <Edit />,
  document: <Document />,
  upload: <UploadIcon />,
  heart: <BorderHeart />,
  leftAngle: <LeftAngle />,
  rightAngle: <RightAngle />,
  upAngle: <UpAngle />,
  downAngle: <DownAngle />,
  menu: <MenuBars />,
  dots: <MenuDots />,
  paragraph: <Paragraph />,
  gallery: <Gallery />,
  clock: <Clock />,
  closedLock: <LockClosed />,
  openedLock: <LockOpen />,
  trandUp: <TrendUp />,
  trandDown: <TrendDown />,
  category: <Category />,
  roundCheck: <CircleCheck />,
  roundClose: <CircleClose />,
  filter: <Filter />,
  location: <Location />,
  creditCard: <CreditCard />,
  paypal: <Paypal />,
  dollarBag: <DollarBag />,
  eyeOpen: <EyeOpen />,
  eyeClosed: <EyeClosed />,
  exchangeCrypto: <ExchangeCrypto />,
  headphone: <Headphone />,
  camera: <Camera />,
  watch: <Watch />,
  tablet: <Tablet />,
  mobile: <Mobile />,
  speaker: <Speaker />,
  lapotp: <Laptop />,
  gaming: <Gaming />,
  printer: <Printer />,
  television: <Television />,
};

export const images = {
  authLogin: "/images/auth-register.png",
  authRegister: "/images/auth-login.png",
  admin: "/images/admin-1.jpg",
  admin2: "/images/admin-2.jpg",
  admin3: "/images/admin-3.jpg",
};

export const menuLinks = [
  {
    title: "Dashboard",
    image: icons.home,
    link: "/dashboard",
  },
  {
    title: "Orders",
    image: icons.deliveryTruck,
    link: "/orders",
  },
  {
    title: "Products",
    image: icons.basket,
    link: "/products",
  },
  {
    title: "Add Product",
    image: icons.layerPlus,
    link: "/add-product",
  },
  {
    title: "Comments",
    image: icons.paper,
    link: "/comments",
  },
  {
    title: "Users",
    image: icons.users,
    link: "/users",
  },
  {
    title: "Blogs",
    image: icons.textB,
    link: "/blogs",
  },
  {
    title: "Add Blog",
    image: icons.paragraph,
    link: "/add-blog",
  },
  {
    title: "Tasks",
    image: icons.tasks,
    link: "/tasks",
  },
  {
    title: "Account",
    image: icons.settings,
    link: "/account",
  },
];

export const profileLinks = [
  {
    icon: <Home />,
    name: "Home",
    href: "/dashboard",
  },
  {
    icon: <User />,
    name: "Profile",
    href: "/account",
  },
  {
    icon: <Task />,
    name: "Tasks",
    href: "/tasks",
  },
  {
    icon: <ShoppingBasket />,
    name: "Products",
    href: "/products",
  },
  {
    icon: <LayerPlus />,
    name: "New Product",
    href: "/add-product",
  },
];

export const categories = [
  {
    image: icons.camera,
    title: "Camera",
    query: "camera",
  },
  {
    image: icons.gaming,
    title: "Gaming",
    query: "gaming",
  },
  {
    image: icons.headphone,
    title: "Headphone",
    query: "headphone",
  },
  {
    image: icons.lapotp,
    title: "Laptop",
    query: "laptop",
  },
  {
    image: icons.mobile,
    title: "Phone",
    query: "phone",
  },
  {
    image: icons.printer,
    title: "Printer",
    query: "printer",
  },
  {
    image: icons.speaker,
    title: "Speaker",
    query: "speaker",
  },
  {
    image: icons.tablet,
    title: "Tablet",
    query: "tablet",
  },
  {
    image: icons.television,
    title: "TV",
    query: "tv",
  },
  {
    image: icons.watch,
    title: "Watch",
    query: "watch",
  },
];

export const productInformationDetails = (info) => [
  {
    name: "Price:",
    value: `$${info?.price.toLocaleString()}`,
    icon: (
      <Dollar
        className="text-darkGray"
        wrapperClassName="cardShadow rounded-lg p-3"
      />
    ),
  },
  {
    name: "Discount:",
    value: `%${info?.discount.toLocaleString()}`,
    icon: (
      <Discount
        className="text-darkGray"
        wrapperClassName="cardShadow rounded-lg p-3"
      />
    ),
  },
  {
    name: "Stock:",
    value: info?.stock.toLocaleString(),
    icon: (
      <Stock
        className="text-darkGray"
        wrapperClassName="cardShadow rounded-lg p-3"
      />
    ),
  },
  {
    name: "Brand:",
    value: info?.brand,
    icon: (
      <Brand
        className="text-darkGray"
        wrapperClassName="cardShadow rounded-lg p-3"
      />
    ),
  },
  {
    name: "Category:",
    value: info?.category,
    icon: (
      <Category
        className="text-darkGray"
        wrapperClassName="cardShadow rounded-lg p-3"
      />
    ),
  },
];
