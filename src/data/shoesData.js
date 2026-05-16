import shoe1 from '../assets/shoe1.png';
import shoe2 from '../assets/shoe2.png';
import shoe3 from '../assets/shoe3.png';
import shoe4 from '../assets/shoe4.png';
import shoe5 from '../assets/shoe5.png';

// Women's generated images
import womenShoe1 from '../assets/women_shoe_1.png';
import womenShoe2 from '../assets/women_shoe_2.png';
import womenShoe3 from '../assets/women_shoe_3.png';
import womenShoe4 from '../assets/women_shoe_4.png';
import womenShoe5 from '../assets/women_shoe_5.png';

// Kids generated images
import kidsShoe1 from '../assets/kids_shoe_1.png';
import kidsShoe2 from '../assets/kids_shoe_2.png';
import kidsShoe3 from '../assets/kids_shoe_3.png';

export const shoesData = {
  men: [
    {
      Name: "AIR FORCE 1",
      GhostText: "AIR FORCE 1",
      Color: "#72DF5E",
      TextColor: "#111111",
      Price: "$120",
      Image: shoe1,
      leftTitle: "01 / HERITAGE DESIGN",
      leftHeader: "TIMELESS ICON",
      leftDesc: "Crisp leather overlays and pristine profile lines deliver the legendary streetwear aesthetic that defined a generation.",
      rightTitle: "02 / COURT MECHANICS",
      rightHeader: "ENCAPSULATED AIR",
      rightDesc: "Premium concealed sole units offer classic resilient cushioning, engineered originally for hardwood performance and rebuilt for daily comfort."
    },
    {
      Name: "AIR JORDAN 1",
      GhostText: "JORDAN 1",
      Color: "#EA553B",
      TextColor: "#111111",
      Price: "$160",
      Image: shoe2,
      leftTitle: "01 / FLIGHT STRUCTURE",
      leftHeader: "HIGH-TOP LOCKDOWN",
      leftDesc: "Signature supportive ankle collars paired with premium grain panels provide robust stability and an elite, close-to-foot fit profile.",
      rightTitle: "02 / IMPACT RESPONSE",
      rightHeader: "VERTICAL DECELERATION",
      rightDesc: "Optimized rubber cupsoles housing targeted traction grooves ensure ultimate multidirectional grip and explosive feedback on impact."
    },
    {
      Name: "DUNK LOW",
      GhostText: "DUNK LOW",
      Color: "#D16C36",
      TextColor: "#111111",
      Price: "$140",
      Image: shoe3,
      leftTitle: "01 / TEXTURE COMPOSITION",
      leftHeader: "TACTILE ELEVATION",
      leftDesc: "Heavy-gauge textured suede meeting subtle contrast stitching brings a refined, premium material depth to the classic low-profile silhouette.",
      rightTitle: "02 / CHASSIS FLEXIBILITY",
      rightHeader: "LOW-PROFILE AGILITY",
      rightDesc: "Lightened lightweight foam midsoles provide direct court-feel and responsive, natural articulation for effortless daily movement."
    },
    {
      Name: "AIR MAX 90",
      GhostText: "AIR MAX 90",
      Color: "#E89BB6",
      TextColor: "#111111",
      Price: "$150",
      Image: shoe4,
      leftTitle: "01 / TRACK EVOLUTION",
      leftHeader: "DYNAMIC LAYERING",
      leftDesc: "Aggressive TPU accents woven into synthetic mesh frames offer strategic micro-ventilation and unmatched lateral durability.",
      rightTitle: "02 / CUSHIONING MATRIX",
      rightHeader: "VISIBLE MAX AIR",
      rightDesc: "The iconic exposed window capsule provides high-volume kinetic absorption and massive energy return through every phase of transition."
    },
    {
      Name: "CORTEZ",
      GhostText: "CORTEZ",
      Color: "#6D4936",
      TextColor: "#FFFFFF",
      Price: "$110",
      Image: shoe5,
      leftTitle: "01 / STREAK SILHOUETTE",
      leftHeader: "AERODYNAMIC PROFILE",
      leftDesc: "Ultralight, streamlined upper patterns minimize air resistance while maximizing classic retro running aesthetics.",
      rightTitle: "02 / PROPULSION PLATFORM",
      rightHeader: "WEDGE MIDSOLE",
      rightDesc: "Dual-density herringbone foam wedges deliver distinct heel-to-toe shock attenuation and snappy forward-propulsion characteristics."
    }
  ],
  women: [
    {
      Name: "DUNK LOW WMNS",
      GhostText: "DUNK LOW",
      Color: "#FFC0CB", // Pastel Pink
      TextColor: "#111111",
      Price: "$125",
      Image: womenShoe1,
      hasWhiteBg: true,
      leftTitle: "01 / SOFT PALETTE",
      leftHeader: "PASTEL PERFECTION",
      leftDesc: "Featuring a delicate pink and white colorway, redefining the classic basketball silhouette for modern daily streetwear.",
      rightTitle: "02 / LOW PROFILE",
      rightHeader: "STREET READY",
      rightDesc: "The iconic Dunk midsole offers lightweight cushioning perfectly balanced with a premium leather upper."
    },
    {
      Name: "AIR MAX 270",
      GhostText: "AIR MAX",
      Color: "#FF7F50", // Coral Pink
      TextColor: "#FFFFFF",
      Price: "$160",
      Image: womenShoe2,
      hasWhiteBg: true,
      leftTitle: "01 / VISIBLE AIR",
      leftHeader: "MASSIVE LIFT",
      leftDesc: "Equipped with our largest heel Air unit yet, delivering impossible softness and vibrant coral energy with every step.",
      rightTitle: "02 / MESH UPPER",
      rightHeader: "BREATHABLE FIT",
      rightDesc: "Engineered woven fabrics provide targeted ventilation and a sock-like fit that adapts to your natural stride."
    },
    {
      Name: "AF1 SHADOW",
      GhostText: "SHADOW",
      Color: "#E6E6FA", // Lavender/Mint mix conceptual
      TextColor: "#111111",
      Price: "$130",
      Image: womenShoe3,
      hasWhiteBg: true,
      leftTitle: "01 / DOUBLED UP",
      leftHeader: "LAYERED DESIGN",
      leftDesc: "Featuring double eyelets, mudguards, and swooshes. The Shadow brings a playful, exaggerated aesthetic to the AF1 legacy.",
      rightTitle: "02 / ELEVATED STANCE",
      rightHeader: "PLATFORM MIDSOLE",
      rightDesc: "A slightly exaggerated midsole maintains iconic heritage while offering a bold, elevated perspective."
    },
    {
      Name: "V2K RUN",
      GhostText: "V2K RUN",
      Color: "#C0C0C0", // Metallic Silver
      TextColor: "#111111",
      Price: "$120",
      Image: womenShoe4,
      hasWhiteBg: true,
      leftTitle: "01 / Y2K AESTHETIC",
      leftHeader: "METALLIC FLASH",
      leftDesc: "Throwing it back to the early 2000s with flashy metallic silver overlays wrapping a breathable, lightweight mesh base.",
      rightTitle: "02 / DUAL DENSITY",
      rightHeader: "CUSHIONED RIDE",
      rightDesc: "Modern foam technologies hidden within a retro chunky sole design for all-day comfort and undeniable street presence."
    },
    {
      Name: "AIR HUARACHE",
      GhostText: "HUARACHE",
      Color: "#F5F5DC", // Beige
      TextColor: "#111111",
      Price: "$140",
      Image: womenShoe5,
      hasWhiteBg: true,
      leftTitle: "01 / HUG YOUR FOOT",
      leftHeader: "NEOPRENE BOOTIE",
      leftDesc: "The legendary inner sleeve stretches to your foot for a custom fit, wrapped in elegant beige and cream tones.",
      rightTitle: "02 / ICONIC CAGE",
      rightHeader: "HEEL SUPPORT",
      rightDesc: "The signature exoskeleton heel cage provides locked-in support while maintaining the unmistakable 90s running silhouette."
    }
  ],
  kids: [
    {
      Name: "AIR FORCE 1 PS",
      GhostText: "AF1 KIDS",
      Color: "#FF4444",
      TextColor: "#FFFFFF",
      Price: "$75",
      Image: kidsShoe1,
      hasWhiteBg: true,
      leftTitle: "01 / PLAYGROUND TOUGH",
      leftHeader: "BUILT TO PLAY",
      leftDesc: "Durable leather uppers with reinforced toe boxes handle every adventure, from recess sprints to weekend playground sessions.",
      rightTitle: "02 / EASY ON",
      rightHeader: "VELCRO LOCKDOWN",
      rightDesc: "Hook-and-loop closures let little ones gear up independently with a secure, adjustable fit every time."
    },
    {
      Name: "DUNK LOW PS",
      GhostText: "DUNK PS",
      Color: "#4169E1",
      TextColor: "#FFFFFF",
      Price: "$65",
      Image: kidsShoe2,
      hasWhiteBg: true,
      leftTitle: "01 / MINI ICON",
      leftHeader: "COURT CLASSIC",
      leftDesc: "Scaled-down heritage basketball styling with vibrant royal blue overlays that stand out on the schoolyard.",
      rightTitle: "02 / GROWING FEET",
      rightHeader: "FLEXIBLE SOLE",
      rightDesc: "Flex-groove outsoles bend naturally with developing feet, promoting healthy movement patterns during active play."
    },
    {
      Name: "AIR MAX TINY",
      GhostText: "AIR MAX",
      Color: "#FFD700",
      TextColor: "#111111",
      Price: "$80",
      Image: kidsShoe3,
      hasWhiteBg: true,
      leftTitle: "01 / ENERGY BURST",
      leftHeader: "BOLD & BRIGHT",
      leftDesc: "Eye-catching yellow and black colorway brings maximum energy and unstoppable confidence to every little athlete.",
      rightTitle: "02 / BOUNCE BACK",
      rightHeader: "AIR CUSHION",
      rightDesc: "Visible Air units provide real, responsive cushioning that keeps up with non-stop jumping, running, and exploring."
    }
  ],
  sale: [
    {
      Name: "AIR JORDAN 1",
      GhostText: "JORDAN 1",
      Color: "#EA553B",
      TextColor: "#111111",
      Price: "$112",
      originalPrice: "$160",
      onSale: true,
      Image: shoe2,
      leftTitle: "01 / FLIGHT STRUCTURE",
      leftHeader: "HIGH-TOP LOCKDOWN",
      leftDesc: "Signature supportive ankle collars paired with premium grain panels provide robust stability and an elite, close-to-foot fit profile.",
      rightTitle: "02 / IMPACT RESPONSE",
      rightHeader: "VERTICAL DECELERATION",
      rightDesc: "Optimized rubber cupsoles housing targeted traction grooves ensure ultimate multidirectional grip and explosive feedback on impact."
    },
    {
      Name: "AIR MAX 90",
      GhostText: "AIR MAX 90",
      Color: "#E89BB6",
      TextColor: "#111111",
      Price: "$105",
      originalPrice: "$150",
      onSale: true,
      Image: shoe4,
      leftTitle: "01 / TRACK EVOLUTION",
      leftHeader: "DYNAMIC LAYERING",
      leftDesc: "Aggressive TPU accents woven into synthetic mesh frames offer strategic micro-ventilation and unmatched lateral durability.",
      rightTitle: "02 / CUSHIONING MATRIX",
      rightHeader: "VISIBLE MAX AIR",
      rightDesc: "The iconic exposed window capsule provides high-volume kinetic absorption and massive energy return through every phase of transition."
    },
    {
      Name: "AIR MAX 270 W",
      GhostText: "AIR MAX",
      Color: "#FF7F50",
      TextColor: "#FFFFFF",
      Price: "$112",
      originalPrice: "$160",
      onSale: true,
      Image: womenShoe2,
      hasWhiteBg: true,
      leftTitle: "01 / VISIBLE AIR",
      leftHeader: "MASSIVE LIFT",
      leftDesc: "Equipped with our largest heel Air unit yet, delivering impossible softness and vibrant coral energy with every step.",
      rightTitle: "02 / MESH UPPER",
      rightHeader: "BREATHABLE FIT",
      rightDesc: "Engineered woven fabrics provide targeted ventilation and a sock-like fit that adapts to your natural stride."
    },
    {
      Name: "AIR MAX TINY",
      GhostText: "AIR MAX",
      Color: "#FFD700",
      TextColor: "#111111",
      Price: "$56",
      originalPrice: "$80",
      onSale: true,
      Image: kidsShoe3,
      hasWhiteBg: true,
      leftTitle: "01 / ENERGY BURST",
      leftHeader: "BOLD & BRIGHT",
      leftDesc: "Eye-catching yellow and black colorway brings maximum energy and unstoppable confidence to every little athlete.",
      rightTitle: "02 / BOUNCE BACK",
      rightHeader: "AIR CUSHION",
      rightDesc: "Visible Air units provide real, responsive cushioning that keeps up with non-stop jumping, running, and exploring."
    }
  ]
};
