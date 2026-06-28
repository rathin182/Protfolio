export interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  tech: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Task Management SaaS",
    image: "/projects/image.png",
    description:
      "A full-featured project management platform with real-time collaboration, Kanban boards, sprint planning, and in-depth analytics for modern teams.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    link: "#",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    image: "/projects/image copy.png",
    description:
      "Modern ecommerce solution with dynamic product catalog, AI-powered recommendations, seamless checkout, and real-time order tracking.",
    tech: ["React", "MongoDB", "Stripe", "Tailwind"],
    link: "#",
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    image: "/projects/image copy 2.png",
    description:
      "Comprehensive business analytics dashboard with live data streams, customizable charts, automated reporting, and role-based access control.",
    tech: ["Express", "PostgreSQL", "D3.js", "WebSockets"],
    link: "#",
  },
  {
    id: 4,
    title: "Task Management SaaS",
    image: "/projects/image.png",
    description:
      "A full-featured project management platform with real-time collaboration, Kanban boards, sprint planning, and in-depth analytics for modern teams.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    link: "#",
  },
  {
    id: 5,
    title: "E-Commerce Platform",
    image: "/projects/image copy.png",
    description:
      "Modern ecommerce solution with dynamic product catalog, AI-powered recommendations, seamless checkout, and real-time order tracking.",
    tech: ["React", "MongoDB", "Stripe", "Tailwind"],
    link: "#",
  },
  {
    id: 6,
    title: "Analytics Dashboard",
    image: "/projects/image copy 2.png",
    description:
      "Comprehensive business analytics dashboard with live data streams, customizable charts, automated reporting, and role-based access control.",
    tech: ["Express", "PostgreSQL", "D3.js", "WebSockets"],
    link: "#",
  },
];