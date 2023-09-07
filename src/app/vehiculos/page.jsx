"use client";
import { sliceData, slicePage } from "@/libs/functions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "@/store/slices/car";
import FiltroVehiculos from "@/components/FiltroVehiculos";
import CarCard from "@/components/CarCard.jsx";
import { Rubik, Poppins } from "next/font/google";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import FormRent from "../../components/FormRent";
import CarCardDetail from "@/components/CarCardDetail";

const fontRubik = Rubik({
  weight: "600",
  subsets: ["latin"],
});

const fontPoppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});
const poppins = fontPoppins.className;
const rubik = fontRubik.className;

function Vehiculos() {
  const dispatch = useDispatch();

  const [visibility, setVisibility] = useState(false);
  const [detailVisibility, setDetailVisibility] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [detailData, setDetailData] = useState();
  const [price, setPrice] = useState();
  const [model, setModel] = useState();
  const [image, setImage] = useState();

  useEffect(() => {
    dispatch(getCars());
  }, []);

  const cars = useSelector((state) => state.cars.showCars);

  useEffect(() => {
    setCurrentPage(1);
  }, [cars]);

  function handleVisibility(data) {
    if (data.name) {
      setModel(data.name);
    }
    if (data.price) {
      setPrice(data.price);
      console.log(data.price);
    }
    if (data.image) {
      setImage(data.image);
    }
    setVisibility(!visibility);
    console.log(document.body.classList);
    if (document.body.classList.length === 1) {
      document.body.classList.toggle("stopScroll");
    } else if (!detailVisibility) {
      document.body.classList.remove("stopScroll");
    }
  }

  function handleDetail(data) {
    setDetailData(data);
    handleDetailVisibility();
  }

  function handleDetailVisibility() {
    setDetailVisibility(!detailVisibility);
    document.body.classList.toggle("stopScroll");
  }

  let dataToShow = cars;
  let quantityPerPage = 12;
  let max = Math.ceil(dataToShow.length / quantityPerPage);
  let pages = [];
  let x = 0;

  while (x < max) {
    x++;
    pages.push(x);
  }

  let data = sliceData(dataToShow, currentPage, quantityPerPage);
  let currentPages = slicePage(pages, currentPage, 2);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < max) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.innerHTML));
  };

  return (
    <>
      <header
        className={`bg-gris_fondo relative ${rubik} space-y-0 space-x-2.5 p-10 md:text-[1.4em] h-[175px] flex items-center overflow-x-clip`}>
        <p className="text-[2em]  leading-6 pl-6">Nuestros vehículos</p>
        <img
          src="https://drive.google.com/uc?export=download&id=1tTjEHMJE7Y2jdEUCYTCH5gYdg8t06OgM"
          className=" float-right w-[50vw] absolute right-[-15%] scale-x-[-1] top-0 z-1"
        />
      </header>
      <section
        className={`pt-4 ${poppins} mx-[auto] text-[0.8em] bg-gris_frente pb-12`}>
        <p className={`text-[2.4em] ${rubik} mb-2 text-center mt-6`}>
          Encuentra el vehículo ideal
        </p>
        <FiltroVehiculos />
      </section>
      <section
        className={`pt-4 ${rubik} mx-[auto] text-[0.8em] bg-gris_frente pb-12 place-items-center w-[95%]`}>
        <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-2 gap-y-10">
          {data?.map((car) => {
            return (
              <CarCard
                key={car.id}
                car={car}
                handleVisibility={handleVisibility}
                handleDetailVisibility={handleDetailVisibility}
                handleDetail={handleDetail}
              />
            );
          })}
        </div>
      </section>
      <div className="w-full flex justify-center gap-2 mt-8 mb-8">
        {data.length === 0 && (
          <p className="text-[1em] text-center text-naranja_enf px-4 bg-gris_fondo py-2 rounded-full">
            Nada que mostrar
          </p>
        )}
        <button
          onClick={handlePrevious}
          className={
            currentPage === 1
              ? "px-3 py-1 border-[2px] border-black bg-negro_fondo text-white rounded-md"
              : "px-3 py-1 border-[2px] border-black bg-naranja_enf text-white rounded-md"
          }>
          <FiChevronLeft className="symbolSearch" />
        </button>
        {currentPage && (
          <button
            onClick={() => setCurrentPage(1)}
            className={
              currentPage === 1
                ? "px-3 py-1 border-[2px] border-black bg-negro_fondo text-white rounded-md"
                : "px-3 py-1 border-[2px] border-black bg-naranja_enf text-white rounded-md"
            }>
            1
          </button>
        )}
        {currentPage > 4 && pages.length > 13 && <span>...</span>}
        {currentPages
          .filter((p) => p > 0 && p <= max)
          .map((p) => {
            return (
              <button
                onClick={handlePageChange}
                className={
                  currentPage === p
                    ? "px-3 py-1 border-[2px] border-black bg-negro_fondo text-white rounded-md"
                    : "px-3 py-1 border-[2px] border-black bg-naranja_enf text-white rounded-md"
                }
                key={p}>
                {p}
              </button>
            );
          })}
        {currentPage + 3 < max ? (
          <>
            <span>...</span>
            <button
              onClick={() => setCurrentPage(max)}
              className="px-3 py-1 border-[2px] border-black bg-naranja_enf text-white rounded-md">
              {max}
            </button>
          </>
        ) : (
          currentPage + 3 <= max && (
            <button
              onClick={() => setCurrentPage(max)}
              className="px-3 py-1 border-[2px] border-black bg-naranja_enf text-white rounded-md">
              {max}
            </button>
          )
        )}
        <button
          onClick={handleNext}
          className={
            currentPage === max
              ? "px-3 py-1 border-[2px] border-black bg-negro_fondo text-white rounded-md"
              : "px-3 py-1 border-[2px] border-black bg-naranja_enf text-white rounded-md"
          }>
          <FiChevronRight className="symbolSearch" />
        </button>
      </div>
      <FormRent
        isAuth={true}
        visible={visibility}
        handleVisible={handleVisibility}
        model={model}
        image={image}
        price={price}
      />
      <CarCardDetail
        visible={detailVisibility}
        product={detailData}
        handleClose={handleDetailVisibility}
        handleRentVisibility={handleVisibility}
      />
    </>
  );
}

export default Vehiculos;
