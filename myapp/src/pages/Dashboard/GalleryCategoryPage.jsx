// 📂 pages/GalleryCategoryPage.jsx
import { useParams } from "react-router-dom";
import CategoryGallery from "../../components/CategoryGallery";

// Mapping url slug → category name
const categoryMap = {
  "cnc-strength": "CNC STRENGTH",
  "vmc-strength": "VMC STRENGTH",
  "inbuild-machinery": "INBUILD MACHINERY",
  "jobs": "JOB'S",
  "spot-welding-electrodes": "SPOT WELDING ELECTRODES",
  "springs-jobs": "SPRINGS JOB'S",
};

export default function GalleryCategoryPage() {
  const { categorySlug } = useParams();
  const category = categoryMap[categorySlug];

  if (!category) return <p>Category not found</p>;

  return <CategoryGallery category={category} />;
}
