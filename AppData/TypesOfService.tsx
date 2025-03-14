import {
  ChevronRight,
  FileText,
  Settings,
  Sparkles,
  Filter,
  Car,
  PaintBucket,
  Shield,
  Wrench,
  ShieldCheck,
  Stamp,
} from "lucide-react";
import { RiCarWashingFill } from "react-icons/ri";

// export const services = [
//     {
//       id: 1,
//       name: "Ceramic and Graphene Coatings",
//       description:
//         "Durable coatings for superior shine, hydrophobic protection, and UV resistance.",
//       image: "/Ceramic.jpg",
//       features: ["Ceramic Coating", "Graphene Coating", "Car Paint Protection", "Hydrophobic Coating"],
//       category: "detailing",
//       icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
//     },
//     {
//       id: 2,
//       name: "Paint Protection Films",
//       description:
//         "Invisible scratch-resistant film with self-healing and UV protection.",
//       image: "/PPF.jpg",
//       features  : ["Car Scratch Protection", "Self-Healing Film"],
//       category: "detailing",
//       icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
//     },
//     {
//       id: 3,
//       name: "Body Shop (Denting & Painting)",
//       description:
//         "Expert dent repair and painting for a factory-finish look.",
//       image: "/Denting.jpg",
//       features: ["Car Body Repair", "Scratch Removal", "Automotive Painting"],
//       category: "maintenance",
//       icon: <PaintBucket className="w-5 h-5" aria-hidden="true" />,
//     },
//     {
//       id: 4,
//       name: "Detailing and Interior Cleaning",
//       description:
//         "Deep interior and exterior cleaning for a pristine car finish.",
//       image: "/Detailing.jpg",
//       features: ["Car Detailing", "Interior Cleaning", "Paint Correction", "Odor Removal"],
//       category: "detailing",
//       icon: <RiCarWashingFill className="w-5 h-5" aria-hidden="true" />,
//     },
//     {
//       id: 5,
//       name: "Wrap Jobs",
//       description:
//         "Custom car wraps for a stylish look and paint protection.",
//       image: "/Wrap.jpg",
//       features: ["Vehicle Wrapping", "Custom Wraps", "Paint Protection"],
//       category: "detailing",
//       icon: <Stamp className="w-5 h-5" aria-hidden="true" />,
//     },
//     {
//       id: 6,
//       name: "Insurance Claims",
//       description:
//         "Hassle-free car insurance claim assistance and repairs.",
//       image: "/Insurance.jpg",
//       features: ["Insurance Assistance", "Policy Review", "Coverage Documentation", "Claim Processing"],
//       category: "documentation",
//       icon: <Shield className="w-5 h-5" aria-hidden="true" />,
//     },
//     {
//       id: 7,
//       name: "Interior Modifications",
//       description:
//         "Upgrade your car's interior with custom modifications including leather seats, ambient lighting, infotainment systems, and premium accessories for ultimate comfort and style.",
//       image: "/Interior-mods.jpg",
//       features: ["Interior Modifications", "Car Customization", "Luxury Car Interior", "Ambient Lighting"],
//       category: "detailing",
//       icon: <Car className="w-5 h-5" aria-hidden="true" />,
//     },
//     {
//       id: 8,
//       name: "Other Services",
//       description:
//         "Specialized services for tuning, detailing, upgrades, and more.",
//       image: "/Other-services.jpg",
//       features: ["Car Upgrades", "Auto Detailing", "Custom Tuning", "Interior Mods"],
//       category: "maintenance",
//       icon: <Wrench className="w-5 h-5" aria-hidden="true" />,
//     },
//   ];

export const services = [
  {
    id: 1,
    name: "Ceramic and Graphene Coatings",
    description:
      "Durable coatings for superior shine, hydrophobic protection, and UV resistance.",
    details: "Ceramic and graphene coatings provide a long-lasting protective layer over your car’s paint, preventing oxidation, minor scratches, and UV damage. The hydrophobic nature repels water and dirt, keeping your car cleaner for longer. These coatings enhance your car’s shine and make maintenance effortless. It lasts up to 3-5 years with proper care and takes around 6-8 hours to apply.",
    price: "Starting from ₹15,000",
    image: "/Ceramic.jpg",
    features: ["Ceramic Coating", "Graphene Coating", "Car Paint Protection", "Hydrophobic Coating"],
    category: "detailing",
    recentWork: ["/work1.jpg", "/work2.jpg", "/work3.jpg", "/work4.jpg"],
    icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 2,
    name: "Paint Protection Films",
    description:
      "Invisible scratch-resistant film with self-healing and UV protection.",
    details: "PPF acts as an invisible shield, absorbing minor impacts and scratches while maintaining the original paint. With self-healing properties, light scratches disappear with heat exposure. It’s perfect for those who want extra protection without altering their car’s appearance. PPF can last between 5-10 years and takes around 8-12 hours to apply.",
    price: "Starting from ₹30,000",
    image: "/PPF.jpg",
    features: ["Car Scratch Protection", "Self-Healing Film"],
    category: "detailing",
    recentWork: ["/ppf1.jpg", "/ppf2.jpg", "/ppf3.jpg", "/ppf4.jpg"],
    icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 3,
    name: "Body Shop (Denting & Painting)",
    description:
      "Expert dent repair and painting for a factory-finish look.",
    details: "Our denting and painting service ensures that your car gets a flawless finish after any scratches, dents, or accident damage. We use high-quality paints and precision techniques for a factory-like appearance. The process takes around 2-5 days, depending on the damage, and the paint quality ensures a long-lasting finish.",
    price: "Starting from ₹5,000",
    image: "/Denting.jpg",
    features: ["Car Body Repair", "Scratch Removal", "Automotive Painting"],
    category: "maintenance",
    recentWork: ["/dent1.jpg", "/dent2.jpg", "/dent3.jpg", "/dent4.jpg"],
    icon: <PaintBucket className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 4,
    name: "Detailing and Interior Cleaning",
    description:
      "Deep interior and exterior cleaning for a pristine car finish.",
    details: "Our detailing service restores your car’s showroom-like finish by deep cleaning the interior and exterior. From paint correction to removing stubborn stains inside, our service enhances the overall appeal and hygiene of your car. The results last 3-6 months and take 4-6 hours to complete.",
    price: "Starting from ₹3,500",
    image: "/Detailing.jpg",
    features: ["Car Detailing", "Interior Cleaning", "Paint Correction", "Odor Removal"],
    category: "detailing",
    recentWork: ["/detail1.jpg", "/detail2.jpg", "/detail3.jpg", "/detail4.jpg"],
    icon: <RiCarWashingFill className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 5,
    name: "Wrap Jobs",
    description:
      "Custom car wraps for a stylish look and paint protection.",
    details: "Car wraps allow you to change the look of your vehicle while protecting the original paint. Available in different textures and colors, wraps are a cost-effective way to customize your car. They last 3-5 years and take 6-12 hours to apply.",
    price: "Starting from ₹25,000",
    image: "/Wrap.jpg",
    features: ["Vehicle Wrapping", "Custom Wraps", "Paint Protection"],
    category: "detailing",
    recentWork: ["/wrap1.jpg", "/wrap2.jpg", "/wrap3.jpg", "/wrap4.jpg"],
    icon: <Stamp className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 6,
    name: "Insurance Claims",
    description:
      "Hassle-free car insurance claim assistance and repairs.",
    details: "We assist in insurance claims, ensuring a smooth process with minimal hassle. From documentation to coordinating with insurance companies, we make sure your claims are processed efficiently. The time frame varies depending on claim processing but typically takes 3-7 days.",
    price: "Depends on claim",
    image: "/Insurance.jpg",
    features: ["Insurance Assistance", "Policy Review", "Coverage Documentation", "Claim Processing"],
    category: "documentation",
    recentWork: ["/ins1.jpg", "/ins2.jpg", "/ins3.jpg", "/ins4.jpg"],
    icon: <Shield className="w-5 h-5" aria-hidden="true" />,
  },
  {
    id: 7,
    name: "Interior Modifications",
    description:
      "Upgrade your car’s interior with luxury modifications.",
    details: "We provide premium interior upgrades including leather seats, ambient lighting, and infotainment systems to enhance comfort and style. The process takes 1-3 days depending on the modification type.",
    price: "Starting from ₹10,000",
    image: "/Interior-mods.jpg",
    features: ["Interior Modifications", "Car Customization", "Luxury Car Interior", "Ambient Lighting"],
    category: "detailing",
    recentWork: ["/int1.jpg", "/int2.jpg", "/int3.jpg", "/int4.jpg"],
    icon: <Car className="w-5 h-5" aria-hidden="true" />,
  },
  {
          id: 8,
          name: "Other Services",
          description:
            "Specialized services for tuning, detailing, upgrades, and more.",
          image: "/Other-services.jpg",
          features: ["Car Upgrades", "Auto Detailing", "Custom Tuning", "Interior Mods"],
          category: "maintenance",
          icon: <Wrench className="w-5 h-5" aria-hidden="true" />,
        },
];





export const categories = [
  { id: "all", label: "All Services", icon: <Filter className="w-4 h-4" aria-hidden="true" /> },
  { id: "maintenance", label: "Maintenance", icon: <Settings className="w-4 h-4" aria-hidden="true" /> },
  { id: "documentation", label: "Documentation", icon: <FileText className="w-4 h-4" aria-hidden="true" /> },
  { id: "detailing", label: "Detailing", icon: <Sparkles className="w-4 h-4" aria-hidden="true" /> },
];  