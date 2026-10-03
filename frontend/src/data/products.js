export const PRODUCTS = [
  {
    slug: "psyllium-husk",
    name: "Psyllium Husk",
    tier: "Classic Grade",
    purity: "As per buyer requirement",
    badge: "Conventional",
    image:
      "https://images.unsplash.com/photo-1676619357571-b4f086f81299?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxwc3lsbGl1bSUyMGh1c2slMjBwbGFudCUyMGdyYWluJTIwc2VlZHMlMjBhZ3JpY3VsdHVyYWwlMjB0cmFkZXxlbnwwfHx8fDE3OTA4NzgwNDF8MA&ixlib=rb-4.1.0&q=85",
    alt: "Psyllium husk — natural dietary fiber exported from India by Arnava Exim",
    short:
      "Conventional psyllium husk in different purity grades, sourced according to buyer requirements.",
    description:
      "Whole psyllium husk derived from the seeds of Plantago ovata, sourced from trusted Indian supply partners. Available in conventional options and different purity grades according to buyer requirements. Suitable for food, nutraceutical and industrial applications where applicable.",
    points: [
      "Conventional options available",
      "Different purity grades as per buyer requirement",
      "Suitable for food, nutraceutical and industrial applications where applicable",
    ],
  },
  {
    slug: "psyllium-husk-powder",
    name: "Psyllium Husk Powder",
    tier: "Milled Grade",
    purity: "As per buyer requirement",
    badge: "Fine Powder",
    image:
      "https://images.pexels.com/photos/11789292/pexels-photo-11789292.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Psyllium husk powder — finely milled psyllium supplied by Arnava Exim, India",
    short:
      "Fine psyllium husk powder in different purity and mesh specifications.",
    description:
      "Finely milled psyllium husk powder supplied in different purity and mesh specifications according to buyer requirements. Fine powder options and buyer-specific specifications are available on inquiry.",
    points: [
      "Different purity and mesh specifications",
      "Fine powder options",
      "Buyer-specific specifications available",
    ],
  },
  {
    slug: "psyllium-husk-95",
    name: "Psyllium Husk 95%",
    tier: "Select 95",
    purity: "95%",
    badge: "95% Purity",
    image:
      "https://images.unsplash.com/photo-1645331465778-eb409d112198?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxwc3lsbGl1bSUyMGh1c2slMjBwbGFudCUyMGdyYWluJTIwc2VlZHMlMjBhZ3JpY3VsdHVyYWwlMjB0cmFkZXxlbnwwfHx8fDE3OTA4NzgwNDF8MA&ixlib=rb-4.1.0&q=85",
    alt: "Psyllium husk 95 percent purity grade — Indian psyllium supplier Arnava Exim",
    short:
      "Psyllium husk at 95% purity for buyers seeking a balanced commercial grade.",
    description:
      "Psyllium husk at 95% purity, a widely traded commercial grade for food and nutraceutical applications where applicable. Full specifications are shared against buyer requirements and confirmed before order finalization.",
    points: [
      "95% purity grade",
      "Widely used commercial grade",
      "Specification sheet shared on inquiry",
    ],
  },
  {
    slug: "psyllium-husk-99",
    name: "Psyllium Husk 99%",
    tier: "Prime 99",
    purity: "99%",
    badge: "99% Purity",
    image:
      "https://images.unsplash.com/photo-1755598603555-949ce8bb3b50?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHw0fHxwc3lsbGl1bSUyMGh1c2slMjBwbGFudCUyMGdyYWluJTIwc2VlZHMlMjBhZ3JpY3VsdHVyYWwlMjB0cmFkZXxlbnwwfHx8fDE3OTA4NzgwNDF8MA&ixlib=rb-4.1.0&q=85",
    alt: "Psyllium husk 99 percent high purity grade — psyllium husk exporter India Arnava Exim",
    short:
      "High-purity psyllium husk at 99% for premium food and nutraceutical applications.",
    description:
      "High-purity psyllium husk at 99%, suited to premium food and nutraceutical applications where applicable. Specifications, documentation and packaging are coordinated to match buyer and destination-country requirements.",
    points: [
      "99% high-purity grade",
      "Suited to premium applications where applicable",
      "Documentation coordinated per destination requirements",
    ],
  },
  {
    slug: "psyllium-husk-powder-99",
    name: "Psyllium Husk Powder 99%",
    tier: "Prime 99 Milled",
    purity: "99%",
    badge: "99% Purity · Powder",
    image:
      "https://images.pexels.com/photos/4055798/pexels-photo-4055798.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    alt: "Psyllium husk powder 99 percent purity — psyllium husk powder supplier Arnava Exim",
    short:
      "High-purity 99% psyllium husk powder, milled to buyer-specified mesh.",
    description:
      "Psyllium husk powder at 99% purity, milled to mesh specifications shared by the buyer. A premium milled grade for formulations that call for high-purity psyllium powder, supplied as per confirmed specifications.",
    points: [
      "99% purity, milled powder",
      "Mesh size as per buyer specification",
      "Custom specifications available",
    ],
  },
];

export const productBySlug = (slug) => PRODUCTS.find((p) => p.slug === slug);
