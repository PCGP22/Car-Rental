import { Rubik, Poppins } from "next/font/google";

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

function HomePage() {
  return (
    <div className={`bg-amarillo_status ${rubik}`}>
      <p className={`${poppins.className}`}>Planea tu viaje ahora</p>
      <p className="text-[3em] mb-0 pb-0">
        <span className="text-naranja_enf mb-0">Ahorra </span>con nuestra{" "}
      </p>
      <p className="text-[3em] mt-0 pt-0">renta de vehículos</p>
      <div>
        <p className={`${poppins}`}>Adio k ase</p>
      </div>
    </div>
  );
}

export default HomePage;
