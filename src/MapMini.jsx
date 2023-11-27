import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MapMini() {
  const dataUseMap = [
    {
      image: "/map-2.png",
      title: "Pertama",
      description:
        "Masukkan alamat atau nama kota pada fitur search Box, lalu akan muncul tampilan seperti berikut.",
    },
    {
      image: "/map-3.png",
      title: "Kedua",
      description:
        "Pilih kota, lalu pada map akan muncul icon tempat sampah dengan warna hijau.",
    },
    {
      image: "/map-4.png",
      title: "Ketiga",
      description:
        "Pilih salah satu icon dan klik lalu akan muncul detail alamat.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="py-[20px] px-[50px]">
        <div className="flex lg:flex-row flex-col  py-5 justify-between items-center">
          <div className="flex flex-col lg:w-[500px] w-full">
            <span className="text-black/50 font-semibold">
              Eco Change / Peta Minim Sampah{" "}
            </span>
            <h1 className="text-[52px] font-semibold leading-[58px]">
              Peta Minim Sampah
            </h1>
            <p className="mt-5 text-black/60">
              Peta minim sampah menunjukkan tempat-tempat yang akan membantu
              kamu mengurangi dan mengolah sampah. Jika kamumemiliki bank sampah
              yang ingin tampil dipeta ini, bisa kontak kami.
            </p>
          </div>
          <img
            src="/map-1.png"
            alt=""
            className="lg:w-[600px] w-full rounded-2xl object-cover h-[400px] lg:mt-0 mt-[30px]"
          />
        </div>
      </main>
      <main className="lg:px-[150px] px-[20px] py-[70px] flex flex-col items-center">
        <h1 className="lg:text-[32px] text-[28px] font-semibold ">
          Cara menggunakan Peta Minim Sampah
        </h1>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-[20px] mt-[50px]">
          {dataUseMap.map((items, index) => {
            return (
              <div
                key={index}
                className="flex flex-col border-4 transition-all py-[20px] p-5 border-black/10 rounded-xl hover:border-[#186F65] relative"
              >
                <div className="absolute -translate-x-1/2 top-2 left-1/2 text-white rounded-full flex justify-center items-center bg-[#424B5A] h-[38px] w-[38px] text-[16px] ">
                  {index + 1}
                </div>
                <div className="flex flex-col items-center mt-[30px] justify-center">
                  <img
                    src={items.image}
                    alt=""
                    className="object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-center items-center mt-3">
                    <h1 className="font-semibold"> {items.title}</h1>
                    <span className="text-sm text-black/50 text-center">
                      {items.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <main className="py-[20px] px-[50px]">
        <div className="flex lg:flex-row flex-col  py-5 justify-between items-center">
          <div className="flex flex-col lg:w-[500px] w-full">
            <span className="text-black/50 font-semibold">
              Eco Change / Peta Minim Sampah{" "}
            </span>
            <h1 className="text-[52px] font-semibold leading-[58px]">
              Peta Minim Sampah
            </h1>
            <p className="mt-5 text-black/60">
              Peta minim sampah menunjukkan tempat-tempat yang akan membantu
              kamu mengurangi dan mengolah sampah. Jika kamumemiliki bank sampah
              yang ingin tampil dipeta ini, bisa kontak kami.
            </p>
          </div>
          <img
            src="/map-1.png"
            alt=""
            className="lg:w-[600px] w-full rounded-2xl object-cover h-[400px] lg:mt-0 mt-[30px]"
          />
        </div>
      </main>
      <main></main>
      <Footer />
    </>
  );
}
