"use client"

import Image from "next/image"
import Link from "next/link"
import { Instagram, Twitter, Youtube, Github, Linkedin } from "lucide-react"
import { ThemeToggle } from "../components/theme-toggle"
import MobileMenu from "@/components/MobileMenu"
import { TypeAnimation } from 'react-type-animation'
import { useState, useEffect } from 'react'
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollInView, useSmoothScroll, useParallax, useLoadingState } from "@/hooks/useAnimations"
import { LoadingAnimation } from "@/components/LoadingAnimation"

export default function Home() {
  const [currentTime, setCurrentTime] = useState('');
  const { isLoading } = useLoadingState();
  const { scrollY } = useParallax();
  useSmoothScroll();
  
  // References for scroll animations
  const heroRef = useScrollInView();
  const techStackRef = useScrollInView();
  const projectsRef = useScrollInView();
  const experienceRef = useScrollInView();
  const blogsRef = useScrollInView();
  const contactRef = useScrollInView();

  useEffect(() => {
    // Update time only on client-side
    const updateTime = () => {
      const time = new Date().toLocaleTimeString('en-US', { 
        timeZone: 'Europe/Istanbul',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      setCurrentTime(time);
    };
    
    // Initial update
    updateTime();
    
    // Update time every minute
    const interval = setInterval(updateTime, 60000);
    
    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingAnimation />}
      </AnimatePresence>
      
      <div className="min-h-screen bg-[#191919] dark:bg-[#191919] bg-white text-black dark:text-white">
        {/* Navigation */}
        <motion.header 
          className="container mx-auto py-4 px-4 sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#191919]/70 border-b border-gray-200 dark:border-gray-800"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: isLoading ? 1.8 : 0 }}
        >
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 items-center">
              {[
                { href: "/", label: "Home" },
                { href: "#projects", label: "Projects" },
                { href: "#experience", label: "Experience" },
                { href: "#blogs", label: "Blogs" },
                { href: "#contact", label: "Contact" }
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={item.href} 
                    className="relative group font-medium text-gray-700 dark:text-gray-300 transition-colors hover:text-[#5badff] dark:hover:text-[#5badff] px-1 py-2"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#ff3d00] to-[#5badff] transform scale-x-0 transition-transform group-hover:scale-x-100" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu */}
            <MobileMenu />
          </nav>
        </motion.header>

        <main>
          {/* Hero Section */}
          <section className="container mx-auto py-16 px-4 text-center relative overflow-hidden" ref={heroRef.ref}>
            {/* Parallax background elements */}
            <motion.div 
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-r from-[#ff3d00]/10 to-[#5badff]/10 blur-3xl"
              style={{ 
                y: scrollY * 0.2,
                rotate: scrollY * 0.05,
              }}
            />
            <motion.div 
              className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-[#5badff]/10 to-[#ff3d00]/10 blur-3xl"
              style={{ 
                y: scrollY * -0.1,
                rotate: scrollY * -0.05,
              }}
            />
            
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ scale: 0, opacity: 0 }}
              animate={heroRef.isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: isLoading ? 2 : 0.2 }}
            >
              <div className="relative w-[160px] h-[160px] rounded-full overflow-hidden bg-gradient-to-r from-[#ff3d00] to-[#5badff]">
                <motion.div 
                  className="absolute inset-[3px] rounded-full overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image 
                    src="https://avatars.githubusercontent.com/u/122547220?s=400&u=0bb5982811c66b03c9a6b478bf805bbcfc7fcb8f&v=4" 
                    alt="Soner Yeşilay" 
                    width={154} 
                    height={154} 
                    className="object-cover" 
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={heroRef.isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: isLoading ? 2.2 : 0.4 }}
            >
              <h1 className="text-5xl font-bold mb-4">
                Soner Yeşilay
                <br />
                <span className="bg-gradient-to-r from-[#ff3d00] to-[#5badff] text-transparent bg-clip-text">
                  <TypeAnimation
                    sequence={[
                      'Back-End Dev.',
                      2000,
                      '.NET Developer',
                      2000,
                      'C# Developer',
                      2000
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{ display: 'inline-block' }}
                    repeat={Infinity}
                  />
                </span>
              </h1>
            </motion.div>
            
            <br/>
            <motion.p 
              className="max-w-3xl mx-auto text-gray-400 dark:text-[#c5c5c5] mb-8 leading-relaxed"
              initial={{ y: 50, opacity: 0 }}
              animate={heroRef.isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: isLoading ? 2.4 : 0.6 }}
            >
             My passion for computers started when I was a kid, creating game mods and setting up servers for my friends. In 2022, I began studying Computer Programming at Trakya University and fell in love with web development. After an internship focused on .NET, C#, and OOP, I graduated in 2025—and now I build clean, efficient solutions with C#, .NET Core, and MSSQL while continuing to explore cloud technologies like AWS.
            </motion.p>

            <div className="flex items-center justify-center space-x-4">
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="relative z-10"
              >
                <Link
                  href="#contact"
                  className="px-6 py-3 rounded-full border-2 border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-[#191919] transition-colors inline-block touch-manipulation"
                  onClick={(e) => {
                    // Ensure the link works on mobile by adding explicit handler
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      e.preventDefault();
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Get in Touch
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-[#191919] hover:bg-transparent dark:hover:bg-transparent hover:text-black dark:hover:text-white transition-colors"
                >
                  My Resume
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Tech Stack */}
          <section className="container mx-auto py-16 px-4 text-center" ref={techStackRef.ref}>
            <motion.h2 
              className="text-xl font-medium mb-10 text-gray-600 dark:text-[#8491a0]"
              initial={{ y: 50, opacity: 0 }}
              animate={techStackRef.isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              What I Build With
            </motion.h2>
            <motion.div 
              className="flex justify-center gap-10 flex-wrap"
              initial={{ y: 50, opacity: 0 }}
              animate={techStackRef.isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                "C#",
                ".NET CORE",
                "MVC",
                "MSSQL",
                "AWS"
              ].map((tech, index) => (
                <motion.div 
                  key={tech}
                  className="text-xl font-bold bg-gradient-to-r from-[#ff3d00] to-[#5badff] text-transparent bg-clip-text"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={techStackRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                >
                  {tech}
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Projects */}
          <section id="projects" className="container mx-auto py-16 px-4" ref={projectsRef.ref}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={projectsRef.isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="relative text-center mb-16">
                <span className="absolute inset-x-0 bottom-0 transform translate-y-6 scale-75 opacity-20 text-6xl font-extrabold text-[#ff3d00]">PROJECTS</span>
                <span className="relative text-3xl font-bold text-[#ff3d00]">MY PROJECTS</span>
                <motion.div 
                  className="h-1 w-20 bg-gradient-to-r from-[#ff3d00] to-[#5badff] mx-auto mt-4"
                  initial={{ width: 0 }}
                  animate={projectsRef.isInView ? { width: 80 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.div>
              </h2>
            </motion.div>
            
            <Carousel 
              opts={{
                align: "start",
                loop: true
              }}
              className="relative w-full"
            >
              <CarouselContent>
                {/* Project Items */}
                {[
                  {
                    title: "Car Repair Reservation System",
                    subtitle: "FULL-STACK PROJECT",
                    tech: "Built with C# and .NET Core",
                    image: "/projects/carrepair.jpg",
                    accent: "#ff3d00",
                    github: "https://github.com/soneryesilay/CarRepairReservationSystem"
                  },
                  {
                    title: "Hotel Management System",
                    subtitle: "FULL-STACK PROJECT",
                    tech: "Built with .NET Core and MVC",
                    image: "https://media.licdn.com/dms/image/v2/D4D22AQFLJ8FiGD1jwA/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1728481470690?e=1747872000&v=beta&t=DXsHRXYqEvPmrC-VGwgLtx4pSq_51YJ7pYqBjByb3Q8",
                    accent: "#5badff",
                    github: "https://github.com/soneryesilay/Net-HotelApi-Project"
                  },
                  {
                    title: "Portfolio Website",
                    subtitle: "FRONT-END PROJECT",
                    tech: "Built with Next.js and Tailwind CSS",
                    image: "https://i.hizliresim.com/b4tumam.png",
                    accent: "#ff3d00",
                    github: "https://github.com/soneryesilay/resume"
                  },
                  {
                    title: "Book Store Web API",
                    subtitle: "BACK-END PROJECT",
                    tech: "Built with .NET Core Web Api",
                    image: "https://www.matillion.com/uploads/cards/Blog-API.png",
                    accent: "#5badff",
                    github: "https://github.com/soneryesilay/BookStoreAppWebAPI"
                  },
                  {
                    title: "Restaurant Qr Menu",
                    subtitle: "FULL-STACK PROJECT",
                    tech: "Built with .NET Core Web Api and MVC",
                    image: "https://media.licdn.com/dms/image/v2/D4D22AQEkdV7WUggiIA/feedshare-shrink_800/B4DZQH_eXKGUAg-/0/1735300872444?e=1747872000&v=beta&t=fNVXpD0sGWFF9ZRQ46LWFYk-5QCbHOtTSOdr9seyz0w",
                    accent: "#ff3d00",
                    github: "https://github.com/soneryesilay/Net-QrMenu-WithSignalR"
                  },
                  {
                    title: "Iyzico 3D Pay Integration",
                    subtitle: "BACK-END PROJECT",
                    tech: "Built with .NET Core Web Api and Angular",
                    image: "https://www.matillion.com/uploads/cards/Blog-API.png",
                    accent: "#5badff",
                    github: "https://github.com/soneryesilay/Iyzico3DPay-Angular-Net"
                  }
                ].map((project, index) => (
                  <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <motion.div 
                      className="bg-gray-100 dark:bg-[#222222] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform mx-2"
                      whileHover={{ 
                        scale: 1.03, 
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", 
                        y: -10
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative h-[280px] overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-4">
                          <h3 className="text-lg font-bold text-white drop-shadow-md">
                            {project.title.split(" ").slice(0, -1).join(" ")}{" "}
                            <span style={{ color: project.accent }}>
                              {project.title.split(" ").slice(-1)}
                            </span>
                          </h3>
                        </div>
                      </div>
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-[#8491a0] mb-1">{project.subtitle}</p>
                          <p className="font-bold text-sm">{project.tech}</p>
                        </div>
                        <motion.div whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                          <Link 
                            href={project.github} 
                            target="_blank" 
                            className={`w-10 h-10 rounded-full text-white flex items-center justify-center hover:opacity-90 transition-opacity shadow-md`}
                            style={{ backgroundColor: project.accent }}
                          >
                            <Github className="w-4 h-4" />
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              <div className="flex justify-center gap-4 mt-8">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <CarouselPrevious className="static translate-y-0 mx-2" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <CarouselNext className="static translate-y-0 mx-2" />
                </motion.div>
              </div>
            </Carousel>
          </section>

          {/* Experience */}
          <section id="experience" className="container mx-auto py-16 px-4" ref={experienceRef.ref}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={experienceRef.isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="relative text-center mb-16">
                <span className="absolute inset-x-0 bottom-0 transform translate-y-6 scale-75 opacity-20 text-6xl font-extrabold text-[#5badff]">EXPERIENCE</span>
                <span className="relative text-3xl font-bold text-[#5badff]">MY EXPERIENCE</span>
                <motion.div 
                  className="h-1 w-20 bg-gradient-to-r from-[#ff3d00] to-[#5badff] mx-auto mt-4"
                  initial={{ width: 0 }}
                  animate={experienceRef.isInView ? { width: 80 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.div>
              </h2>
            </motion.div>

            <div className="max-w-3xl mx-auto space-y-12">
              <motion.div 
                className="flex gap-6 bg-white dark:bg-[#1e1e1e] p-6 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all"
                initial={{ y: 100, opacity: 0 }}
                animate={experienceRef.isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
                whileHover={{ y: -8 }}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="w-[50px] h-[50px] flex items-center justify-center bg-gradient-to-r from-[#ff3d00] to-[#5badff] rounded-lg text-white shadow-md"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="font-bold text-xl">1</span>
                  </motion.div>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-300">Back-end Developer - Intern at AkıllıPhone</h3>
                    <span className="text-gray-500 dark:text-[#8491a0]">2024 Feb - 2024 July</span>
                  </div>
                  <p className="text-gray-700 dark:text-[#c5c5c5] mb-4">
                    I worked on 3 projects using C# and .NET Core, optimized database queries for 15% better performance, and built a microservice with senior guidance. Gained practical experience through team collaboration and code reviews while contributing to the main company project.
                  </p>
                  
                  <motion.div 
                    className="mt-4 flex gap-2 flex-wrap"
                    initial={{ opacity: 0 }}
                    animate={experienceRef.isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    {["C#", ".NET Core", "MSSQL", "Microservice"].map((skill, index) => (
                      <motion.span 
                        key={skill}
                        className="px-3 py-1 bg-gray-200 dark:bg-[#222222] rounded-full text-xs font-medium"
                        initial={{ opacity: 0, x: -20 }}
                        animate={experienceRef.isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.7 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Blog Section */}
          <section id="blogs" className="container mx-auto py-16 px-4" ref={blogsRef.ref}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={blogsRef.isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="relative text-center mb-16">
                <span className="absolute inset-x-0 bottom-0 transform translate-y-6 scale-75 opacity-20 text-6xl font-extrabold text-[#ff3d00]">BLOGS</span>
                <span className="relative text-3xl font-bold text-[#ff3d00]">MY BLOGS</span>
                <motion.div 
                  className="h-1 w-20 bg-gradient-to-r from-[#ff3d00] to-[#5badff] mx-auto mt-4"
                  initial={{ width: 0 }}
                  animate={blogsRef.isInView ? { width: 80 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.div>
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Blog Post Placeholders */}
              {[1, 2, 3].map((item, index) => (
                <motion.div 
                  key={item}
                  className="bg-gray-100 dark:bg-[#222222] rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                  initial={{ opacity: 0, y: 50 }}
                  animate={blogsRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <Image
                      src="/placeholder.jpg"
                      alt={`Blog Post ${item}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  </div>
                  <div className="p-8">
                    <span className="text-xs font-medium text-gray-500 dark:text-[#8491a0] mb-3 block">None</span>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-[#5badff] transition-colors duration-300">None</h3>
                    <p className="text-gray-700 dark:text-[#c5c5c5] mb-6 line-clamp-3">
                      None
                    </p>
                    <motion.div 
                      className="inline-flex items-center font-medium text-[#5badff] group-hover:text-[#3d90e3] transition-colors duration-300"
                      whileHover={{ x: 5 }} 
                      transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
                    >
                      <Link 
                        href="https://medium.com/@soneryesilay" 
                        target="_blank"
                        className="inline-flex items-center"
                      >
                        Read on Medium
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={blogsRef.isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="https://medium.com/@soneryesilay" 
                  target="_blank"
                  className="px-6 py-3 rounded-full border-2 border-[#5badff] text-[#5badff] hover:bg-[#5badff] hover:text-white transition-colors inline-flex items-center"
                >
                  View All Blog Posts
                  <svg viewBox="0 0 1043.63 592.71" className="w-5 h-5 ml-2 fill-current">
                    <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460.03 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path>
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </section>

          {/* Contact Section - Responsive to Theme */}
          <section id="contact" className="bg-white dark:bg-[#191919] py-10 mt-16 border-t border-gray-200 dark:border-gray-800" ref={contactRef.ref}>
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <motion.h2 
                  className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  Contact Me
                </motion.h2>
                
                <motion.div 
                  className="flex items-center justify-center mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="bg-gray-100 dark:bg-[#222222] rounded-full px-4 py-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700 dark:text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs text-gray-700 dark:text-white">
                      Istanbul Time: {currentTime}
                    </span>
                  </div>
                </motion.div>
                
                <motion.p 
                  className="text-gray-400 dark:text-gray-300 mb-6 text-center max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Have a question or interested in working together? Feel free to reach out! I'm always open to discussing new projects, opportunities, or simply connecting with fellow developers. Let's build something great together!
                </motion.p>
                
                <motion.div 
                  className="flex items-center justify-center mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a href="mailto:soneryesilay@outlook.com" className="text-gray-300 dark:text-white hover:text-[#5badff] transition-colors">
                      soneryesilay@outlook.com
                    </a>
                  </motion.div>
                </motion.div>
                
                <motion.div 
                  className="flex justify-center space-x-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      href="https://github.com/soneryesilay"
                      target="_blank"
                      className="text-gray-700 dark:text-white hover:text-[#5badff] transition-colors"
                    >
                      <Github size={20} />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      href="https://www.linkedin.com/in/soneryesilay/"
                      target="_blank"
                      className="text-gray-700 dark:text-white hover:text-[#5badff] transition-colors"
                    >
                      <Linkedin size={20} />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Link
                      href="https://stackoverflow.com/users/23093350/soner"
                      target="_blank"
                      className="text-gray-700 dark:text-white hover:text-[#5badff] transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-5 w-5 fill-current">
                        <path d="M290.7 311L95 269.7 86.8 309l195.7 41zm51-87L188.2 95.7l-25.5 30.8 153.5 128.3zm-31.2 39.7L129.2 179l-16.7 36.5L293.7 300zM262 32l-32 24 119.3 160.3 32-24zm20.5 328h-200v39.7h200zm39.7 80H42.7V320h-40v160h359.5V320h-40z" />
                      </svg>
                    </Link>
                  </motion.div>
                </motion.div>
                
                <motion.p 
                  className="mt-6 text-gray-500 dark:text-gray-500 text-sm text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={contactRef.isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  © 2025 Soner Yeşilay. All rights reserved.
                </motion.p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
