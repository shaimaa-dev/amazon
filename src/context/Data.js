import {v4 as uuidv4} from 'uuid';
import {product1 ,  product2 , product3 , product4 , product5 , product6} from '../asstes/index';
const Data = [
    {
        id: uuidv4(),
        title: 'Razer Kraken Tournament Edition THX 7.1 Surround Sound Gaming Headset: Retractable Noise Cancelling Mic - USB DAC -  For PC, PS4, PS5, Nintendo Switch, Xbox One, Xbox Series X & S, Mobile – Black',
        price: 10.99,
        rating:5,
        image: product1,
    },
    {
        id: uuidv4(),
        title:"Lenovo - 2021 - IdeaPad 3 - Gaming Laptop - AMD Ryzen 5 5600H - 8GB RAM - 256GB Storage - NVIDIA GeForce GTX 1650-15.6 FHD Display - Windows 11 Home",
        price: 699,
        rating:4,
        image: product2,
    },
    {
        id: uuidv4(),
        title: "Fujitsu ScanSnap iX1600 Wireless or USB High-Speed Cloud Enabled Document, Photo & Receipt Scanner with Large Touchscreen and Auto Document Feeder for Mac or PC, White",
        price: 99,
        rating:3,
        image: product3,
    },
    {
        id: uuidv4(),
        title: 'Meta Quest 2 — Advanced All-In-One Virtual Reality Headset — 128 GB',
        price: 139,
        rating:5,
        image: product4,
    },
    {
        id: uuidv4(),
        title:"MeLE PCG02 Fanless Mini PC Stick Windows 11 Pro J4125 8GB/128GB Portable Mini Desktop Computer Stick Business & Home Video Support HDMI 4K 60Hz, BT4.2, 2.4G/5.8G Dual Band Wi-Fi, USB, Ethernet...",
        price: 425,
        rating:5,
        image: product6,
    },
    {
        id: uuidv4(),
        title: 'SAMSUNG Galaxy S22 Ultra Cell Phone, Factory Unlocked Android Smartphone, 128GB, 8K Camera & Video, Brightest Display Screen, S Pen, Long Battery Life, Fast 4nm Processor, US Version, Phantom Black',
        price: 35,
        rating:4,
        image: product5,
    }
    
]
export default Data;