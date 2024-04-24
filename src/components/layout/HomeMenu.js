'use client';
import MenuItem from "@/components/menu/MenuItem";
import Image from "next/image";
import SectionHeader from "./SectionHeader";
import { useEffect, useState } from "react";


export default function HomeMenu() {
  const [bestSellers, setBestSellers] =  useState([]);
  useEffect(() => {
    fetch('/api/menu-items')
      .then(res => res.json())
      .then(menuItems => {
        setBestSellers(menuItems.slice(-3)); // Chỉ lấy 3 mục cuối cùng
      })
      .catch(error => console.error('Error fetching menu items:', error));
  }, []);
  return (
    <section>
            <div className="absolute right-0 left-0  w-full justify-start">
                <div  className=" -top-[70px] absolute text-left left-12 -z-10">
                          <Image 
                    src={"/Salad.png"}
                    
                   
                    alt={"pizza"}
                    width={109}
                    height={189}
                  />
                  
                </div>
                <div  className="absolute -top-[100px] right-0  -z-10">
                        <Image 
                  src={"/Salad.png"}
                  width={107}
                  height={195}
                  alt={"pizza"}
                />
                  
                </div>
            </div>
            <div className="text-center mb-4">
              
            <SectionHeader subHeader={'check out'} mainHeader={'Our Best Selllers'} />
            </div>
            <div className="grid grid-cols-3 gap-4 "> {/* Thêm lớp justify-items-center */}
            {bestSellers && bestSellers.length > 0 && bestSellers.map(item => (
          <MenuItem key={item._id} item={item} />
        ))}

            </div>
        </section>
  );
}
