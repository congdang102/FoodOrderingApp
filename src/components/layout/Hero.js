import Image from "next/image";
import Right from "../icon/Right";

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-12 ">
        <h1 className="text-4xl font-bold">
          Everything <br /> is better <br /> with a<span className="text-red-500"> Banh Mi</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">Indulge in the Juicy Perfection of Our Gourmet Banh mi! Sink Your Teeth into Blissful Satisfaction Today!</p>
        <div className="flex gap-2 text-sm">
  <button className="flex-1 bg-red-500 rounded-full uppercase flex justify-center items-center gap-2 text-white px-4 py-2">
    Order Now <Right />
  </button>
  <div className="flex-1 flex bottom-0 items-center py-2 text-gray-600 font-semibold" type="button">
    Learn more <Right/>
  </div>
</div>

      </div>

      <div className="relative justify-center items-center">
        <Image 
          src={"/Banh-mi-thit.jpg"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"Banh mi thit"}
        />
      </div>
    </section>
  );
}
