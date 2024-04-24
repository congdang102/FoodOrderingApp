import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeader from "@/components/layout/SectionHeader";


export default function Home() {
  return (
    <>
   
    <Hero/>
   <HomeMenu/>
   <section className="my-16 text-center " id="about">
     
      <SectionHeader subHeader={'Our story'} mainHeader={'About us'} /> 
      <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4" >
      <p > Chúng tôi hiểu rằng mỗi bữa ăn đều cần ngon và lành! </p>
        <p > Ngon và Lành là tiêu chuẩn mà chúng tôi thiết lập, tạo dựng để phục vụ hàng triệu khách hàng sành ăn trong nhiều năm qua.</p>
        <p > Dựa trên tiêu chuẩn đó, nguyên liệu cho sản phẩm của chúng tôi được tuyển chọn khắt khe từ các nhà cung cấp uy tín nhất, rau tươi luôn được chế biến và sử dụng trong ngày. </p>
      </div>
    </section>
    <section className="my-16 text-center " id="contact">
      <SectionHeader subHeader={'Don\' hesitate'} mainHeader={'Contact us'} /> 
      <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel: +84343754375">+84343754375</a>
      </div>
    </section>
        
  </>
  );
}
