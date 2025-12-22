// src/assets/blog.js
import blog1 from "./blogs/blog1.png";
import blog2 from "./blogs/blog2.png";
import blog3 from "./blogs/blog3.png";
import blog4 from "./blogs/blog4.png";
import blog5 from "./blogs/blog5.png";
import blog6 from "./blogs/blog6.png";

export const blogData = [
  {
    id: 1,
    title: "Understanding React Hooks",
    description: "A beginner-friendly guide to useState and useEffect.",
    image: blog1,
    author: "Afzaal Jutt",
    date: "2025-12-12",
    category: "Web Dev",
    isPublished: true,
  },
  {
    id: 2,
    title: "Mastering Android Jetpack Compose",
    description: "Learn how modern Android UI is built.",
    image: blog2,
    author: "John Doe",
    date: "2025-12-10",
    category: "Android Dev",
    isPublished: false,
  },
  {
    id: 3,
    title: "Getting Started with AI & ML",
    description: "Machine learning explained in simple words.",
    image: blog3,
    author: "Sara Ali",
    date: "2025-12-08",
    category: "AI & ML",
    isPublished: true,
  },
  {
    id: 4,
    title: "iOS Development with SwiftUI",
    description: "Build iOS apps quickly using SwiftUI.",
    image: blog4,
    author: "Ali Khan",
    date: "2025-12-05",
    category: "iOS Dev",
    isPublished: false,
  },
  {
    id: 5,
    title: "Advanced React Patterns",
    description: "Enhance your React apps with advanced patterns.",
    image: blog5,
    author: "Fatima Noor",
    date: "2025-12-03",
    category: "Web Dev",
    isPublished: true,
  },
  {
    id: 6,
    title: "AI in Everyday Applications",
    description: "Explore how AI is integrated into daily life.",
    image: blog6,
    author: "Hassan Raza",
    date: "2025-12-01",
    category: "AI & ML",
    isPublished: false,
  },
];

// Automatically generate categories
export const blogCategories = ["All", ...new Set(blogData.map((b) => b.category))];
