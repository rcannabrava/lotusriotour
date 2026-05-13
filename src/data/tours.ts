import christImg from "@/assets/tour-christ.jpg";
import sugarloafImg from "@/assets/tour-sugarloaf.jpg";
import natureImg from "@/assets/tour-nature.jpg";
import helicopterImg from "@/assets/tour-helicopter.jpg";
import carnavalImg from "@/assets/tour-carnaval.jpg";
import boatImg from "@/assets/tour-boat.jpg";
import logo from "@/assets/logo.svg";

export type TourId =
  | "rio-express"
  | "tailor-made"
  | "rio-nature"
  | "helicopter"
  | "carnaval"
  | "boat";

export type TourMeta = {
  id: TourId;
  image: string;
  highlight?: "mostLoved" | "premium";
};

export const tours: TourMeta[] = [
  { id: "rio-express", image: christImg, highlight: "mostLoved" },
  { id: "tailor-made", image: sugarloafImg },
  { id: "rio-nature", image: natureImg },
  { id: "helicopter", image: helicopterImg, highlight: "premium" },
  { id: "carnaval", image: carnavalImg },
  { id: "boat", image: boatImg },
];
