import React from 'react'
import ProductCard from '../shared/ProductCard'


const products=[
        {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReVWJzaRsj6B7MX4qhKwL5i1kGAyltEBWuGQ&s",
    productName: "iPhone 13 Pro Max",
    description:
      "The iPhone 13 Pro Max offers exceptional performance with its A15 Bionic chip, stunning Super Retina XDR display, and advanced camera features for breathtaking photos.",
    specialPrice: 720,
    price: 780,
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrR_kr2bPkCQ8_mvt-HktAGHY4dDw-tE3LVg&s",
    productName: "Samsung Galaxy S21",
    description:
      "Experience the brilliance of the Samsung Galaxy S21 with its vibrant AMOLED display, powerful camera, and sleek design that fits perfectly in your hand.",
    specialPrice: 699,
    price: 799,
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFBdBmSAAuJiZZuFXT64zNNzQZQFV3qYxQBg&s",
    productName: "Google Pixel 6",
    description:
      "The Google Pixel 6 boasts cutting-edge AI features, exceptional photo quality, and a stunning display, making it a perfect choice for Android enthusiasts.",
    price: 599,
    specialPrice: 400,
  }
    ]

const about=true;





const About = () => {
    
return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
            <h1 className='text-slate-800 text-4xl font-bold text-center mb-12'>
                    About Us
            </h1>
            <div className='flex flex-col lg:flex-row justify-between items-center mb-12'>
                    <div className='w-full md:w-1/2 text-center md:text-left'>
                            <p className='text-lg mb-4'>
                                Welcome to our e-commerce platform! We are dedicated to providing you with a seamless online shopping experience, offering a wide range of quality products at competitive prices.
                                 Our team is passionate about customer satisfaction and strives to deliver exceptional service every step of the way. 
                                 Thank you for choosing us as your trusted shopping destination.
                            </p>
                    </div>
                    <div className='w-full md:w-1/2 mb-6 md:mb-0'>
                            <img src='https://media.istockphoto.com/id/1346125184/photo/group-of-successful-multiethnic-business-team.jpg?s=612x612&w=0&k=20&c=5FHgRQZSZed536rHji6w8o5Hco9JVMRe8bpgTa69hE8=' alt='About us'
                            className='w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105' />
                    </div>
            </div>

            <div className='py-7 space-y-8'>
                <h1 className='text-slate-800 text-4xl font-bold text-center mb-12'>
                    Our Products
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        products.map((product,index)=>(
                            <ProductCard 
                                key={index}
                                image={product.image}
                                productName={product.productName}
                                description={product.description}
                                specialPrice={product.specialPrice}
                                price={product.price}
                                about={about}
                                />))
                    }
                </div>

            </div>
    </div>
)
}


export default About