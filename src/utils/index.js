import { current } from "@reduxjs/toolkit"
import { FaBoxOpen, FaCheckCircle, FaHome, FaStore, FaThList } from "react-icons/fa"

export const bannersList=[
    {
    id: 1,
    image: "https://www.urbanwood.in/image/catalog/blogs/1260h-teak-wood-living-room-furniture-1051780.jpg",
    title: "Home Comfort",
    subtitle: "Living Room",
    description: "Upgrade your space with cozy and stylish sofas",
  },
  {
    id: 2,
    image: "https://images.samsung.com/is/image/samsung/p6pim/in/ua43t5450akxxl/gallery/in-fhd-t5310-428860-ua43t5450akxxl-532972981?$684_547_PNG$",
    title: "Entertainment Hub",
    subtitle: "Smart TV",
    description: "Experience the latest in home entertainment",
  },
  {
    id: 3,
    image: "https://i0.wp.com/bluejay.com.my/wp-content/uploads/2021/12/Kids-clothes-Hong-Kong-seed.jpg?resize=800%2C460&ssl=1",
    title: "Playful Picks",
    subtitle: "Kids' Clothing",
    description: "Bright and fun styles for kids, up to 20% off",
}
]

export const adminNavigation=[
  {
    name:"Dashboard",
    href:"/admin",
    icon:FaHome,
    current:true
  },
  {
    name:"Products",
    href:"/admin/products",
    icon:FaBoxOpen,
  },

  {
    name:"Categories",
    href:"/admin/categories",
    icon:FaThList,
    
  },
  {
    name:"Sellers",
    href:"/admin/sellers",
    icon:FaStore,
  },


  {
    name:"Orders",
    href:"/admin/orders",
    icon:FaCheckCircle,
  },
]